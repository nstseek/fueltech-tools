import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useEngineContext } from '../../contexts/EngineContext'
import type { EngineProfile, EngineProfileField } from '../../types/engineProfile'
import { FIELD_STEP } from '../../types/engineProfile'
import { EMPTY_FORM, type WizardForm } from './types'
import { createWizardSchema } from './schema'
import StepBasicInfo from './StepBasicInfo'
import StepGeometry from './StepGeometry'
import StepPerformance from './StepPerformance'
import StepValvetrain from './StepValvetrain'
import StepFuelSystem from './StepFuelSystem'
import StepExhaust from './StepExhaust'
import StepCombustion from './StepCombustion'

function profileToForm(engine: EngineProfile): WizardForm {
  return {
    name: engine.name,
    numCylinders: engine.numCylinders?.toString() ?? '',
    fuelType: engine.fuelType ?? '',
    bore: engine.bore?.toString() ?? '',
    stroke: engine.stroke?.toString() ?? '',
    conrodLength: engine.conrodLength?.toString() ?? '',
    maxRPM: engine.maxRPM?.toString() ?? '',
    idleRPM: engine.idleRPM?.toString() ?? '',
    peakPower: engine.peakPower?.toString() ?? '',
    rpmAtPeakPower: engine.rpmAtPeakPower?.toString() ?? '',
    peakTorque: engine.peakTorque?.toString() ?? '',
    rpmAtPeakTorque: engine.rpmAtPeakTorque?.toString() ?? '',
    peakTorqueRPM: engine.peakTorqueRPM?.toString() ?? '',
    valvesPerCylinder: engine.valvesPerCylinder?.toString() ?? '',
    intakeValveOpens: engine.intakeValveOpens?.toString() ?? '',
    intakeValveCloses: engine.intakeValveCloses?.toString() ?? '',
    exhaustValveOpens: engine.exhaustValveOpens?.toString() ?? '',
    exhaustValveCloses: engine.exhaustValveCloses?.toString() ?? '',
    injectionAngle: engine.injectionAngle?.toString() ?? '',
    injectionMethod: engine.injectionMethod ?? 'sequential',
    ignitionMethod: engine.ignitionMethod ?? 'sequential',
    maxMAP: engine.maxMAP?.toString() ?? '',
    injectorSize: engine.injectorSize?.toString() ?? '',
    bsfc: engine.bsfc?.toString() ?? '',
    exhaustPrimaryLength: engine.exhaustPrimaryLength?.toString() ?? '',
    exhaustPrimaryDiameter: engine.exhaustPrimaryDiameter?.toString() ?? '',
    exhaustJointType: engine.exhaustJointType ?? 'street',
    chamberVolume: engine.chamberVolume?.toString() ?? '',
    pistonDishVolume: engine.pistonDishVolume?.toString() ?? '',
    gasketBore: engine.gasketBore?.toString() ?? '',
    gasketThickness: engine.gasketThickness?.toString() ?? '',
    deckClearance: engine.deckClearance?.toString() ?? '',
  }
}

function formToProfileUpdates(form: WizardForm): Partial<EngineProfile> {
  const parse = (v: string) => (v !== '' ? parseFloat(v) : undefined)
  return {
    name: form.name,
    numCylinders: parse(form.numCylinders),
    fuelType: form.fuelType || undefined,
    bore: parse(form.bore),
    stroke: parse(form.stroke),
    conrodLength: parse(form.conrodLength),
    maxRPM: parse(form.maxRPM),
    idleRPM: parse(form.idleRPM),
    peakPower: parse(form.peakPower),
    rpmAtPeakPower: parse(form.rpmAtPeakPower),
    peakTorque: parse(form.peakTorque),
    rpmAtPeakTorque: parse(form.rpmAtPeakTorque),
    peakTorqueRPM: parse(form.peakTorqueRPM),
    valvesPerCylinder: parse(form.valvesPerCylinder),
    intakeValveOpens: parse(form.intakeValveOpens),
    intakeValveCloses: parse(form.intakeValveCloses),
    exhaustValveOpens: parse(form.exhaustValveOpens),
    exhaustValveCloses: parse(form.exhaustValveCloses),
    injectionAngle: parse(form.injectionAngle),
    injectionMethod: form.injectionMethod,
    ignitionMethod: form.ignitionMethod,
    maxMAP: parse(form.maxMAP),
    injectorSize: parse(form.injectorSize),
    bsfc: parse(form.bsfc),
    exhaustPrimaryLength: parse(form.exhaustPrimaryLength),
    exhaustPrimaryDiameter: parse(form.exhaustPrimaryDiameter),
    exhaustJointType: form.exhaustJointType,
    chamberVolume: parse(form.chamberVolume),
    pistonDishVolume: parse(form.pistonDishVolume),
    gasketBore: parse(form.gasketBore),
    gasketThickness: parse(form.gasketThickness),
    deckClearance: parse(form.deckClearance),
  }
}

