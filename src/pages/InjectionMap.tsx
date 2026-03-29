import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import TuneIcon from '@mui/icons-material/Tune'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import {
  calculateInjectionTimes,
  generateMapColumns,
} from './InjectionMap/calculateInjectionTimes'
import type { InjectionMapParams } from './InjectionMap/calculateInjectionTimes'
import LineChart from '../components/ui/LineChart'
import { useLocalStorage } from '../hooks/useLocalStorage'

const DEFAULT_BSFC = {
  gasoline: 0.45,
  ethanol: 0.65,
} as const

interface Step1Fields {
  numCylinders: string
  maxRPM: string
  peakPower: string
  rpmAtPeakPower: string
  peakTorque: string
  rpmAtPeakTorque: string
}

interface Step2Fields {
  fuelType: 'gasoline' | 'ethanol'
  maxMAP: string
  injectorSize: string
  bsfc: string
}

interface ChartPoint {
  x: number
  y: number
}

const STEP1_DEFAULT: Step1Fields = {
  numCylinders: '',
  maxRPM: '',
  peakPower: '',
  rpmAtPeakPower: '',
  peakTorque: '',
  rpmAtPeakTorque: '',
}

const STEP2_DEFAULT: Step2Fields = {
  fuelType: 'gasoline',
  maxMAP: '',
  injectorSize: '',
  bsfc: '',
}

function isStep1Valid(fields: Step1Fields): boolean {
  return (
    fields.numCylinders !== '' &&
    fields.maxRPM !== '' &&
    fields.peakPower !== '' &&
    fields.rpmAtPeakPower !== '' &&
    fields.peakTorque !== '' &&
    fields.rpmAtPeakTorque !== ''
  )
}

function isStep2Valid(fields: Step2Fields): boolean {
  return fields.maxMAP !== '' && fields.injectorSize !== ''
}

