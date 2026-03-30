import { useMemo, useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AirIcon from '@mui/icons-material/Air'
import { useTranslation } from 'react-i18next'
import { calculateExhaustPipeLength } from './ExhaustPipeLength/calculateExhaustPipeLength'
import LineChart from '../components/ui/LineChart'
import { useEngineContext } from '../contexts/EngineContext'
import EngineWizardDialog from '../components/EngineWizard'
import { useWizardGuard } from '../hooks/useWizardGuard'
import { hasRequiredFields } from '../schemas/engineProfile'
import type { EngineProfileField } from '../types/engineProfile'

const RPM_STEP = 100

const REQUIRED_FIELDS: EngineProfileField[] = ['exhaustValveOpens']

export default function ExhaustPipeLength() {
  const { t } = useTranslation()
  const { activeEngine, updateActiveEngine } = useEngineContext()
  const [wizardOpen, setWizardOpen] = useState(false)
  const handleWizardClose = useWizardGuard(setWizardOpen, activeEngine, REQUIRED_FIELDS)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (!activeEngine) {
      setWizardOpen(true)
      return
    }
    if (!hasRequiredFields(activeEngine, REQUIRED_FIELDS)) setWizardOpen(true)
    // Default rpm to maxRPM when engine loads and no rpm stored yet
    if (activeEngine.maxRPM && activeEngine.toolParams?.exhaustPipeLength?.rpm === undefined) {
      updateActiveEngine({ toolParams: { ...activeEngine.toolParams, exhaustPipeLength: { rpm: activeEngine.maxRPM } } })
    }
  }, [activeEngine?.id])

  const rpm = activeEngine?.toolParams?.exhaustPipeLength?.rpm
  const rpmStr = rpm?.toString() ?? ''
  const evo = activeEngine?.exhaustValveOpens?.toString() ?? ''
  const result = activeEngine?.results?.exhaustPipeLength?.result ?? null

  useEffect(() => {
    if (rpm === undefined || !evo) return
    const length = calculateExhaustPipeLength(Number(rpm), Number(evo))
    updateActiveEngine({
      results: { ...activeEngine?.results, exhaustPipeLength: { result: length } },
    })
  }, [rpm, evo, activeEngine?.id])

  const chartData = useMemo(() => {
    if (result === null) return []
    const rpmVal = Number(rpmStr)
    const range = isMobile ? 1000 : 3000
    const step = isMobile ? 500 : RPM_STEP
    const minRPM = Math.max(0, rpmVal - range)
    const maxRPM = rpmVal + range
    const points = []
    for (let r = minRPM; r <= maxRPM; r += step) {
      points.push({ x: r, y: calculateExhaustPipeLength(r, Number(evo)) })
    }
    return points
  }, [result, evo, rpmStr, isMobile])

  if (!activeEngine) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AirIcon color="primary" />
          <Typography variant="h4">{t('exhaustPipeLength.title')}</Typography>
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
        <AirIcon color="primary" />
        <Typography variant="h4">{t('exhaustPipeLength.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('exhaustPipeLength.subtitle')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
        <Paper sx={{ p: 3, width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('exhaustPipeLength.fieldRPM')}
              type="number"
              required
              value={rpmStr}
              onChange={(e) =>
                updateActiveEngine({
                  toolParams: {
                    ...activeEngine?.toolParams,
                    exhaustPipeLength: { rpm: e.target.value ? parseFloat(e.target.value) : undefined },
                  },
                })
              }
            />
            {result !== null && (
              <Typography variant="body1">
                {t('exhaustPipeLength.resultLabel')}: {result} {t('exhaustPipeLength.resultUnit')}
              </Typography>
            )}
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {t('exhaustPipeLength.formulaTitle')}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1.5 }}>
            {t('exhaustPipeLength.formulaExpression')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{t('exhaustPipeLength.formulaVarL')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('exhaustPipeLength.formulaVarEVO')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('exhaustPipeLength.formulaVarRPM')}</Typography>
          </Box>
        </Paper>
      </Box>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-line' }}>
            {t('exhaustPipeLength.chartDescription')}
          </Typography>
          <LineChart
            data={chartData}
            xLabel={t('exhaustPipeLength.chartXLabel')}
            yLabel={t('exhaustPipeLength.chartYLabel')}
          />
        </Paper>
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
