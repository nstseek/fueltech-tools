import TuneIcon from '@mui/icons-material/Tune'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import HomeIcon from '@mui/icons-material/Home'
import SpeedIcon from '@mui/icons-material/Speed'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import ScienceIcon from '@mui/icons-material/Science'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AirIcon from '@mui/icons-material/Air'

export const ROUTES = {
  HOME: '/',
  INJECTION_MAP: '/injection-map',
  IGNITION_ADVANCE: '/ignition-advance',
  ENGINE_VISUALIZATION: '/engine-visualization',
  MCSA: '/mcsa',
  VOLUMETRIC_EFFICIENCY: '/volumetric-efficiency',
  LAMBDA_CORRECTION: '/lambda-correction',
  IGNITION_ADVANCE_COMPARISON: '/ignition-advance-comparison',
  AI_ASSISTANT: '/ai-assistant',
  EXHAUST_PIPE_AREA: '/exhaust-pipe-area',
  EXHAUST_PIPE_LENGTH: '/exhaust-pipe-length',
  EXHAUST_JOINT: '/exhaust-joint',
  RL_RATIO: '/rl-ratio',
  COMPRESSION_RATIO: '/compression-ratio',
} as const

export interface RouteConfig {
  path: string
  labelKey: string
  icon: React.ReactNode
}

export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    labelKey: 'nav.home',
    icon: <HomeIcon />,
  },
  {
    path: ROUTES.AI_ASSISTANT,
    labelKey: 'nav.aiAssistant',
    icon: <AutoAwesomeIcon />,
  },
  {
    path: ROUTES.INJECTION_MAP,
    labelKey: 'nav.injectionMap',
    icon: <TuneIcon />,
  },
  {
    path: ROUTES.IGNITION_ADVANCE,
    labelKey: 'nav.ignitionAdvance',
    icon: <FlashOnIcon />,
  },
  {
    path: ROUTES.ENGINE_VISUALIZATION,
    labelKey: 'nav.engineVisualization',
    icon: <PrecisionManufacturingIcon />,
  },
  {
    path: ROUTES.MCSA,
    labelKey: 'nav.mcsa',
    icon: <SpeedIcon />,
  },
  {
    path: ROUTES.VOLUMETRIC_EFFICIENCY,
    labelKey: 'nav.volumetricEfficiency',
    icon: <LocalGasStationIcon />,
  },
  {
    path: ROUTES.LAMBDA_CORRECTION,
    labelKey: 'nav.lambdaCorrection',
    icon: <ScienceIcon />,
  },
  {
    path: ROUTES.IGNITION_ADVANCE_COMPARISON,
    labelKey: 'nav.ignitionAdvanceComparison',
    icon: <CompareArrowsIcon />,
  },
  {
    path: ROUTES.EXHAUST_PIPE_AREA,
    labelKey: 'nav.exhaustPipeArea',
    icon: <AirIcon />,
  },
  {
    path: ROUTES.EXHAUST_PIPE_LENGTH,
    labelKey: 'nav.exhaustPipeLength',
    icon: <AirIcon />,
  },
  {
    path: ROUTES.EXHAUST_JOINT,
    labelKey: 'nav.exhaustJoint',
    icon: <AirIcon />,
  },
  {
    path: ROUTES.RL_RATIO,
    labelKey: 'nav.rlRatio',
    icon: <SpeedIcon />,
  },
  {
    path: ROUTES.COMPRESSION_RATIO,
    labelKey: 'nav.compressionRatio',
    icon: <SpeedIcon />,
  },
]
