import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { StepProps } from './types'

export default function StepValvetrain({ control, isRequired }: StepProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="valvesPerCylinder"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldValvesPerCylinder')}
            type="number"
            required={isRequired('valvesPerCylinder')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="intakeValveOpens"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldIntakeValveOpens')}
            type="number"
            required={isRequired('intakeValveOpens')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="intakeValveCloses"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldIntakeValveCloses')}
            type="number"
            required={isRequired('intakeValveCloses')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="exhaustValveOpens"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldExhaustValveOpens')}
            type="number"
            required={isRequired('exhaustValveOpens')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="exhaustValveCloses"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldExhaustValveCloses')}
            type="number"
            required={isRequired('exhaustValveCloses')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="injectionAngle"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldInjectionAngle')}
            type="number"
            required={isRequired('injectionAngle')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="injectionMethod"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>{t('engineWizard.fieldInjectionMethod')}</FormLabel>
            <RadioGroup value={field.value}>
              <FormControlLabel value="sequential" control={<Radio />} label={t('engineWizard.fieldMethodSequential')} />
            </RadioGroup>
          </FormControl>
        )}
      />
      <Controller
        name="ignitionMethod"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>{t('engineWizard.fieldIgnitionMethod')}</FormLabel>
            <RadioGroup value={field.value}>
              <FormControlLabel value="sequential" control={<Radio />} label={t('engineWizard.fieldMethodSequential')} />
            </RadioGroup>
          </FormControl>
        )}
      />
    </Box>
  )
}
