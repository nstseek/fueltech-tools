import { useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { EngineProvider } from '../../contexts/EngineContext'

const SIDEBAR_WIDTH = 300

export default function AppLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <EngineProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          width={SIDEBAR_WIDTH}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: isMobile ? '100%' : `calc(100% - ${SIDEBAR_WIDTH}px)`,
          }}
        >
          <Header
            sidebarWidth={isMobile ? 0 : SIDEBAR_WIDTH}
            onMenuToggle={() => setMobileOpen((prev) => !prev)}
            isMobile={isMobile}
          />
          <Toolbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </EngineProvider>
  )
}
