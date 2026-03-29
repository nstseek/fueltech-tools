import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SpeedIcon from '@mui/icons-material/Speed'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { calculateRLRatio } from './RLRatio/calculateRLRatio'
import LineChart from '../components/ui/LineChart'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ROD_STEP = 2

export default function RLRatio() {
  const { t } = useTranslation()

  const [stroke, setStroke] = useLocalStorage('fueltech:rlRatio.stroke', '')
  const [rodLength, setRodLength] = useLocalStorage('fueltech:rlRatio.rodLength', '')
  const [result, setResult] = useLocalStorage<number | null>('fueltech:rlRatio.result', null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDisabled = !stroke || !rodLength

  function handleCalculate() {
    setResult(calculateRLRatio(Number(stroke), Number(rodLength)))
  }

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

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <SpeedIcon color="primary" />
        <Typography variant="h4">{t('rlRatio.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('rlRatio.subtitle')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
        <Paper sx={{ p: 3, width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('rlRatio.fieldStroke')}
              type="number"
              required
              value={stroke}
              onChange={(e) => setStroke(e.target.value)}
            />
            <TextField
              label={t('rlRatio.fieldRodLength')}
              type="number"
              required
              value={rodLength}
              onChange={(e) => setRodLength(e.target.value)}
            />
            <Button variant="contained" onClick={handleCalculate} disabled={isDisabled}>
              {t('rlRatio.calculate')}
            </Button>
            {result !== null && (
              <Typography variant="body1">
                {t('rlRatio.resultLabel')}: {result.toFixed(4)}
              </Typography>
            )}
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
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
      </Box>

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
    </>
  )
}
