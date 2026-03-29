import TuneIcon from '@mui/icons-material/Tune'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import HomeIcon from '@mui/icons-material/Home'
import SpeedIcon from '@mui/icons-material/Speed'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import ScienceIcon from '@mui/icons-material/Science'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

export const ROUTES = {
  HOME: '/',
  INJECTION_MAP: '/injection-map',
  IGNITION_ADVANCE: '/ignition-advance',
  ENGINE_VISUALIZATION: '/engine-visualization',
  MCSA: '/mcsa',
  VOLUMETRIC_EFFICIENCY: '/volumetric-efficiency',
  LAMBDA_CORRECTION: '/lambda-correction',
  IGNITION_ADVANCE_COMPARISON: '/ignition-advance-comparison',
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
]
