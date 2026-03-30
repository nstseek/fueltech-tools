import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { StepProps } from './types'

export default function StepGeometry({ control, isRequired }: StepProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="bore"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldBore')}
            type="number"
            required={isRequired('bore')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="stroke"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldStroke')}
            type="number"
            required={isRequired('stroke')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="conrodLength"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldConrodLength')}
            type="number"
            required={isRequired('conrodLength')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
    </Box>
  )
}
