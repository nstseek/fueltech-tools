import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ScienceIcon from '@mui/icons-material/Science'
import { useTranslation } from 'react-i18next'

export default function LambdaCorrection() {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <ScienceIcon color="primary" />
        <Typography variant="h4">{t('lambdaCorrection.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('lambdaCorrection.subtitle')}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Alert severity="info">{t('lambdaCorrection.underDevelopment')}</Alert>
      </Paper>
    </>
  )
}
