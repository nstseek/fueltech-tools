import TuneIcon from '@mui/icons-material/Tune'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import HomeIcon from '@mui/icons-material/Home'

export const ROUTES = {
  HOME: '/',
  INJECTION_MAP: '/injection-map',
  IGNITION_ADVANCE: '/ignition-advance',
  ENGINE_VISUALIZATION: '/engine-visualization',
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
]
