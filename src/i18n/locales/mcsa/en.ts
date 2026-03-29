const mcsaEn = {
  title: 'MCSA Calculator',
  subtitle:
    'Calculate the minimum intake port cross-section area for a target peak torque RPM. MCSA defines the effective flow area that governs airflow velocity and inertia tuning — divide the result by your port\'s discharge coefficient (Cd) to get the actual physical area required.',
  homeDescription:
    'Find the minimum intake port cross-section area to tune peak torque RPM. Relates directly to the port\'s discharge coefficient (Cd): the narrower the MCSA, the more precisely airflow inertia is tuned to a target RPM.',
  fieldPistonDiameter: 'Piston Diameter (mm)',
  fieldStroke: 'Piston Stroke (mm)',
  fieldRPM: 'Desired Peak Torque RPM',
  calculate: 'Calculate',
  resultLabel: 'MCSA',
  resultUnit: 'mm²',
  tagCalculator: 'Calculator',
  tagIntakePort: 'Intake Port',
  chartXLabel: 'RPM',
  chartYLabel: 'MCSA (mm²)',
  chartDescription: 'X axis — RPM: desired peak torque engine speed.\nY axis — MCSA (mm²): minimum intake port cross-section area at that RPM.',
  formulaTitle: 'Formula',
  formulaExpression: 'MCSA = √(D² × S × RPM × 0.000000279)',
  formulaVarMCSA: 'MCSA — minimum intake port cross-section area (mm²)',
  formulaVarD: 'D — piston bore diameter (mm)',
  formulaVarS: 'S — piston stroke (mm)',
  formulaVarRPM: 'RPM — desired peak torque RPM',
}
export default mcsaEn
