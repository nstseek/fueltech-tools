import { useMemo, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import {
  calculateIgnitionAdvance,
  generateRpmColumns,
} from './IgnitionAdvance/calculateIgnitionAdvance'
import type { IgnitionAdvanceParams } from './IgnitionAdvance/calculateIgnitionAdvance'
import LineChart from '../components/ui/LineChart'
import { useEngineContext } from '../contexts/EngineContext'
import EngineWizardDialog from '../components/EngineWizard'
import { useWizardGuard } from '../hooks/useWizardGuard'
import { hasRequiredFields } from '../schemas/engineProfile'
import type { EngineProfileField, FuelType } from '../types/engineProfile'

type IgnitionFuelType = 'gasoline' | 'ethanol'

const DEFAULT_BORE_DIAMETER = 86

const REQUIRED_FIELDS: EngineProfileField[] = [
  'valvesPerCylinder', 'maxRPM', 'idleRPM', 'peakTorqueRPM', 'fuelType', 'bore',
]

export default function IgnitionAdvance() {
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

  const chartData = activeEngine?.results?.ignitionAdvance?.chartData ?? []

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

  const valvesPerCylinder = activeEngine?.valvesPerCylinder?.toString() ?? ''
  const maxRPM = activeEngine?.maxRPM?.toString() ?? ''
  const idleRPM = activeEngine?.idleRPM?.toString() ?? ''
  const peakTorqueRPM = activeEngine?.peakTorqueRPM?.toString() ?? ''
  const fuelType = (activeEngine?.fuelType ?? '') as IgnitionFuelType | ''
  const boreDiameter = activeEngine?.bore?.toString() ?? ''

  useEffect(() => {
    if (!valvesPerCylinder || !maxRPM || !idleRPM || !peakTorqueRPM || !fuelType) return
    const params: IgnitionAdvanceParams = {
      valvesPerCylinder: Number(valvesPerCylinder),
      maxRPM: Number(maxRPM),
      idleRPM: Number(idleRPM),
      peakTorqueRPM: Number(peakTorqueRPM),
      fuelType: fuelType as FuelType,
      boreDiameter: boreDiameter ? Number(boreDiameter) : DEFAULT_BORE_DIAMETER,
    }
    const rpmCols = generateRpmColumns(params.maxRPM)
    const values = calculateIgnitionAdvance(params)
    const newChartData = rpmCols.map((rpm, i) => ({ x: rpm, y: values[i] }))
    updateActiveEngine({
      results: { ...activeEngine?.results, ignitionAdvance: { chartData: newChartData } },
    })
  }, [valvesPerCylinder, maxRPM, idleRPM, peakTorqueRPM, fuelType, boreDiameter, activeEngine?.id])

  if (!activeEngine) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <FlashOnIcon color="primary" />
          <Typography variant="h4">{t('ignitionAdvance.title')}</Typography>
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
        <FlashOnIcon color="primary" />
        <Typography variant="h4">{t('ignitionAdvance.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('ignitionAdvance.subtitle')}
      </Typography>

      {chartData.length > 0 && (
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
