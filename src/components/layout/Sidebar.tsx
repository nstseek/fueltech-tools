import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routeConfig } from '../../router/routes'

interface SidebarProps {
  width: number
  mobileOpen: boolean
  onClose: () => void
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          component="img"
          src="/ft.png"
          alt={t('common.appName')}
          sx={{ height: 32, width: 'auto' }}
        />
        <Typography variant="subtitle1" fontWeight={700} noWrap>
          {t('common.appName')}
        </Typography>
      </Toolbar>
      <List sx={{ pt: 1 }}>
        {routeConfig.map((route) => (
          <ListItem key={route.path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={route.path}
              end={route.path === '/'}
              onClick={isMobile ? onClose : undefined}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&[aria-current="page"]': {
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{route.icon}</ListItemIcon>
              <ListItemText primary={t(route.labelKey)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default function Sidebar({ width, mobileOpen, onClose }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
        },
      }}
    >
      <SidebarContent onClose={onClose} />
    </Drawer>
  )
}
