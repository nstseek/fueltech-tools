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
import { calculateExhaustPipeArea } from './ExhaustPipeArea/calculateExhaustPipeArea'
import LineChart from '../components/ui/LineChart'
import { useLocalStorage } from '../hooks/useLocalStorage'

const RPM_STEP = 100

export default function ExhaustPipeArea() {
  const { t } = useTranslation()

  const [rpm, setRpm] = useLocalStorage('fueltech:exhaustPipeArea.rpm', '')
  const [cylinderVolume, setCylinderVolume] = useLocalStorage('fueltech:exhaustPipeArea.cylinderVolume', '')
  const [result, setResult] = useLocalStorage<{ area: number; diameter: number } | null>(
    'fueltech:exhaustPipeArea.result',
    null,
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDisabled = !rpm || !cylinderVolume

  function handleCalculate() {
    const res = calculateExhaustPipeArea(Number(rpm), Number(cylinderVolume))
    setResult(res)
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
      points.push({ x: r, y: calculateExhaustPipeArea(r, Number(cylinderVolume)).diameter })
    }
    return points
  }, [result, cylinderVolume, rpm, isMobile])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <AirIcon color="primary" />
        <Typography variant="h4">{t('exhaustPipeArea.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('exhaustPipeArea.subtitle')}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={t('exhaustPipeArea.fieldRPM')}
            type="number"
            required
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
          />
          <TextField
            label={t('exhaustPipeArea.fieldCylinderVolume')}
            type="number"
            required
            value={cylinderVolume}
            onChange={(e) => setCylinderVolume(e.target.value)}
          />
          <Button variant="contained" onClick={handleCalculate} disabled={isDisabled}>
            {t('exhaustPipeArea.calculate')}
          </Button>
          {result !== null && (
            <>
              <Typography variant="body1">
                {t('exhaustPipeArea.resultArea')}: {result.area.toFixed(4)} {t('exhaustPipeArea.resultAreaUnit')}
              </Typography>
              <Typography variant="body1">
                {t('exhaustPipeArea.resultDiameter')}: {result.diameter.toFixed(4)} {t('exhaustPipeArea.resultDiameterUnit')}
              </Typography>
            </>
          )}
        </Box>
      </Paper>

      {chartData.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <LineChart
            data={chartData}
            xLabel={t('exhaustPipeArea.chartXLabel')}
            yLabel={t('exhaustPipeArea.chartYLabel')}
          />
        </Paper>
      )}
    </>
  )
}
