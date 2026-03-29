import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import InjectionMap from './pages/InjectionMap'
import IgnitionAdvance from './pages/IgnitionAdvance'
import EngineVisualization from './pages/EngineVisualization'
import Mcsa from './pages/Mcsa'
import VolumetricEfficiencyCorrection from './pages/VolumetricEfficiencyCorrection'
import LambdaCorrection from './pages/LambdaCorrection'
import IgnitionAdvanceComparison from './pages/IgnitionAdvanceComparison'
import AiAssistant from './pages/AiAssistant'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'injection-map', element: <InjectionMap /> },
      { path: 'ignition-advance', element: <IgnitionAdvance /> },
      { path: 'engine-visualization', element: <EngineVisualization /> },
      { path: 'mcsa', element: <Mcsa /> },
      { path: 'volumetric-efficiency', element: <VolumetricEfficiencyCorrection /> },
      { path: 'lambda-correction', element: <LambdaCorrection /> },
      { path: 'ignition-advance-comparison', element: <IgnitionAdvanceComparison /> },
      { path: 'ai-assistant', element: <AiAssistant /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
