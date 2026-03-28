import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fe0000',
    },
    secondary: {
      main: '#00BCD4',
    },
    background: {
      default: '#0f1117',
      paper: '#1a1d27',
    },
  },
  shape: {
    borderRadius: 8,
  },
})
