import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import {
  calculateIgnitionAdvance,
  generateRpmColumns,
} from './IgnitionAdvance/calculateIgnitionAdvance'
import type { IgnitionAdvanceParams } from './IgnitionAdvance/calculateIgnitionAdvance'
import LineChart from '../components/ui/LineChart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type FuelType = 'gasoline' | 'ethanol'

interface Step1Fields {
  valvesPerCylinder: string
  maxRPM: string
  idleRPM: string
  peakTorqueRPM: string
}

interface Step2Fields {
  fuelType: FuelType | ''
  boreDiameter: string
}

interface ChartPoint {
  x: number
  y: number
}

const DEFAULT_BORE_DIAMETER = 86

const STEP1_DEFAULT: Step1Fields = {
  valvesPerCylinder: '',
  maxRPM: '',
  idleRPM: '',
  peakTorqueRPM: '',
}

const STEP2_DEFAULT: Step2Fields = {
  fuelType: '',
  boreDiameter: '',
}

export default function IgnitionAdvance() {
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useLocalStorage('fueltech:ignitionAdvance.activeStep', 0)
  const [finished, setFinished] = useLocalStorage('fueltech:ignitionAdvance.finished', false)
  const [step1, setStep1] = useLocalStorage<Step1Fields>('fueltech:ignitionAdvance.step1', STEP1_DEFAULT)
  const [step2, setStep2] = useLocalStorage<Step2Fields>('fueltech:ignitionAdvance.step2', STEP2_DEFAULT)
  const [chartData, setChartData] = useLocalStorage<ChartPoint[]>('fueltech:ignitionAdvance.chartData', [])

  // Validation errors are pure UI state — not persisted
  const [step1Errors, setStep1Errors] = useState<Partial<Step1Fields>>({})
  const [step2FuelError, setStep2FuelError] = useState(false)

  // gridState is fully derived from chartData — no need to persist separately
  const gridState = useMemo(() => {
    if (chartData.length === 0) return null
    const columns: GridColDef[] = [
      { field: 'label', headerName: '', width: 160, sortable: false, pinnable: false },
      ...chartData.map((p) => ({
        field: `rpm_${p.x}`,
        headerName: String(p.x),
        width: 80,
        sortable: false,
      })),
    ]
    const row: Record<string, string | number> = {
      id: 1,
      label: t('ignitionAdvance.gridRowLabel'),
      ...Object.fromEntries(chartData.map((p) => [`rpm_${p.x}`, p.y])),
    }
    return { rows: [row], columns }
  }, [chartData, t])

  const steps = [
    t('ignitionAdvance.stepEngineInfo'),
    t('ignitionAdvance.stepFuelGeometry'),
  ]

  function validateStep1(): boolean {
    const errors: Partial<Step1Fields> = {}
    if (!step1.valvesPerCylinder) errors.valvesPerCylinder = t('ignitionAdvance.errorRequired')
    if (!step1.maxRPM) errors.maxRPM = t('ignitionAdvance.errorRequired')
    if (!step1.idleRPM) errors.idleRPM = t('ignitionAdvance.errorRequired')
    if (!step1.peakTorqueRPM) errors.peakTorqueRPM = t('ignitionAdvance.errorRequired')
    setStep1Errors(errors)
    return Object.keys(errors).length === 0
  }

  function validateStep2(): boolean {
    const hasError = !step2.fuelType
    setStep2FuelError(hasError)
    return !hasError
  }

  function buildParams(): IgnitionAdvanceParams {
    return {
      valvesPerCylinder: Number(step1.valvesPerCylinder),
      maxRPM: Number(step1.maxRPM),
      idleRPM: Number(step1.idleRPM),
      peakTorqueRPM: Number(step1.peakTorqueRPM),
      fuelType: step2.fuelType as FuelType,
      boreDiameter: step2.boreDiameter ? Number(step2.boreDiameter) : DEFAULT_BORE_DIAMETER,
    }
  }

  function compute() {
    const params = buildParams()
    const rpmCols = generateRpmColumns(params.maxRPM)
    const values = calculateIgnitionAdvance(params)
    setChartData(rpmCols.map((rpm, i) => ({ x: rpm, y: values[i] })))
  }

  function handleNext() {
    if (activeStep === 0 && !validateStep1()) return
    setActiveStep((prev) => prev + 1)
  }

  function handleBack() {
    setActiveStep((prev) => prev - 1)
  }

  function handleFinish() {
    if (!validateStep2()) return
    compute()
    setFinished(true)
  }

  function handleRefresh() {
    compute()
  }

  function handleReset() {
    setActiveStep(0)
    setFinished(false)
    setChartData([])
    setStep1(STEP1_DEFAULT)
    setStep2(STEP2_DEFAULT)
    setStep1Errors({})
    setStep2FuelError(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <FlashOnIcon color="primary" />
        <Typography variant="h4">{t('ignitionAdvance.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('ignitionAdvance.subtitle')}
      </Typography>

      {!finished ? (
        <Box>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
              <TextField
                label={t('ignitionAdvance.fieldValvesPerCylinder')}
                type="number"
                required
                value={step1.valvesPerCylinder}
                onChange={(e) => {
                  setStep1((prev) => ({ ...prev, valvesPerCylinder: e.target.value }))
                  setStep1Errors((prev) => ({ ...prev, valvesPerCylinder: undefined }))
                }}
                error={!!step1Errors.valvesPerCylinder}
                helperText={step1Errors.valvesPerCylinder}
              />
              <TextField
                label={t('ignitionAdvance.fieldMaxRPM')}
                type="number"
                required
                value={step1.maxRPM}
                onChange={(e) => {
                  setStep1((prev) => ({ ...prev, maxRPM: e.target.value }))
                  setStep1Errors((prev) => ({ ...prev, maxRPM: undefined }))
                }}
                error={!!step1Errors.maxRPM}
                helperText={step1Errors.maxRPM}
              />
              <TextField
                label={t('ignitionAdvance.fieldIdleRPM')}
                type="number"
                required
                value={step1.idleRPM}
                onChange={(e) => {
                  setStep1((prev) => ({ ...prev, idleRPM: e.target.value }))
                  setStep1Errors((prev) => ({ ...prev, idleRPM: undefined }))
                }}
                error={!!step1Errors.idleRPM}
                helperText={step1Errors.idleRPM}
              />
              <TextField
                label={t('ignitionAdvance.fieldPeakTorqueRPM')}
                type="number"
                required
                value={step1.peakTorqueRPM}
                onChange={(e) => {
                  setStep1((prev) => ({ ...prev, peakTorqueRPM: e.target.value }))
                  setStep1Errors((prev) => ({ ...prev, peakTorqueRPM: undefined }))
                }}
                error={!!step1Errors.peakTorqueRPM}
                helperText={step1Errors.peakTorqueRPM}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
              <FormControl required error={step2FuelError}>
                <FormLabel>{t('ignitionAdvance.fieldFuelType')}</FormLabel>
                <RadioGroup
                  value={step2.fuelType}
                  onChange={(e) => {
                    setStep2((prev) => ({ ...prev, fuelType: e.target.value as FuelType }))
                    setStep2FuelError(false)
                  }}
                >
                  <FormControlLabel
                    value="gasoline"
                    control={<Radio />}
                    label={t('ignitionAdvance.fuelGasoline')}
                  />
                  <FormControlLabel
                    value="ethanol"
                    control={<Radio />}
                    label={t('ignitionAdvance.fuelEthanol')}
                  />
                </RadioGroup>
                {step2FuelError && (
                  <FormHelperText>{t('ignitionAdvance.errorRequired')}</FormHelperText>
                )}
              </FormControl>
              <TextField
                label={t('ignitionAdvance.fieldBoreDiameter')}
                type="number"
                value={step2.boreDiameter}
                onChange={(e) =>
                  setStep2((prev) => ({ ...prev, boreDiameter: e.target.value }))
                }
                helperText={t('ignitionAdvance.helperBoreDiameter')}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {activeStep > 0 && (
              <Button variant="outlined" onClick={handleBack}>
                {t('common.back')}
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                {t('common.next')}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleFinish}>
                {t('common.finish')}
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <>
          {gridState && (
            <Box sx={{ height: 120, width: '100%', mb: 3 }}>
              <DataGrid
                rows={gridState.rows}
                columns={gridState.columns}
                hideFooter
                disableRowSelectionOnClick
              />
            </Box>
          )}

          <Box sx={{ mb: 3 }}>
            <LineChart
              data={chartData}
              xLabel={t('ignitionAdvance.chartXLabel')}
              yLabel={t('ignitionAdvance.chartYLabel')}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              {t('common.refresh')}
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              {t('common.reset')}
            </Button>
          </Box>
        </>
      )}
    </>
  )
}
