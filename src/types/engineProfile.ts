export type FuelType = 'gasoline' | 'ethanol'
export type ExhaustJointType = 'street' | 'drag'
export type InjectionMethod = 'sequential'
export type IgnitionMethod = 'sequential'

export interface ChartPoint {
  x: number
  y: number
}

export interface EngineResults {
  injectionMap?: { chartData: ChartPoint[] }
  ignitionAdvance?: { chartData: ChartPoint[] }
  mcsa?: { result: number }
  rlRatio?: { result: number }
  compressionRatio?: { result: number }
  exhaustPipeArea?: { result: { area: number; diameter: number } }
  exhaustPipeLength?: { result: number }
  exhaustJoint?: { result: { jointLength: number; jointDiameter: number } }
}

export interface EngineProfile {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  // Engine basics
  numCylinders?: number
  bore?: number           // mm (= pistonDiameter)
  stroke?: number         // mm
  conrodLength?: number   // mm (= rodLength)
  fuelType?: FuelType
  // Performance
  maxRPM?: number
  idleRPM?: number
  peakPower?: number
  rpmAtPeakPower?: number
  peakTorque?: number
  rpmAtPeakTorque?: number
  peakTorqueRPM?: number
  // Valvetrain
  valvesPerCylinder?: number
  intakeValveOpens?: number
  intakeValveCloses?: number
  exhaustValveOpens?: number
  exhaustValveCloses?: number
  injectionAngle?: number
  injectionMethod?: InjectionMethod
  ignitionMethod?: IgnitionMethod
  // Fuel system
  maxMAP?: number
  injectorSize?: number
  bsfc?: number
  // Exhaust
  exhaustPrimaryLength?: number
  exhaustPrimaryDiameter?: number
  exhaustJointType?: ExhaustJointType
  // Combustion chamber
  chamberVolume?: number
  pistonDishVolume?: number
  gasketBore?: number
  gasketThickness?: number
  deckClearance?: number
  // Results
  results?: EngineResults
  // Per-tool calculation params (persisted per engine)
  toolParams?: EngineToolParams
}

// Per-tool calculation params — per-engine, not global
export interface EngineToolParams {
  mcsa?: { rpm?: number }
  exhaustPipeArea?: { rpm?: number }
  exhaustPipeLength?: { rpm?: number }
  engineVisualization?: {
    activeStep?: number
    finished?: boolean
    injectionFileName?: string | null
    ignitionFileName?: string | null
    injectionData?: number[][] | null
    ignitionData?: number[][] | null
    controller?: { rpm: number; map: number }
  }
}

export type EngineProfileField = keyof Omit<EngineProfile, 'id' | 'name' | 'createdAt' | 'updatedAt' | 'results' | 'toolParams'>

// Maps each field to which wizard step it belongs to (0-6)
export const FIELD_STEP: Record<EngineProfileField, number> = {
  numCylinders: 0,
  fuelType: 0,
  bore: 1,
  stroke: 1,
  conrodLength: 1,
  maxRPM: 2,
  idleRPM: 2,
  peakPower: 2,
  rpmAtPeakPower: 2,
  peakTorque: 2,
  rpmAtPeakTorque: 2,
  peakTorqueRPM: 2,
  valvesPerCylinder: 3,
  intakeValveOpens: 3,
  intakeValveCloses: 3,
  exhaustValveOpens: 3,
  exhaustValveCloses: 3,
  injectionAngle: 3,
  injectionMethod: 3,
  ignitionMethod: 3,
  maxMAP: 4,
  injectorSize: 4,
  bsfc: 4,
  exhaustPrimaryLength: 5,
  exhaustPrimaryDiameter: 5,
  exhaustJointType: 5,
  chamberVolume: 6,
  pistonDishVolume: 6,
  gasketBore: 6,
  gasketThickness: 6,
  deckClearance: 6,
}
