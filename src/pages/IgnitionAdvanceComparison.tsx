import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { useTranslation } from 'react-i18next'

export default function IgnitionAdvanceComparison() {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <CompareArrowsIcon color="primary" />
        <Typography variant="h4">{t('ignitionAdvanceComparison.title')}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('ignitionAdvanceComparison.subtitle')}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Alert severity="info">{t('ignitionAdvanceComparison.underDevelopment')}</Alert>
      </Paper>
    </>
  )
}
