import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useTranslation } from 'react-i18next'
import * as d3 from 'd3'
import type { EngineParams, ControllerValues } from './EngineVisualization/engineCalculations'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  getPistonPosition,
  getPistonVelocity,
  getIntakeValveLift,
  getExhaustValveLift,
  getSparkTiming,
  getStrokeDividers,
  getInjectionTiming,
} from './EngineVisualization/engineCalculations'

// ─── CSV parser ─────────────────────────────────────────────────────────────

function parseCsv(text: string): number[][] {
  return text
    .trim()
    .split('\n')
    .map((row) => row.split(',').map(Number))
}

// ─── Step field interfaces ───────────────────────────────────────────────────

interface Step1Fields {
  numCylinders: string
  intakeValveOpens: string
  intakeValveCloses: string
  exhaustValveOpens: string
  exhaustValveCloses: string
  injectionAngle: string
  stroke: string
  conrodLength: string
}

interface Step2Fields {
  injectionMethod: 'sequential'
  ignitionMethod: 'sequential'
  maxRPM: string
  maxMAP: string
}

// ─── Validation ──────────────────────────────────────────────────────────────

function isStep1Valid(f: Step1Fields): boolean {
  return (
    f.numCylinders !== '' &&
    f.intakeValveOpens !== '' &&
    f.intakeValveCloses !== '' &&
    f.exhaustValveOpens !== '' &&
    f.exhaustValveCloses !== '' &&
    f.injectionAngle !== '' &&
    f.stroke !== '' &&
    f.conrodLength !== ''
  )
}

function isStep2Valid(f: Step2Fields): boolean {
  return f.maxRPM !== '' && f.maxMAP !== ''
}

// ─── Graph constants ─────────────────────────────────────────────────────────

const GRAPH_HEIGHT = 400
const GRAPH_MARGIN = { top: 20, right: 30, bottom: 40, left: 50 }
const STROKE_LABELS = ['TDC', 'Power', 'BDC', 'Exhaust', 'TDC']

const LINE_COLORS = {
  piston: '#ffffff',
  intakeValve: '#4fc3f7',
  exhaustValve: '#ef9a9a',
  strokeDivider: '#666666',
  spark: '#ffeb3b',
  injStart: '#fe0000',
  injEnd: '#ff7043',
  pistonVelocity: '#ff9800',
} as const

// ─── D3 draw function ─────────────────────────────────────────────────────────

