import { useMemo, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TuneIcon from '@mui/icons-material/Tune'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import {
  calculateInjectionTimes,
  generateMapColumns,
} from './InjectionMap/calculateInjectionTimes'
import type { InjectionMapParams } from './InjectionMap/calculateInjectionTimes'
import LineChart from '../components/ui/LineChart'
import { useEngineContext } from '../contexts/EngineContext'
import EngineWizardDialog from '../components/EngineWizard'
import { useWizardGuard } from '../hooks/useWizardGuard'
import { hasRequiredFields } from '../schemas/engineProfile'
import type { EngineProfileField, FuelType } from '../types/engineProfile'

const DEFAULT_BSFC = {
  gasoline: 0.45,
  ethanol: 0.65,
} as const

const REQUIRED_FIELDS: EngineProfileField[] = [
  'numCylinders', 'maxRPM', 'peakPower', 'rpmAtPeakPower',
  'peakTorque', 'rpmAtPeakTorque', 'fuelType', 'maxMAP', 'injectorSize',
]

export default function InjectionMap() {
  const { t } = useTranslation()
  const { activeEngine, updateActiveEngine } = useEngineContext()
  const [wizardOpen, setWizardOpen] = useState(false)
  const handleWizardClose = useWizardGuard(setWizardOpen, activeEngine, REQUIRED_FIELDS)

  useEffect(() => {
    if (!activeEngine) {
      setWizardOpen(true)
      return
    }
    if (!hasRequiredFields(activeEngine, REQUIRED_FIELDS)) setWizardOpen(true)
  }, [activeEngine?.id])

  const chartData = activeEngine?.results?.injectionMap?.chartData ?? []

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

  const numCylinders = activeEngine?.numCylinders?.toString() ?? ''
  const maxRPM = activeEngine?.maxRPM?.toString() ?? ''
  const peakPower = activeEngine?.peakPower?.toString() ?? ''
  const rpmAtPeakPower = activeEngine?.rpmAtPeakPower?.toString() ?? ''
  const peakTorque = activeEngine?.peakTorque?.toString() ?? ''
  const rpmAtPeakTorque = activeEngine?.rpmAtPeakTorque?.toString() ?? ''
  const fuelType = activeEngine?.fuelType ?? 'gasoline'
  const maxMAP = activeEngine?.maxMAP?.toString() ?? ''
  const injectorSize = activeEngine?.injectorSize?.toString() ?? ''
  const bsfc = activeEngine?.bsfc?.toString() ?? ''

  useEffect(() => {
    if (!numCylinders || !maxRPM || !peakPower || !rpmAtPeakPower || !peakTorque || !rpmAtPeakTorque || !maxMAP || !injectorSize) return
    const resolvedBsfc = bsfc !== '' ? parseFloat(bsfc) : DEFAULT_BSFC[fuelType as FuelType]
    const params: InjectionMapParams = {
      numCylinders: parseFloat(numCylinders),
      maxRPM: parseFloat(maxRPM),
      peakPower: parseFloat(peakPower),
      rpmAtPeakPower: parseFloat(rpmAtPeakPower),
      peakTorque: parseFloat(peakTorque),
      rpmAtPeakTorque: parseFloat(rpmAtPeakTorque),
      fuelType: fuelType as FuelType,
      maxMAP: parseFloat(maxMAP),
      injectorSize: parseFloat(injectorSize),
      bsfc: resolvedBsfc,
    }
    const mapCols = generateMapColumns(params.maxMAP)
    const injTimes = calculateInjectionTimes(params)
    const newChartData = mapCols.map((v, i) => ({ x: v, y: injTimes[i] }))
    updateActiveEngine({
      results: { ...activeEngine?.results, injectionMap: { chartData: newChartData } },
    })
  }, [numCylinders, maxRPM, peakPower, rpmAtPeakPower, peakTorque, rpmAtPeakTorque, fuelType, maxMAP, injectorSize, bsfc, activeEngine?.id])

  if (!activeEngine) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TuneIcon color="primary" />
          <Typography variant="h4">{t('injectionMap.title')}</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('common.noEngineMessage')}
        </Typography>
        <Button variant="contained" onClick={() => setWizardOpen(true)}>
          {t('common.setupEngine')}
        </Button>
        <EngineWizardDialog
          open={wizardOpen}
          onClose={handleWizardClose}
          requiredFields={REQUIRED_FIELDS}
        />
      </>
    )
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

      {chartData.length > 0 && (
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
        </>
      )}

      <EngineWizardDialog
        open={wizardOpen}
        onClose={handleWizardClose}
        requiredFields={REQUIRED_FIELDS}
        editEngineId={activeEngine?.id}
      />
    </>
  )
}
