import type { Control } from 'react-hook-form'
import type { EngineProfileField, ExhaustJointType, FuelType } from '../../types/engineProfile'

export interface WizardForm {
  name: string
  numCylinders: string
  fuelType: FuelType | ''
  bore: string
  stroke: string
  conrodLength: string
  maxRPM: string
  idleRPM: string
  peakPower: string
  rpmAtPeakPower: string
  peakTorque: string
  rpmAtPeakTorque: string
  peakTorqueRPM: string
  valvesPerCylinder: string
  intakeValveOpens: string
  intakeValveCloses: string
  exhaustValveOpens: string
  exhaustValveCloses: string
  injectionAngle: string
  injectionMethod: 'sequential'
  ignitionMethod: 'sequential'
  maxMAP: string
  injectorSize: string
  bsfc: string
  exhaustPrimaryLength: string
  exhaustPrimaryDiameter: string
  exhaustJointType: ExhaustJointType
  chamberVolume: string
  pistonDishVolume: string
  gasketBore: string
  gasketThickness: string
  deckClearance: string
}

export interface StepProps {
  control: Control<WizardForm>
  isRequired: (field: EngineProfileField) => boolean
}

export const EMPTY_FORM: WizardForm = {
  name: '',
  numCylinders: '',
  fuelType: '',
  bore: '',
  stroke: '',
  conrodLength: '',
  maxRPM: '',
  idleRPM: '',
  peakPower: '',
  rpmAtPeakPower: '',
  peakTorque: '',
  rpmAtPeakTorque: '',
  peakTorqueRPM: '',
  valvesPerCylinder: '',
  intakeValveOpens: '',
  intakeValveCloses: '',
  exhaustValveOpens: '',
  exhaustValveCloses: '',
  injectionAngle: '',
  injectionMethod: 'sequential',
  ignitionMethod: 'sequential',
  maxMAP: '',
  injectorSize: '',
  bsfc: '',
  exhaustPrimaryLength: '',
  exhaustPrimaryDiameter: '',
  exhaustJointType: 'street',
  chamberVolume: '',
  pistonDishVolume: '',
  gasketBore: '',
  gasketThickness: '',
  deckClearance: '',
}
