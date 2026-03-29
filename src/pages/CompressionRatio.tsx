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
import { calculateCompressionRatio } from './CompressionRatio/calculateCompressionRatio'
import LineChart from '../components/ui/LineChart'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BORE_STEP = 0.5

export default function CompressionRatio() {
  const { t } = useTranslation()

  const [bore, setBore] = useLocalStorage('fueltech:compressionRatio.bore', '')
  const [stroke, setStroke] = useLocalStorage('fueltech:compressionRatio.stroke', '')
  const [chamberVolume, setChamberVolume] = useLocalStorage('fueltech:compressionRatio.chamberVolume', '')
  const [pistonDishVolume, setPistonDishVolume] = useLocalStorage('fueltech:compressionRatio.pistonDishVolume', '0')
  const [gasketBore, setGasketBore] = useLocalStorage('fueltech:compressionRatio.gasketBore', '')
  const [gasketThickness, setGasketThickness] = useLocalStorage('fueltech:compressionRatio.gasketThickness', '')
  const [deckClearance, setDeckClearance] = useLocalStorage('fueltech:compressionRatio.deckClearance', '0')
  const [result, setResult] = useLocalStorage<number | null>('fueltech:compressionRatio.result', null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDisabled = !bore || !stroke || !chamberVolume || !gasketBore || !gasketThickness

  function handleCalculate() {
    setResult(
      calculateCompressionRatio(
        Number(bore),
        Number(stroke),
        Number(chamberVolume),
        Number(pistonDishVolume),
        Number(gasketBore),
        Number(gasketThickness),
        Number(deckClearance),
      ),
    )
  }

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

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <SpeedIcon color="primary" />
        <Typography variant="h4">{t('compressionRatio.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('compressionRatio.subtitle')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
        <Paper sx={{ p: 3, width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('compressionRatio.fieldBore')}
              type="number"
              required
              value={bore}
              onChange={(e) => setBore(e.target.value)}
            />
            <TextField
              label={t('compressionRatio.fieldStroke')}
              type="number"
              required
              value={stroke}
              onChange={(e) => setStroke(e.target.value)}
            />
            <TextField
              label={t('compressionRatio.fieldChamberVolume')}
              type="number"
              required
              value={chamberVolume}
              onChange={(e) => setChamberVolume(e.target.value)}
            />
            <TextField
              label={t('compressionRatio.fieldPistonDishVolume')}
              type="number"
              helperText={t('compressionRatio.fieldPistonDishVolumeHelper')}
              value={pistonDishVolume}
              onChange={(e) => setPistonDishVolume(e.target.value)}
            />
            <TextField
              label={t('compressionRatio.fieldGasketBore')}
              type="number"
              required
              value={gasketBore}
              onChange={(e) => setGasketBore(e.target.value)}
            />
            <TextField
              label={t('compressionRatio.fieldGasketThickness')}
              type="number"
              required
              value={gasketThickness}
              onChange={(e) => setGasketThickness(e.target.value)}
            />
            <TextField
              label={t('compressionRatio.fieldDeckClearance')}
              type="number"
              helperText={t('compressionRatio.fieldDeckClearanceHelper')}
              value={deckClearance}
              onChange={(e) => setDeckClearance(e.target.value)}
            />
            <Button variant="contained" onClick={handleCalculate} disabled={isDisabled}>
              {t('compressionRatio.calculate')}
            </Button>
            {result !== null && (
              <Typography variant="body1">
                {t('compressionRatio.resultLabel')}: {result.toFixed(2)}{t('compressionRatio.resultUnit')}
              </Typography>
            )}
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
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
      </Box>

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
    </>
  )
}
