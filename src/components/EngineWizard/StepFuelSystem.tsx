import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { StepProps } from './types'

export default function StepFuelSystem({ control, isRequired }: StepProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="maxMAP"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldMaxMAP')}
            type="number"
            required={isRequired('maxMAP')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="injectorSize"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldInjectorSize')}
            type="number"
            required={isRequired('injectorSize')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="bsfc"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldBsfc')}
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? t('engineWizard.fieldBsfcHelper')}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
    </Box>
  )
}
