import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { StepProps } from './types'

export default function StepCombustion({ control, isRequired }: StepProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="chamberVolume"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldChamberVolume')}
            type="number"
            required={isRequired('chamberVolume')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="pistonDishVolume"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldPistonDishVolume')}
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? t('engineWizard.fieldPistonDishVolumeHelper')}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="gasketBore"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldGasketBore')}
            type="number"
            required={isRequired('gasketBore')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="gasketThickness"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldGasketThickness')}
            type="number"
            required={isRequired('gasketThickness')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="deckClearance"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldDeckClearance')}
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? t('engineWizard.fieldDeckClearanceHelper')}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
    </Box>
  )
}
