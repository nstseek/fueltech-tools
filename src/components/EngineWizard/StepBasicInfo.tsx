import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { FuelType } from '../../types/engineProfile'
import type { StepProps } from './types'

export default function StepBasicInfo({ control, isRequired }: StepProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldName')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? t('engineWizard.fieldNameHelper')}
          />
        )}
      />
      <Controller
        name="numCylinders"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={t('engineWizard.fieldNumCylinders')}
            type="number"
            required={isRequired('numCylinders')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        )}
      />
      <Controller
        name="fuelType"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <FormLabel required={isRequired('fuelType')}>{t('engineWizard.fieldFuelType')}</FormLabel>
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.target.value as FuelType)}
            >
              <FormControlLabel value="gasoline" control={<Radio />} label={t('engineWizard.fieldFuelTypeGasoline')} />
              <FormControlLabel value="ethanol" control={<Radio />} label={t('engineWizard.fieldFuelTypeEthanol')} />
            </RadioGroup>
            {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Box>
  )
}
