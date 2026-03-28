import { alpha, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  to: string
  tags: string[]
}

export default function FeatureCard({ title, description, icon, to, tags }: FeatureCardProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.12),
          '& .MuiSvgIcon-root': { fontSize: 56, color: 'primary.main' },
        }}
      >
        {icon}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button component={Link} to={to} variant="contained" size="small">
          {t('common.openTool')}
        </Button>
      </CardActions>
    </Card>
  )
}
