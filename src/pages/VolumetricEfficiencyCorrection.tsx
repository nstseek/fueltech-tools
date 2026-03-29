import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import { useTranslation } from 'react-i18next'

export default function VolumetricEfficiencyCorrection() {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <LocalGasStationIcon color="primary" />
        <Typography variant="h4">{t('volumetricEfficiency.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('volumetricEfficiency.subtitle')}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Alert severity="info">{t('volumetricEfficiency.underDevelopment')}</Alert>
      </Paper>
    </>
  )
}
