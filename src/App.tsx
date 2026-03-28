import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import InjectionMap from './pages/InjectionMap'
import IgnitionAdvance from './pages/IgnitionAdvance'
import EngineVisualization from './pages/EngineVisualization'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'injection-map', element: <InjectionMap /> },
      { path: 'ignition-advance', element: <IgnitionAdvance /> },
      { path: 'engine-visualization', element: <EngineVisualization /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
