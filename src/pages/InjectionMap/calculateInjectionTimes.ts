export interface InjectionMapParams {
  numCylinders: number;
  maxRPM: number;
  peakPower: number; // HP
  rpmAtPeakPower: number;
  peakTorque: number; // Nm
  rpmAtPeakTorque: number;
  fuelType: "gasoline" | "ethanol";
  injectorSize: number; // lb/hr
  maxMAP: number; // bar
  bsfc: number; // lb/HP·hr — resolved (default applied before calling)
}

// Helper: generate MAP axis values from -1.0 to maxMAP in 0.1 steps
export function generateMapColumns(maxMAP: number): number[] {
  const cols: number[] = [];
  for (
    let v = -1.0;
    v <= maxMAP + 0.00001;
    v = Math.round((v + 0.1) * 10) / 10
  ) {
    cols.push(v);
  }
  return cols;
}

// Returns one injection time value (ms) for each MAP column.
// Columns go from -1.0 to maxMAP inclusive, in 0.1 increments.
// For now, return 0 for every column — the user will implement real logic later.
export function calculateInjectionTimes(params: InjectionMapParams): number[] {
  const columns = generateMapColumns(params.maxMAP);
  return columns.map((column) => {
    console.log(column);
    return 0;
  });
}
