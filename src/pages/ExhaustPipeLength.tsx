import { useMemo } from 'react'
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
import { useLocalStorage } from '../hooks/useLocalStorage'

const RPM_STEP = 100

export default function ExhaustPipeLength() {
  const { t } = useTranslation()

  const [rpm, setRpm] = useLocalStorage('fueltech:exhaustPipeLength.rpm', '')
  const [evo, setEvo] = useLocalStorage('fueltech:exhaustPipeLength.evo', '')
  const [result, setResult] = useLocalStorage<number | null>('fueltech:exhaustPipeLength.result', null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDisabled = !rpm || !evo

  function handleCalculate() {
    const length = calculateExhaustPipeLength(Number(rpm), Number(evo))
    setResult(length)
  }

  const chartData = useMemo(() => {
    if (result === null) return []
    const rpmVal = Number(rpm)
    const range = isMobile ? 1000 : 3000
    const step = isMobile ? 500 : RPM_STEP
    const minRPM = Math.max(0, rpmVal - range)
    const maxRPM = rpmVal + range
    const points = []
    for (let r = minRPM; r <= maxRPM; r += step) {
      points.push({ x: r, y: calculateExhaustPipeLength(r, Number(evo)) })
    }
    return points
  }, [result, evo, rpm, isMobile])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <AirIcon color="primary" />
        <Typography variant="h4">{t('exhaustPipeLength.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('exhaustPipeLength.subtitle')}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={t('exhaustPipeLength.fieldRPM')}
            type="number"
            required
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
          />
          <TextField
            label={t('exhaustPipeLength.fieldEVO')}
            type="number"
            required
            value={evo}
            onChange={(e) => setEvo(e.target.value)}
          />
          <Button variant="contained" onClick={handleCalculate} disabled={isDisabled}>
            {t('exhaustPipeLength.calculate')}
          </Button>
          {result !== null && (
            <Typography variant="body1">
              {t('exhaustPipeLength.resultLabel')}: {result} {t('exhaustPipeLength.resultUnit')}
            </Typography>
          )}
        </Box>
      </Paper>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <LineChart
            data={chartData}
            xLabel={t('exhaustPipeLength.chartXLabel')}
            yLabel={t('exhaustPipeLength.chartYLabel')}
          />
        </Paper>
      )}
    </>
  )
}
