import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { ExhaustJointType } from '../../types/engineProfile'
import type { StepProps } from './types'

export default function StepExhaust({ control, isRequired }: StepProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="exhaustPrimaryLength"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldExhaustPrimaryLength')}
            type="number"
            required={isRequired('exhaustPrimaryLength')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="exhaustPrimaryDiameter"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldExhaustPrimaryDiameter')}
            type="number"
            required={isRequired('exhaustPrimaryDiameter')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="exhaustJointType"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel required={isRequired('exhaustJointType')}>{t('engineWizard.fieldExhaustJointType')}</FormLabel>
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.target.value as ExhaustJointType)}
            >
              <FormControlLabel value="street" control={<Radio />} label={t('engineWizard.fieldExhaustJointStreet')} />
              <FormControlLabel value="drag" control={<Radio />} label={t('engineWizard.fieldExhaustJointDrag')} />
            </RadioGroup>
          </FormControl>
        )}
      />
    </Box>
  )
}
