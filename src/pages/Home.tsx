import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TuneIcon from '@mui/icons-material/Tune'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import SpeedIcon from '@mui/icons-material/Speed'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import ScienceIcon from '@mui/icons-material/Science'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AirIcon from '@mui/icons-material/Air'
import { useTranslation } from 'react-i18next'
import FeatureCard from '../components/ui/FeatureCard'
import { ROUTES } from '../router/routes'

export default function Home() {
  const { t } = useTranslation()

  const features = [
    {
      title: t('aiAssistant.title'),
      description: t('aiAssistant.homeDescription'),
      icon: <AutoAwesomeIcon />,
      to: ROUTES.AI_ASSISTANT,
      tags: [t('aiAssistant.tagAI'), t('aiAssistant.tagEngineAnalysis'), t('aiAssistant.tagSuggestions')],
    },
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
    {
      title: t('mcsa.title'),
      description: t('mcsa.homeDescription'),
      icon: <SpeedIcon />,
      to: ROUTES.MCSA,
      tags: [t('mcsa.tagCalculator'), t('mcsa.tagIntakePort')],
    },
    {
      title: t('volumetricEfficiency.title'),
      description: t('volumetricEfficiency.homeDescription'),
      icon: <LocalGasStationIcon />,
      to: ROUTES.VOLUMETRIC_EFFICIENCY,
      tags: [t('volumetricEfficiency.tagVE'), t('volumetricEfficiency.tagFuelCorrection')],
    },
    {
      title: t('lambdaCorrection.title'),
      description: t('lambdaCorrection.homeDescription'),
      icon: <ScienceIcon />,
      to: ROUTES.LAMBDA_CORRECTION,
      tags: [t('lambdaCorrection.tagLambda'), t('lambdaCorrection.tagDynoData')],
    },
    {
      title: t('ignitionAdvanceComparison.title'),
      description: t('ignitionAdvanceComparison.homeDescription'),
      icon: <CompareArrowsIcon />,
      to: ROUTES.IGNITION_ADVANCE_COMPARISON,
      tags: [
        t('ignitionAdvanceComparison.tagComparison'),
        t('ignitionAdvanceComparison.tagTiming'),
      ],
    },
    {
      title: t('exhaustPipeArea.title'),
      description: t('exhaustPipeArea.homeDescription'),
      icon: <AirIcon />,
      to: ROUTES.EXHAUST_PIPE_AREA,
      tags: [t('exhaustPipeArea.tagCalculator'), t('exhaustPipeArea.tagExhaust')],
    },
    {
      title: t('exhaustPipeLength.title'),
      description: t('exhaustPipeLength.homeDescription'),
      icon: <AirIcon />,
      to: ROUTES.EXHAUST_PIPE_LENGTH,
      tags: [t('exhaustPipeLength.tagCalculator'), t('exhaustPipeLength.tagExhaust')],
    },
    {
      title: t('exhaustJoint.title'),
      description: t('exhaustJoint.homeDescription'),
      icon: <AirIcon />,
      to: ROUTES.EXHAUST_JOINT,
      tags: [t('exhaustJoint.tagCalculator'), t('exhaustJoint.tagExhaust')],
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
