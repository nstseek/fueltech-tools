import { useMemo, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import SpeedIcon from '@mui/icons-material/Speed'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { calculateRLRatio } from './RLRatio/calculateRLRatio'
import LineChart from '../components/ui/LineChart'
import { useEngineContext } from '../contexts/EngineContext'
import EngineWizardDialog from '../components/EngineWizard'
import { useWizardGuard } from '../hooks/useWizardGuard'
import { hasRequiredFields } from '../schemas/engineProfile'
import type { EngineProfileField } from '../types/engineProfile'

const ROD_STEP = 2

const REQUIRED_FIELDS: EngineProfileField[] = ['stroke', 'conrodLength']

export default function RLRatio() {
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
  }, [activeEngine?.id])

  const stroke = activeEngine?.stroke?.toString() ?? ''
  const rodLength = activeEngine?.conrodLength?.toString() ?? ''
  const result = activeEngine?.results?.rlRatio?.result ?? null

  useEffect(() => {
    if (!stroke || !rodLength) return
    const ratio = calculateRLRatio(Number(stroke), Number(rodLength))
    updateActiveEngine({
      results: { ...activeEngine?.results, rlRatio: { result: ratio } },
    })
  }, [stroke, rodLength, activeEngine?.id])

  const chartData = useMemo(() => {
    if (result === null) return []
    const lVal = Number(rodLength)
    const step = isMobile ? ROD_STEP * 5 : ROD_STEP
    const minL = Math.max(0.1, lVal - 20)
    const maxL = lVal + 20
    const points = []
    for (let l = minL; l <= maxL + step / 2; l = Math.round((l + step) * 100) / 100) {
      points.push({ x: l, y: calculateRLRatio(Number(stroke), l) })
    }
    return points
  }, [result, rodLength, stroke, isMobile])

  if (!activeEngine) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SpeedIcon color="primary" />
          <Typography variant="h4">{t('rlRatio.title')}</Typography>
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
        <SpeedIcon color="primary" />
        <Typography variant="h4">{t('rlRatio.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('rlRatio.subtitle')}
      </Typography>

      {result !== null && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          {t('rlRatio.resultLabel')}: {result.toFixed(4)}
        </Typography>
      )}

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          {t('rlRatio.formulaTitle')}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1.5 }}>
          {t('rlRatio.formulaExpression')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">{t('rlRatio.formulaVarR')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('rlRatio.formulaVarL')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('rlRatio.formulaVarStroke')}</Typography>
        </Box>
      </Paper>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-line' }}>
            {t('rlRatio.chartDescription')}
          </Typography>
          <LineChart
            data={chartData}
            xLabel={t('rlRatio.chartXLabel')}
            yLabel={t('rlRatio.chartYLabel')}
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
