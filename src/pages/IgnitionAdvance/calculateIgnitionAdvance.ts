export interface IgnitionAdvanceParams {
  valvesPerCylinder: number
  maxRPM: number
  fuelType: 'gasoline' | 'ethanol'
  idleRPM: number
  peakTorqueRPM: number
  boreDiameter: number // mm, default 86
}

// Returns one ignition advance value (degrees) for each RPM column.
// Columns go from 200 to maxRPM, in 200 RPM increments.
// For now, return 0 for every column — the user will implement real logic later.
export function calculateIgnitionAdvance(params: IgnitionAdvanceParams): number[] {
  const columns = generateRpmColumns(params.maxRPM)
  return columns.map(() => 0)
}

// Helper: generate RPM axis values from 200 to maxRPM in 200 steps
export function generateRpmColumns(maxRPM: number): number[] {
  const cols: number[] = []
  for (let rpm = 200; rpm <= maxRPM; rpm += 200) {
    cols.push(rpm)
  }
  return cols
}