function drawGraph(
  svgEl: SVGSVGElement,
  engineParams: EngineParams,
  controller: ControllerValues,
  injectionData: number[][] | null,
  ignitionData: number[][] | null,
  t: (key: string) => string,
) {
  const totalWidth = svgEl.clientWidth || 900
  const width = totalWidth - GRAPH_MARGIN.left - GRAPH_MARGIN.right
  const height = GRAPH_HEIGHT - GRAPH_MARGIN.top - GRAPH_MARGIN.bottom

  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  svg
    .attr('width', totalWidth)
    .attr('height', GRAPH_HEIGHT)
    .style('background', '#0f1117')
    .style('border-radius', '8px')

  const g = svg
    .append('g')
    .attr('transform', `translate(${GRAPH_MARGIN.left},${GRAPH_MARGIN.top})`)

  // Scales
  const xScale = d3.scaleLinear().domain([0, 720]).range([0, width])
  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0])

  // Axes
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(9)
        .tickFormat((d) => `${d}°`),
    )
    .selectAll('text')
    .style('fill', '#aaa')
  g.select('.domain').style('stroke', '#555')
  g.selectAll('.tick line').style('stroke', '#555')

  g.append('g')
    .call(d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`))
    .selectAll('text')
    .style('fill', '#aaa')

  // Build degree arrays
  const degrees = d3.range(0, 721)

  const pistonData = degrees.map((d) => ({ x: d, y: getPistonPosition(d, engineParams) }))
  const intakeData = degrees.map((d) => ({ x: d, y: getIntakeValveLift(d, engineParams) }))
  const exhaustData = degrees.map((d) => ({ x: d, y: getExhaustValveLift(d, engineParams) }))
  const velocityData = degrees.map((d) => ({ x: d, y: getPistonVelocity(d, engineParams) }))

  const lineGen = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  function drawLine(data: { x: number; y: number }[], color: string) {
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', lineGen)
  }

  drawLine(pistonData, LINE_COLORS.piston)
  drawLine(intakeData, LINE_COLORS.intakeValve)
  drawLine(exhaustData, LINE_COLORS.exhaustValve)
  drawLine(velocityData, LINE_COLORS.pistonVelocity)

  // Stroke dividers
  const dividers = getStrokeDividers()
  dividers.forEach((deg, i) => {
    const x = xScale(deg)
    g.append('line')
      .attr('x1', x)
      .attr('x2', x)
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', LINE_COLORS.strokeDivider)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')

    g.append('text')
      .attr('x', x + 3)
      .attr('y', 12)
      .attr('fill', '#888')
      .attr('font-size', '11px')
      .text(STROKE_LABELS[i] ?? '')
  })

  // Spark timing
  const sparkDeg = getSparkTiming(controller, ignitionData)
  g.append('line')
    .attr('x1', xScale(sparkDeg))
    .attr('x2', xScale(sparkDeg))
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', LINE_COLORS.spark)
    .attr('stroke-width', 2)

  // Injection timing
  const { start: injStart, end: injEnd } = getInjectionTiming(
    controller,
    injectionData,
    engineParams.injectionAngle,
  )

  g.append('line')
    .attr('x1', xScale(injStart))
    .attr('x2', xScale(injStart))
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', LINE_COLORS.injStart)
    .attr('stroke-width', 2)

  g.append('line')
    .attr('x1', xScale(injEnd))
    .attr('x2', xScale(injEnd))
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', LINE_COLORS.injEnd)
    .attr('stroke-width', 2)

  // Legend (top-right)
  const legendItems = [
    { color: LINE_COLORS.piston, label: t('engineVisualization.legendPiston') },
    { color: LINE_COLORS.intakeValve, label: t('engineVisualization.legendIntakeValve') },
    { color: LINE_COLORS.exhaustValve, label: t('engineVisualization.legendExhaustValve') },
    { color: LINE_COLORS.spark, label: t('engineVisualization.legendSpark') },
    { color: LINE_COLORS.injStart, label: t('engineVisualization.legendInjStart') },
    { color: LINE_COLORS.injEnd, label: t('engineVisualization.legendInjEnd') },
    { color: LINE_COLORS.pistonVelocity, label: t('engineVisualization.legendPistonVelocity') },
  ]

  const legendX = width - 140
  const legendY = 10
  legendItems.forEach((item, i) => {
    const y = legendY + i * 20
    g.append('rect').attr('x', legendX).attr('y', y).attr('width', 16).attr('height', 4).attr('fill', item.color)
    g.append('text')
      .attr('x', legendX + 22)
      .attr('y', y + 4)
      .attr('fill', '#ccc')
      .attr('font-size', '12px')
      .text(item.label)
  })
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EngineVisualization() {
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useLocalStorage('fueltech:engineViz.activeStep', 0)
  const [finished, setFinished] = useLocalStorage('fueltech:engineViz.finished', false)

  const [step1, setStep1] = useLocalStorage<Step1Fields>('fueltech:engineViz.step1', {
    numCylinders: '',
    intakeValveOpens: '',
    intakeValveCloses: '',
    exhaustValveOpens: '',
    exhaustValveCloses: '',
    injectionAngle: '',
    stroke: '',
    conrodLength: '',
  })

  const [step2, setStep2] = useLocalStorage<Step2Fields>('fueltech:engineViz.step2', {
    injectionMethod: 'sequential',
    ignitionMethod: 'sequential',
    maxRPM: '',
    maxMAP: '',
  })

  const [injectionData, setInjectionData] = useLocalStorage<number[][] | null>('fueltech:engineViz.injectionData', null)
  const [ignitionData, setIgnitionData] = useLocalStorage<number[][] | null>('fueltech:engineViz.ignitionData', null)
  const [injectionFileName, setInjectionFileName] = useLocalStorage<string | null>('fueltech:engineViz.injectionFileName', null)
  const [ignitionFileName, setIgnitionFileName] = useLocalStorage<string | null>('fueltech:engineViz.ignitionFileName', null)

  const [engineParams, setEngineParams] = useLocalStorage<EngineParams | null>('fueltech:engineViz.engineParams', null)
  const [controller, setController] = useLocalStorage<ControllerValues>('fueltech:engineViz.controller', { rpm: 0, map: 0 })

  const svgRef = useRef<SVGSVGElement>(null)

  const steps = [
    t('engineVisualization.stepEngineConfig'),
    t('engineVisualization.stepMethods'),
    t('engineVisualization.stepImportData'),
  ]

  // Redraw D3 graph when relevant state changes
  useEffect(() => {
    if (!finished || !engineParams || !svgRef.current) return
    drawGraph(svgRef.current, engineParams, controller, injectionData, ignitionData, t)
  }, [finished, engineParams, controller, injectionData, ignitionData, t])

  // ResizeObserver to redraw on container resize
  useEffect(() => {
    if (!finished || !engineParams || !svgRef.current) return
    const el = svgRef.current
    const observer = new ResizeObserver(() => {
      if (engineParams) {
        drawGraph(el, engineParams, controller, injectionData, ignitionData, t)
      }
    })
    observer.observe(el.parentElement ?? el)
    return () => observer.disconnect()
  }, [finished, engineParams, controller, injectionData, ignitionData, t])

  function handleNext() {
    if (activeStep === 0 && !isStep1Valid(step1)) return
    if (activeStep === 1 && !isStep2Valid(step2)) return
    setActiveStep((prev) => prev + 1)
  }

  function handleBack() {
    setActiveStep((prev) => prev - 1)
  }

  function handleFinish() {
    const params: EngineParams = {
      numCylinders: Number(step1.numCylinders),
      intakeValveOpens: Number(step1.intakeValveOpens),
      intakeValveCloses: Number(step1.intakeValveCloses),
      exhaustValveOpens: Number(step1.exhaustValveOpens),
      exhaustValveCloses: Number(step1.exhaustValveCloses),
      injectionAngle: Number(step1.injectionAngle),
      injectionMethod: step2.injectionMethod,
      ignitionMethod: step2.ignitionMethod,
      maxRPM: Number(step2.maxRPM),
      maxMAP: Number(step2.maxMAP),
      stroke: Number(step1.stroke),
      conrodLength: Number(step1.conrodLength),
    }
    const initRPM = Math.round((params.maxRPM / 2) / 200) * 200
    const initMAP = params.maxMAP / 2
    setEngineParams(params)
    setController({ rpm: initRPM, map: initMAP })
    setFinished(true)
  }

  function handleReset() {
    setActiveStep(0)
    setFinished(false)
    setEngineParams(null)
    setInjectionData(null)
    setIgnitionData(null)
    setInjectionFileName(null)
    setIgnitionFileName(null)
    setStep1({
      numCylinders: '',
      intakeValveOpens: '',
      intakeValveCloses: '',
      exhaustValveOpens: '',
      exhaustValveCloses: '',
      injectionAngle: '',
      stroke: '',
      conrodLength: '',
    })
    setStep2({
      injectionMethod: 'sequential',
      ignitionMethod: 'sequential',
      maxRPM: '',
      maxMAP: '',
    })
    setController({ rpm: 0, map: 0 })
  }

  function handleFileImport(
    file: File,
    setter: (data: number[][] | null) => void,
    nameSetter: (name: string | null) => void,
  ) {
    nameSetter(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result
      if (typeof text === 'string') {
        setter(parseCsv(text))
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <PrecisionManufacturingIcon color="primary" />
        <Typography variant="h4">{t('engineVisualization.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('engineVisualization.subtitle')}
      </Typography>

      {!finished ? (
        <Paper sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* ── Step 1: Engine Config ── */}
          {activeStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 480 }}>
              <TextField
                label={t('engineVisualization.fieldNumCylinders')}
                type="number"
                required
                value={step1.numCylinders}
                onChange={(e) => setStep1({ ...step1, numCylinders: e.target.value })}
                slotProps={{ htmlInput: { min: 1 } }}
              />
              <TextField
                label={t('engineVisualization.fieldIntakeValveOpens')}
                type="number"
                required
                value={step1.intakeValveOpens}
                onChange={(e) => setStep1({ ...step1, intakeValveOpens: e.target.value })}
                slotProps={{ htmlInput: { min: 0, max: 720 } }}
                helperText={t('engineVisualization.fieldIntakeValveOpensHelper')}
              />
              <TextField
                label={t('engineVisualization.fieldIntakeValveCloses')}
                type="number"
                required
                value={step1.intakeValveCloses}
                onChange={(e) => setStep1({ ...step1, intakeValveCloses: e.target.value })}
                slotProps={{ htmlInput: { min: 0, max: 720 } }}
                helperText={t('engineVisualization.fieldIntakeValveClosesHelper')}
              />
              <TextField
                label={t('engineVisualization.fieldExhaustValveOpens')}
                type="number"
                required
                value={step1.exhaustValveOpens}
                onChange={(e) => setStep1({ ...step1, exhaustValveOpens: e.target.value })}
                slotProps={{ htmlInput: { min: 0, max: 720 } }}
                helperText={t('engineVisualization.fieldExhaustValveOpensHelper')}
              />
              <TextField
                label={t('engineVisualization.fieldExhaustValveCloses')}
                type="number"
                required
                value={step1.exhaustValveCloses}
                onChange={(e) => setStep1({ ...step1, exhaustValveCloses: e.target.value })}
                slotProps={{ htmlInput: { min: 0, max: 720 } }}
                helperText={t('engineVisualization.fieldExhaustValveClosesHelper')}
              />
              <TextField
                label={t('engineVisualization.fieldInjectionAngle')}
                type="number"
                required
                value={step1.injectionAngle}
                onChange={(e) => setStep1({ ...step1, injectionAngle: e.target.value })}
                slotProps={{ htmlInput: { min: 0, max: 720 } }}
                helperText={t('engineVisualization.fieldInjectionAngleHelper')}
              />
              <TextField
                label={t('engineVisualization.fieldStroke')}
                type="number"
                required
                value={step1.stroke}
                onChange={(e) => setStep1({ ...step1, stroke: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
                helperText={t('engineVisualization.fieldStrokeHelper')}
              />
              <TextField
                label={t('engineVisualization.fieldConrodLength')}
                type="number"
                required
                value={step1.conrodLength}
                onChange={(e) => setStep1({ ...step1, conrodLength: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
                helperText={t('engineVisualization.fieldConrodLengthHelper')}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStep1Valid(step1)}
                >
                  {t('common.next')}
                </Button>
              </Box>
            </Box>
          )}

          {/* ── Step 2: Methods ── */}
          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 480 }}>
              <FormControl required>
                <FormLabel>{t('engineVisualization.fieldInjectionMethod')}</FormLabel>
                <RadioGroup value={step2.injectionMethod}>
                  <FormControlLabel
                    value="sequential"
                    control={<Radio />}
                    label={t('engineVisualization.injectionMethodSequential')}
                  />
                  <FormControlLabel
                    value="semi-sequential"
                    control={<Radio disabled />}
                    label={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('engineVisualization.injectionMethodSemiSequential')}
                        <Typography variant="caption" color="text.disabled">
                          ({t('engineVisualization.comingSoonNote')})
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="multipoint"
                    control={<Radio disabled />}
                    label={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('engineVisualization.injectionMethodMultipoint')}
                        <Typography variant="caption" color="text.disabled">
                          ({t('engineVisualization.comingSoonNote')})
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <FormControl required>
                <FormLabel>{t('engineVisualization.fieldIgnitionMethod')}</FormLabel>
                <RadioGroup value={step2.ignitionMethod}>
                  <FormControlLabel
                    value="sequential"
                    control={<Radio />}
                    label={t('engineVisualization.ignitionMethodSequential')}
                  />
                  <FormControlLabel
                    value="wasted-spark"
                    control={<Radio disabled />}
                    label={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('engineVisualization.ignitionMethodWastedSpark')}
                        <Typography variant="caption" color="text.disabled">
                          ({t('engineVisualization.comingSoonNote')})
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                label={t('engineVisualization.fieldMaxRPM')}
                type="number"
                required
                value={step2.maxRPM}
                onChange={(e) => setStep2({ ...step2, maxRPM: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
              />

              <TextField
                label={t('engineVisualization.fieldMaxMAP')}
                type="number"
                required
                value={step2.maxMAP}
                onChange={(e) => setStep2({ ...step2, maxMAP: e.target.value })}
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleBack}>
                  {t('common.back')}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStep2Valid(step2)}
                >
                  {t('common.next')}
                </Button>
              </Box>
            </Box>
          )}

          {/* ── Step 3: Import Data ── */}
          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 560 }}>
              {/* Injection Map CSV */}
              <Box>
                <Button variant="outlined" component="label">
                  {t('engineVisualization.importInjectionMap')}
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileImport(file, setInjectionData, setInjectionFileName)
                    }}
                  />
                </Button>
                <FormHelperText>
                  {injectionFileName
                    ? t('engineVisualization.importFileSelected', { name: injectionFileName })
                    : t('engineVisualization.importNoFile')}
                </FormHelperText>
                <FormHelperText sx={{ mt: 0.5 }}>
                  {t('engineVisualization.importInjectionMapHelper')}
                </FormHelperText>
              </Box>

              {/* Ignition Advance CSV */}
              <Box>
                <Button variant="outlined" component="label">
                  {t('engineVisualization.importIgnitionAdvance')}
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileImport(file, setIgnitionData, setIgnitionFileName)
                    }}
                  />
                </Button>
                <FormHelperText>
                  {ignitionFileName
                    ? t('engineVisualization.importFileSelected', { name: ignitionFileName })
                    : t('engineVisualization.importNoFile')}
                </FormHelperText>
                <FormHelperText sx={{ mt: 0.5 }}>
                  {t('engineVisualization.importIgnitionAdvanceHelper')}
                </FormHelperText>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleBack}>
                  {t('common.back')}
                </Button>
                <Button variant="contained" onClick={handleFinish}>
                  {t('common.finish')}
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      ) : (
        <>
          {/* D3 Graph */}
          <Paper sx={{ p: 2, mb: 3, overflow: 'hidden' }}>
            <svg ref={svgRef} style={{ width: '100%', display: 'block' }} />
          </Paper>

          {/* Controller */}
          {engineParams && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <TextField
                  label={t('engineVisualization.controllerRPM')}
                  type="number"
                  value={controller.rpm}
                  onChange={(e) => setController({ ...controller, rpm: Number(e.target.value) })}
                  slotProps={{ htmlInput: { min: 0, max: engineParams.maxRPM } }}
                />
                <TextField
                  label={t('engineVisualization.controllerMAP')}
                  type="number"
                  value={controller.map}
                  onChange={(e) => setController({ ...controller, map: Number(e.target.value) })}
                  slotProps={{ htmlInput: { min: -1, max: engineParams.maxMAP, step: 0.1 } }}
                />
              </Box>
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button variant="outlined" onClick={handleReset}>
              {t('common.reset')}
            </Button>
          </Box>
        </>
      )}
    </>
  )
}
