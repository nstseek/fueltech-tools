import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useTranslation } from 'react-i18next'
import { useEngineContext } from '../../contexts/EngineContext'

export interface EngineManagerDialogProps {
  open: boolean
  onClose: () => void
  onCreateNew: () => void
  onEditEngine: (id: string) => void
}

export default function EngineManagerDialog({
  open,
  onClose,
  onCreateNew,
  onEditEngine,
}: EngineManagerDialogProps) {
  const { t } = useTranslation()
  const { engines, activeEngineId, selectEngine, deleteEngine } = useEngineContext()

  function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('engineManager.title')}</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {engines.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">{t('engineManager.noEngines')}</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {engines.map((engine) => {
              const isActive = engine.id === activeEngineId
              return (
                <ListItem
                  key={engine.id}
                  divider
                  sx={{ gap: 1 }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => onEditEngine(engine.id)}
                        title={t('engineManager.editEngine')}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteEngine(engine.id)}
                        title={t('engineManager.deleteEngine')}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <IconButton
                    size="small"
                    onClick={() => selectEngine(engine.id)}
                    color={isActive ? 'primary' : 'default'}
                    sx={{ mr: 1 }}
                  >
                    {isActive ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                  </IconButton>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight={isActive ? 700 : 400}>
                          {engine.name}
                        </Typography>
                        {isActive && (
                          <Chip
                            label={t('engineManager.selectedLabel')}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                    secondary={`${t('engineManager.lastUpdated')}: ${formatDate(engine.updatedAt)}`}
                  />
                </ListItem>
              )
            })}
          </List>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={onCreateNew}>
          {t('engineManager.createNew')}
        </Button>
        <Button onClick={onClose}>{t('common.back')}</Button>
      </DialogActions>
    </Dialog>
  )
}
