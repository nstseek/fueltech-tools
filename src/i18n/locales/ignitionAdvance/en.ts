const ignitionAdvanceEn = {
  title: 'Ignition Advance',
  subtitle: 'Configure ignition advance timing by RPM.',
  homeDescription:
    'Define ignition advance curves by RPM range. Step through the wizard to set axis breakpoints, then refine the advance table.',
  comingSoon: 'Wizard and DataGrid table coming soon',
  tagRpmAxis: 'RPM Axis',
  stepEngineInfo: 'Engine Info',
  stepFuelGeometry: 'Fuel & Geometry',
  fieldValvesPerCylinder: 'Valves per Cylinder',
  fieldMaxRPM: 'Max RPM',
  fieldIdleRPM: 'Idle RPM',
  fieldPeakTorqueRPM: 'RPM at Peak Torque',
  fieldFuelType: 'Fuel Type',
  fuelGasoline: 'Gasoline',
  fuelEthanol: 'Ethanol',
  fieldBoreDiameter: 'Cylinder Bore Diameter (mm)',
  helperBoreDiameter: 'Optional — defaults to 86 mm',
  errorRequired: 'This field is required',
  gridRowLabel: 'Advance (°)',
  // Chart
  chartXLabel: 'RPM',
  chartYLabel: 'Advance (°)',
} as const

export default ignitionAdvanceEn
