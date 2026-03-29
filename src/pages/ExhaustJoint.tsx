import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import AirIcon from '@mui/icons-material/Air'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  calculateExhaustJoint,
  type ExhaustJointType,
} from './ExhaustJoint/calculateExhaustJoint'
import LineChart from '../components/ui/LineChart'
import { useLocalStorage } from '../hooks/useLocalStorage'

const DIAMETER_STEP = 0.1
const LENGTH_STEP = 1

export default function ExhaustJoint() {
  const { t } = useTranslation()

  const [primaryLength, setPrimaryLength] = useLocalStorage('fueltech:exhaustJoint.primaryLength', '')
  const [primaryDiameter, setPrimaryDiameter] = useLocalStorage('fueltech:exhaustJoint.primaryDiameter', '')
  const [type, setType] = useLocalStorage<ExhaustJointType>('fueltech:exhaustJoint.type', 'street')
  const [result, setResult] = useLocalStorage<{ jointLength: number; jointDiameter: number } | null>(
    'fueltech:exhaustJoint.result',
    null,
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDisabled = !primaryLength || !primaryDiameter

  function handleCalculate() {
    const res = calculateExhaustJoint(Number(primaryLength), Number(primaryDiameter), type)
    setResult(res)
  }

  const diameterChartData = useMemo(() => {
    if (result === null) return []
    const dVal = Number(primaryDiameter)
    const range = isMobile ? dVal * 0.5 : dVal
    const step = isMobile ? DIAMETER_STEP * 5 : DIAMETER_STEP
    const minD = Math.max(0.1, dVal - range)
    const maxD = dVal + range
    const points = []
    for (let d = minD; d <= maxD + step / 2; d = Math.round((d + step) * 100) / 100) {
      const { jointDiameter } = calculateExhaustJoint(Number(primaryLength), d, type)
      points.push({ x: d, y: jointDiameter })
    }
    return points
  }, [result, primaryDiameter, primaryLength, type, isMobile])

  const lengthChartData = useMemo(() => {
    if (result === null) return []
    const lVal = Number(primaryLength)
    const range = isMobile ? lVal * 0.5 : lVal
    const step = isMobile ? LENGTH_STEP * 5 : LENGTH_STEP
    const minL = Math.max(1, lVal - range)
    const maxL = lVal + range
    const points = []
    for (let l = minL; l <= maxL + step / 2; l = Math.round((l + step) * 100) / 100) {
      const { jointLength } = calculateExhaustJoint(l, Number(primaryDiameter), type)
      points.push({ x: l, y: jointLength })
    }
    return points
  }, [result, primaryLength, primaryDiameter, type, isMobile])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <AirIcon color="primary" />
        <Typography variant="h4">{t('exhaustJoint.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('exhaustJoint.subtitle')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
        <Paper sx={{ p: 3, width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('exhaustJoint.fieldPrimaryLength')}
              type="number"
              required
              value={primaryLength}
              onChange={(e) => setPrimaryLength(e.target.value)}
            />
            <TextField
              label={t('exhaustJoint.fieldPrimaryDiameter')}
              type="number"
              required
              value={primaryDiameter}
              onChange={(e) => setPrimaryDiameter(e.target.value)}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('exhaustJoint.fieldType')}
              </Typography>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(_, val) => { if (val !== null) setType(val) }}
                fullWidth
              >
                <ToggleButton value="street">{t('exhaustJoint.typeStreet')}</ToggleButton>
                <ToggleButton value="drag">{t('exhaustJoint.typeDrag')}</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Button variant="contained" onClick={handleCalculate} disabled={isDisabled}>
              {t('exhaustJoint.calculate')}
            </Button>
            {result !== null && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body1">
                  {t('exhaustJoint.resultJointLength')}: {result.jointLength.toFixed(2)} {t('exhaustJoint.resultUnit')}
                </Typography>
                <Typography variant="body1">
                  {t('exhaustJoint.resultJointDiameter')}: {result.jointDiameter.toFixed(2)} {t('exhaustJoint.resultUnit')}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {t('exhaustJoint.formulaTitle')}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            {t('exhaustJoint.formulaJointLength')}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            {t('exhaustJoint.formulaDiameterStreet')}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1.5 }}>
            {t('exhaustJoint.formulaDiameterDrag')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{t('exhaustJoint.formulaVarJointLength')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('exhaustJoint.formulaVarJointDiameter')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('exhaustJoint.formulaVarPrimaryLength')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('exhaustJoint.formulaVarPrimaryDiameter')}</Typography>
          </Box>
        </Paper>
      </Box>

      {result !== null && (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 3 }}>
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-line' }}>
              {t('exhaustJoint.chartDiameterDescription')}
            </Typography>
            <LineChart
              data={diameterChartData}
              xLabel={t('exhaustJoint.chartDiameterXLabel')}
              yLabel={t('exhaustJoint.chartDiameterYLabel')}
            />
          </Paper>
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-line' }}>
              {t('exhaustJoint.chartLengthDescription')}
            </Typography>
            <LineChart
              data={lengthChartData}
              xLabel={t('exhaustJoint.chartLengthXLabel')}
              yLabel={t('exhaustJoint.chartLengthYLabel')}
            />
          </Paper>
        </Box>
      )}
    </>
  )
}
