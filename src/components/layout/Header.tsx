import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routeConfig } from '../../router/routes'

interface HeaderProps {
  sidebarWidth: number
}

const SUPPORTED_LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'pt-BR', label: 'PT' },
  { code: 'es', label: 'ES' },
]

export default function Header({ sidebarWidth }: HeaderProps) {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const currentRoute = routeConfig.find((r) => r.path === location.pathname)

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {currentRoute?.icon}
          <Typography variant="h6" noWrap>
            {currentRoute ? t(currentRoute.labelKey) : t('common.appName')}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 0.5, mr: 1 }}>
          {SUPPORTED_LANGS.map(({ code, label }) => (
            <Button
              key={code}
              size="small"
              variant={i18n.resolvedLanguage === code ? 'contained' : 'text'}
              onClick={() => i18n.changeLanguage(code)}
              sx={{ minWidth: 40, px: 1 }}
            >
              {label}
            </Button>
          ))}
        </Box>
        <IconButton color="inherit" aria-label={t('common.settings')}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
