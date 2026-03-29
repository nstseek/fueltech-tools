import { useMemo } from 'react'
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
import { useLocalStorage } from '../hooks/useLocalStorage'

const RPM_STEP = 100

export default function Mcsa() {
  const { t } = useTranslation()

  const [pistonDiameter, setPistonDiameter] = useLocalStorage('fueltech:mcsa.pistonDiameter', '')
  const [stroke, setStroke] = useLocalStorage('fueltech:mcsa.stroke', '')
  const [rpm, setRpm] = useLocalStorage('fueltech:mcsa.rpm', '')
  const [result, setResult] = useLocalStorage<number | null>('fueltech:mcsa.result', null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDisabled = !pistonDiameter || !stroke || !rpm

  function handleCalculate() {
    const mcsa = calculateMCSA(Number(pistonDiameter), Number(stroke), Number(rpm))
    setResult(mcsa)
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
      points.push({ x: r, y: calculateMCSA(Number(pistonDiameter), Number(stroke), r) })
    }
    return points
  }, [result, pistonDiameter, stroke, rpm, isMobile])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <SpeedIcon color="primary" />
        <Typography variant="h4">{t('mcsa.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('mcsa.subtitle')}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={t('mcsa.fieldPistonDiameter')}
            type="number"
            required
            value={pistonDiameter}
            onChange={(e) => setPistonDiameter(e.target.value)}
          />
          <TextField
            label={t('mcsa.fieldStroke')}
            type="number"
            required
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
          />
          <TextField
            label={t('mcsa.fieldRPM')}
            type="number"
            required
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
          />
          <Button variant="contained" onClick={handleCalculate} disabled={isDisabled}>
            {t('mcsa.calculate')}
          </Button>
          {result !== null && (
            <Typography variant="body1">
              {t('mcsa.resultLabel')}: {result} {t('mcsa.resultUnit')}
            </Typography>
          )}
        </Box>
      </Paper>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <LineChart
            data={chartData}
            xLabel={t('mcsa.chartXLabel')}
            yLabel={t('mcsa.chartYLabel')}
          />
        </Paper>
      )}
    </>
  )
}