export default function InjectionMap() {
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useLocalStorage('fueltech:injectionMap.activeStep', 0)
  const [finished, setFinished] = useLocalStorage('fueltech:injectionMap.finished', false)
  const [step1, setStep1] = useLocalStorage<Step1Fields>('fueltech:injectionMap.step1', STEP1_DEFAULT)
  const [step2, setStep2] = useLocalStorage<Step2Fields>('fueltech:injectionMap.step2', STEP2_DEFAULT)
  const [chartData, setChartData] = useLocalStorage<ChartPoint[]>('fueltech:injectionMap.chartData', [])

  // gridState is fully derived from chartData — no need to persist separately
  const gridState = useMemo(() => {
    if (chartData.length === 0) return null
    const labelCol: GridColDef = {
      field: 'label',
      headerName: '',
      width: 160,
      sortable: false,
      pinnable: true,
    }
    const valueCols: GridColDef[] = chartData.map((p) => ({
      field: `map_${p.x.toFixed(1)}`,
      headerName: p.x.toFixed(1),
      width: 80,
      sortable: false,
      valueFormatter: (value: number) => value.toFixed(2),
    }))
    const rowData: Record<string, number | string> = {
      id: 1,
      label: t('injectionMap.dataGridRowLabel'),
    }
    chartData.forEach((p) => {
      rowData[`map_${p.x.toFixed(1)}`] = p.y
    })
    return { columns: [labelCol, ...valueCols], rows: [rowData] }
  }, [chartData, t])

  const steps = [t('injectionMap.step1Label'), t('injectionMap.step2Label')]

  function buildParams(): InjectionMapParams {
    const resolvedBsfc =
      step2.bsfc !== '' ? parseFloat(step2.bsfc) : DEFAULT_BSFC[step2.fuelType]
    return {
      numCylinders: parseFloat(step1.numCylinders),
      maxRPM: parseFloat(step1.maxRPM),
      peakPower: parseFloat(step1.peakPower),
      rpmAtPeakPower: parseFloat(step1.rpmAtPeakPower),
      peakTorque: parseFloat(step1.peakTorque),
      rpmAtPeakTorque: parseFloat(step1.rpmAtPeakTorque),
      fuelType: step2.fuelType,
      maxMAP: parseFloat(step2.maxMAP),
      injectorSize: parseFloat(step2.injectorSize),
      bsfc: resolvedBsfc,
    }
  }

  function compute() {
    const params = buildParams()
    const mapCols = generateMapColumns(params.maxMAP)
    const injTimes = calculateInjectionTimes(params)
    setChartData(mapCols.map((v, i) => ({ x: v, y: injTimes[i] })))
  }

  function handleNext() {
    if (activeStep === 0 && isStep1Valid(step1)) setActiveStep(1)
  }

  function handleBack() {
    setActiveStep(0)
  }

  function handleFinish() {
    if (!isStep2Valid(step2)) return
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
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <TuneIcon color="primary" />
        <Typography variant="h4">{t('injectionMap.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('injectionMap.subtitle')}
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

          {activeStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label={t('injectionMap.numCylinders')}
                type="number"
                required
                value={step1.numCylinders}
                onChange={(e) => setStep1({ ...step1, numCylinders: e.target.value })}
                slotProps={{ htmlInput: { min: 1 } }}
              />
              <TextField
                label={t('injectionMap.maxRPM')}
                type="number"
                required
                value={step1.maxRPM}
                onChange={(e) => setStep1({ ...step1, maxRPM: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label={t('injectionMap.peakPower')}
                type="number"
                required
                value={step1.peakPower}
                onChange={(e) => setStep1({ ...step1, peakPower: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label={t('injectionMap.rpmAtPeakPower')}
                type="number"
                required
                value={step1.rpmAtPeakPower}
                onChange={(e) => setStep1({ ...step1, rpmAtPeakPower: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label={t('injectionMap.peakTorque')}
                type="number"
                required
                value={step1.peakTorque}
                onChange={(e) => setStep1({ ...step1, peakTorque: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label={t('injectionMap.rpmAtPeakTorque')}
                type="number"
                required
                value={step1.rpmAtPeakTorque}
                onChange={(e) => setStep1({ ...step1, rpmAtPeakTorque: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
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

          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl required>
                <FormLabel>{t('injectionMap.fuelType')}</FormLabel>
                <RadioGroup
                  value={step2.fuelType}
                  onChange={(e) =>
                    setStep2({ ...step2, fuelType: e.target.value as 'gasoline' | 'ethanol' })
                  }
                >
                  <FormControlLabel
                    value="gasoline"
                    control={<Radio />}
                    label={t('injectionMap.fuelTypeGasoline')}
                  />
                  <FormControlLabel
                    value="ethanol"
                    control={<Radio />}
                    label={t('injectionMap.fuelTypeEthanol')}
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                label={t('injectionMap.maxMAP')}
                type="number"
                required
                value={step2.maxMAP}
                onChange={(e) => setStep2({ ...step2, maxMAP: e.target.value })}
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
                helperText={t('injectionMap.maxMAPHelper')}
              />

              <TextField
                label={t('injectionMap.injectorSize')}
                type="number"
                required
                value={step2.injectorSize}
                onChange={(e) => setStep2({ ...step2, injectorSize: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
              />

              <TextField
                label={t('injectionMap.bsfc')}
                type="number"
                value={step2.bsfc}
                onChange={(e) => setStep2({ ...step2, bsfc: e.target.value })}
                slotProps={{ htmlInput: { min: 0 } }}
                helperText={t('injectionMap.bsfcHelper', {
                  gasolineDefault: DEFAULT_BSFC.gasoline,
                  ethanolDefault: DEFAULT_BSFC.ethanol,
                })}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleBack}>
                  {t('common.back')}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleFinish}
                  disabled={!isStep2Valid(step2)}
                >
                  {t('common.finish')}
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      ) : (
        <>
          {gridState && (
            <Box sx={{ height: 120, width: '100%', mb: 3 }}>
              <DataGrid
                columns={gridState.columns}
                rows={gridState.rows}
                hideFooter
                disableRowSelectionOnClick
              />
            </Box>
          )}

          <Box sx={{ mb: 3 }}>
            <LineChart
              data={chartData}
              xLabel={t('injectionMap.chartXLabel')}
              yLabel={t('injectionMap.chartYLabel')}
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
