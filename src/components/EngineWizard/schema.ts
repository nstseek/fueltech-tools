import { z } from 'zod'
import type { EngineProfileField } from '../../types/engineProfile'

export const wizardFormSchema = z.object({
  name: z.string(),
  numCylinders: z.string(),
  fuelType: z.enum(['gasoline', 'ethanol', '']),
  bore: z.string(),
  stroke: z.string(),
  conrodLength: z.string(),
  maxRPM: z.string(),
  idleRPM: z.string(),
  peakPower: z.string(),
  rpmAtPeakPower: z.string(),
  peakTorque: z.string(),
  rpmAtPeakTorque: z.string(),
  peakTorqueRPM: z.string(),
  valvesPerCylinder: z.string(),
  intakeValveOpens: z.string(),
  intakeValveCloses: z.string(),
  exhaustValveOpens: z.string(),
  exhaustValveCloses: z.string(),
  injectionAngle: z.string(),
  injectionMethod: z.literal('sequential'),
  ignitionMethod: z.literal('sequential'),
  maxMAP: z.string(),
  injectorSize: z.string(),
  bsfc: z.string(),
  exhaustPrimaryLength: z.string(),
  exhaustPrimaryDiameter: z.string(),
  exhaustJointType: z.enum(['street', 'drag']),
  chamberVolume: z.string(),
  pistonDishVolume: z.string(),
  gasketBore: z.string(),
  gasketThickness: z.string(),
  deckClearance: z.string(),
})

// Fields that are represented as numeric strings in the form
const NUMERIC_FIELDS = new Set<EngineProfileField>([
  'numCylinders', 'bore', 'stroke', 'conrodLength', 'maxRPM', 'idleRPM',
  'peakPower', 'rpmAtPeakPower', 'peakTorque', 'rpmAtPeakTorque', 'peakTorqueRPM',
  'valvesPerCylinder', 'intakeValveOpens', 'intakeValveCloses', 'exhaustValveOpens',
  'exhaustValveCloses', 'injectionAngle', 'maxMAP', 'injectorSize', 'bsfc',
  'exhaustPrimaryLength', 'exhaustPrimaryDiameter', 'chamberVolume', 'pistonDishVolume',
  'gasketBore', 'gasketThickness', 'deckClearance',
])

export function createWizardSchema(requiredFields: EngineProfileField[]) {
  return wizardFormSchema.superRefine((data, ctx) => {
    for (const field of requiredFields) {
      const value = data[field as keyof typeof data]
      const isEmpty = NUMERIC_FIELDS.has(field) ? value === '' : value === '' || value === undefined
      if (isEmpty) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'required', path: [field] })
      }
    }
  })
}
