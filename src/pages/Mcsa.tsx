import { useMemo, useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SpeedIcon from '@mui/icons-material/Speed'
import { useTranslation } from 'react-i18next'
import { calculateMCSA } from './Mcsa/calculateMCSA'
import LineChart from '../components/ui/LineChart'
import { useEngineContext } from '../contexts/EngineContext'
import EngineWizardDialog from '../components/EngineWizard'
import { useWizardGuard } from '../hooks/useWizardGuard'
import { hasRequiredFields } from '../schemas/engineProfile'
import type { EngineProfileField } from '../types/engineProfile'

const RPM_STEP = 100

const REQUIRED_FIELDS: EngineProfileField[] = ['bore', 'stroke']

export default function Mcsa() {
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
    // Set default rpm from maxRPM when engine loads and no rpm is stored yet
    if (activeEngine.maxRPM && activeEngine.toolParams?.mcsa?.rpm === undefined) {
      updateActiveEngine({ toolParams: { ...activeEngine.toolParams, mcsa: { rpm: activeEngine.maxRPM } } })
    }
  }, [activeEngine?.id])

  const bore = activeEngine?.bore?.toString() ?? ''
  const stroke = activeEngine?.stroke?.toString() ?? ''
  const rpm = activeEngine?.toolParams?.mcsa?.rpm
  const rpmStr = rpm?.toString() ?? ''
  const result = activeEngine?.results?.mcsa?.result ?? null

  useEffect(() => {
    if (!bore || !stroke || rpm === undefined) return
    const mcsa = calculateMCSA(Number(bore), Number(stroke), Number(rpm))
    updateActiveEngine({
      results: { ...activeEngine?.results, mcsa: { result: mcsa } },
    })
  }, [bore, stroke, rpm, activeEngine?.id])

  const chartData = useMemo(() => {
    if (result === null) return []
    const rpmVal = Number(rpmStr)
    const range = isMobile ? 1000 : 3000
    const step = isMobile ? 500 : RPM_STEP
    const minRPM = Math.max(0, rpmVal - range)
    const maxRPM = rpmVal + range
    const points = []
    for (let r = minRPM; r <= maxRPM; r += step) {
      points.push({ x: r, y: calculateMCSA(Number(bore), Number(stroke), r) })
    }
    return points
  }, [result, bore, stroke, rpmStr, isMobile])

  if (!activeEngine) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SpeedIcon color="primary" />
          <Typography variant="h4">{t('mcsa.title')}</Typography>
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
        <Typography variant="h4">{t('mcsa.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('mcsa.subtitle')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
        <Paper sx={{ p: 3, width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('mcsa.fieldRPM')}
              type="number"
              required
              value={rpmStr}
              onChange={(e) =>
                updateActiveEngine({
                  toolParams: {
                    ...activeEngine?.toolParams,
                    mcsa: { rpm: e.target.value ? parseFloat(e.target.value) : undefined },
                  },
                })
              }
            />
            {result !== null && (
              <Typography variant="body1">
                {t('mcsa.resultLabel')}: {result} {t('mcsa.resultUnit')}
              </Typography>
            )}
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {t('mcsa.formulaTitle')}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1.5 }}>
            {t('mcsa.formulaExpression')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{t('mcsa.formulaVarMCSA')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('mcsa.formulaVarD')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('mcsa.formulaVarS')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('mcsa.formulaVarRPM')}</Typography>
          </Box>
        </Paper>
      </Box>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-line' }}>
            {t('mcsa.chartDescription')}
          </Typography>
          <LineChart
            data={chartData}
            xLabel={t('mcsa.chartXLabel')}
            yLabel={t('mcsa.chartYLabel')}
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
