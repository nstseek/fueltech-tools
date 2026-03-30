import { useMemo, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import SpeedIcon from '@mui/icons-material/Speed'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { calculateCompressionRatio } from './CompressionRatio/calculateCompressionRatio'
import LineChart from '../components/ui/LineChart'
import { useEngineContext } from '../contexts/EngineContext'
import EngineWizardDialog from '../components/EngineWizard'
import { useWizardGuard } from '../hooks/useWizardGuard'
import { hasRequiredFields } from '../schemas/engineProfile'
import type { EngineProfileField } from '../types/engineProfile'

const BORE_STEP = 0.5

const REQUIRED_FIELDS: EngineProfileField[] = ['bore', 'stroke', 'chamberVolume', 'gasketBore', 'gasketThickness']

export default function CompressionRatio() {
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

  const bore = activeEngine?.bore?.toString() ?? ''
  const stroke = activeEngine?.stroke?.toString() ?? ''
  const chamberVolume = activeEngine?.chamberVolume?.toString() ?? ''
  const pistonDishVolume = activeEngine?.pistonDishVolume?.toString() ?? '0'
  const gasketBore = activeEngine?.gasketBore?.toString() ?? ''
  const gasketThickness = activeEngine?.gasketThickness?.toString() ?? ''
  const deckClearance = activeEngine?.deckClearance?.toString() ?? '0'
  const result = activeEngine?.results?.compressionRatio?.result ?? null

  useEffect(() => {
    if (!bore || !stroke || !chamberVolume || !gasketBore || !gasketThickness) return
    const cr = calculateCompressionRatio(
      Number(bore),
      Number(stroke),
      Number(chamberVolume),
      Number(pistonDishVolume),
      Number(gasketBore),
      Number(gasketThickness),
      Number(deckClearance),
    )
    updateActiveEngine({
      results: { ...activeEngine?.results, compressionRatio: { result: cr } },
    })
  }, [bore, stroke, chamberVolume, pistonDishVolume, gasketBore, gasketThickness, deckClearance, activeEngine?.id])

  const chartData = useMemo(() => {
    if (result === null) return []
    const bVal = Number(bore)
    const step = isMobile ? BORE_STEP * 4 : BORE_STEP
    const minB = Math.max(0.1, bVal - 20)
    const maxB = bVal + 20
    const points = []
    for (let b = minB; b <= maxB + step / 2; b = Math.round((b + step) * 100) / 100) {
      points.push({
        x: b,
        y: calculateCompressionRatio(
          b,
          Number(stroke),
          Number(chamberVolume),
          Number(pistonDishVolume),
          Number(gasketBore),
          Number(gasketThickness),
          Number(deckClearance),
        ),
      })
    }
    return points
  }, [result, bore, stroke, chamberVolume, pistonDishVolume, gasketBore, gasketThickness, deckClearance, isMobile])

  if (!activeEngine) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SpeedIcon color="primary" />
          <Typography variant="h4">{t('compressionRatio.title')}</Typography>
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
        <Typography variant="h4">{t('compressionRatio.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('compressionRatio.subtitle')}
      </Typography>

      {result !== null && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          {t('compressionRatio.resultLabel')}: {result.toFixed(2)}{t('compressionRatio.resultUnit')}
        </Typography>
      )}

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          {t('compressionRatio.formulaTitle')}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
          {t('compressionRatio.formulaCR')}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
          {t('compressionRatio.formulaVd')}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
          {t('compressionRatio.formulaVc')}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
          {t('compressionRatio.formulaGasket')}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1.5 }}>
          {t('compressionRatio.formulaDeck')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">{t('compressionRatio.formulaVarCR')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('compressionRatio.formulaVarVd')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('compressionRatio.formulaVarVc')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('compressionRatio.formulaVarChamber')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('compressionRatio.formulaVarDish')}</Typography>
        </Box>
      </Paper>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-line' }}>
            {t('compressionRatio.chartDescription')}
          </Typography>
          <LineChart
            data={chartData}
            xLabel={t('compressionRatio.chartXLabel')}
            yLabel={t('compressionRatio.chartYLabel')}
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
