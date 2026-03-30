import { z } from 'zod'
import type { EngineProfile, EngineProfileField } from '../types/engineProfile'

const positiveNumber = z.number().positive()
const nonNegativeNumber = z.number().min(0)

export const engineProfileSchema = z.object({
  numCylinders: z.number().int().positive().optional(),
  fuelType: z.enum(['gasoline', 'ethanol']).optional(),
  bore: positiveNumber.optional(),
  stroke: positiveNumber.optional(),
  conrodLength: positiveNumber.optional(),
  maxRPM: positiveNumber.optional(),
  idleRPM: nonNegativeNumber.optional(),
  peakPower: positiveNumber.optional(),
  rpmAtPeakPower: positiveNumber.optional(),
  peakTorque: positiveNumber.optional(),
  rpmAtPeakTorque: positiveNumber.optional(),
  peakTorqueRPM: positiveNumber.optional(),
  valvesPerCylinder: z.number().int().positive().optional(),
  intakeValveOpens: z.number().optional(),
  intakeValveCloses: z.number().optional(),
  exhaustValveOpens: z.number().optional(),
  exhaustValveCloses: z.number().optional(),
  injectionAngle: nonNegativeNumber.optional(),
  injectionMethod: z.literal('sequential').optional(),
  ignitionMethod: z.literal('sequential').optional(),
  maxMAP: positiveNumber.optional(),
  injectorSize: positiveNumber.optional(),
  bsfc: positiveNumber.optional(),
  exhaustPrimaryLength: positiveNumber.optional(),
  exhaustPrimaryDiameter: positiveNumber.optional(),
  exhaustJointType: z.enum(['street', 'drag']).optional(),
  chamberVolume: positiveNumber.optional(),
  pistonDishVolume: nonNegativeNumber.optional(),
  gasketBore: positiveNumber.optional(),
  gasketThickness: positiveNumber.optional(),
  deckClearance: nonNegativeNumber.optional(),
}).passthrough()

export function createToolSchema(requiredFields: EngineProfileField[]) {
  return engineProfileSchema.superRefine((data, ctx) => {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'required', path: [field] })
      }
    }
  })
}

export function hasRequiredFields(engine: EngineProfile | null, requiredFields: EngineProfileField[]): boolean {
  if (!engine) return false
  return createToolSchema(requiredFields).safeParse(engine).success
}