export interface EngineWizardDialogProps {
  open: boolean
  onClose: (event?: object, reason?: 'backdropClick' | 'escapeKeyDown') => void
  requiredFields?: EngineProfileField[]
  editEngineId?: string
}

const STEP_LABELS = [
  'engineWizard.stepBasicInfo',
  'engineWizard.stepGeometry',
  'engineWizard.stepPerformance',
  'engineWizard.stepValvetrain',
  'engineWizard.stepFuelSystem',
  'engineWizard.stepExhaust',
  'engineWizard.stepCombustion',
]

export default function EngineWizardDialog({ open, onClose, requiredFields, editEngineId }: EngineWizardDialogProps) {
  const { t } = useTranslation()
  const { createEngine, updateEngine, engines } = useEngineContext()
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { control, handleSubmit, reset } = useForm<WizardForm>({
    resolver: zodResolver(createWizardSchema(requiredFields ?? [])),
    defaultValues: EMPTY_FORM,
  })

  const visibleSteps = requiredFields
    ? [0, ...Array.from(new Set(requiredFields.map((f) => FIELD_STEP[f]))).filter((s) => s > 0)].sort((a, b) => a - b)
    : [0, 1, 2, 3, 4, 5, 6]

  useEffect(() => {
    if (!open) return
    setActiveStep(0)
    if (editEngineId) {
      const engine = engines.find((e) => e.id === editEngineId)
      reset(engine ? profileToForm(engine) : EMPTY_FORM)
    } else {
      reset(EMPTY_FORM)
    }
  }, [open, editEngineId, engines, reset])

  const isRequired = (field: EngineProfileField) => requiredFields?.includes(field) ?? false

  const currentVisibleIndex = activeStep
  const currentStep = visibleSteps[currentVisibleIndex]
  const isLastStep = currentVisibleIndex === visibleSteps.length - 1

  function handleNext() {
    if (!isLastStep) setActiveStep((prev) => prev + 1)
  }

  function handleBack() {
    if (activeStep > 0) setActiveStep((prev) => prev - 1)
  }

  function onValidSave(data: WizardForm) {
    let name = data.name.trim()
    if (!name) {
      name = editEngineId
        ? (engines.find((e) => e.id === editEngineId)?.name ?? `New Engine ${engines.length + 1}`)
        : `New Engine ${engines.length + 1}`
    }
    const updates = formToProfileUpdates({ ...data, name })
    if (editEngineId) {
      updateEngine(editEngineId, updates)
    } else {
      const engine = createEngine(name)
      updateEngine(engine.id, updates)
    }
    onClose()
  }

  function handleSaveClick() {
    handleSubmit(onValidSave, (errors) => {
      // Navigate to the first step that has a validation error
      const firstErrorField = Object.keys(errors)[0] as EngineProfileField | undefined
      if (firstErrorField && firstErrorField in FIELD_STEP) {
        const stepIndex = FIELD_STEP[firstErrorField]
        const visibleIdx = visibleSteps.indexOf(stepIndex)
        if (visibleIdx !== -1) setActiveStep(visibleIdx)
      }
    })()
  }

  const stepProps = { control, isRequired }

  const stepComponents: Record<number, React.ReactNode> = {
    0: <StepBasicInfo {...stepProps} />,
    1: <StepGeometry {...stepProps} />,
    2: <StepPerformance {...stepProps} />,
    3: <StepValvetrain {...stepProps} />,
    4: <StepFuelSystem {...stepProps} />,
    5: <StepExhaust {...stepProps} />,
    6: <StepCombustion {...stepProps} />,
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle>
        {editEngineId ? t('engineWizard.titleEdit') : t('engineWizard.title')}
      </DialogTitle>
      <DialogContent dividers>
        {visibleSteps.length > 1 && (
          <Stepper activeStep={currentVisibleIndex} sx={{ mb: 3 }} alternativeLabel>
            {visibleSteps.map((stepIndex) => (
              <Step key={stepIndex}>
                <StepLabel>{t(STEP_LABELS[stepIndex])}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        {requiredFields && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            {t('engineWizard.requiredHint')}
          </Typography>
        )}
        {stepComponents[currentStep]}
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack}>{t('common.back')}</Button>
        )}
        <Box sx={{ flex: 1 }} />
        {!isLastStep ? (
          <Button variant="contained" onClick={handleNext}>
            {t('common.next')}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSaveClick}>
            {editEngineId ? t('engineWizard.save') : t('engineWizard.saveNew')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
