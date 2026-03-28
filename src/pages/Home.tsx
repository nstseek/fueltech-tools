import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TuneIcon from '@mui/icons-material/Tune'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useTranslation } from 'react-i18next'
import FeatureCard from '../components/ui/FeatureCard'
import { ROUTES } from '../router/routes'

export default function Home() {
  const { t } = useTranslation()

  const features = [
    {
      title: t('injectionMap.title'),
      description: t('injectionMap.homeDescription'),
      icon: <TuneIcon />,
      to: ROUTES.INJECTION_MAP,
      tags: [t('common.wizardForm'), t('injectionMap.tagMapAxis'), t('common.dataGrid')],
    },
    {
      title: t('ignitionAdvance.title'),
      description: t('ignitionAdvance.homeDescription'),
      icon: <FlashOnIcon />,
      to: ROUTES.IGNITION_ADVANCE,
      tags: [t('common.wizardForm'), t('ignitionAdvance.tagRpmAxis'), t('common.dataGrid')],
    },
    {
      title: t('engineVisualization.title'),
      description: t('engineVisualization.homeDescription'),
      icon: <PrecisionManufacturingIcon />,
      to: ROUTES.ENGINE_VISUALIZATION,
      tags: [
        t('common.wizardForm'),
        t('engineVisualization.tagD3Graph'),
        t('engineVisualization.tagPerStroke'),
      ],
    },
  ]

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('common.appName')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('home.subtitle')}
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
