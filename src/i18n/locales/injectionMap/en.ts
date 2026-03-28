const injectionMapEn = {
  title: 'Injection Map',
  subtitle: 'Configure injection time by manifold absolute pressure (MAP).',
  homeDescription:
    'Build injection time maps from manifold pressure inputs. Configure axes via guided wizard, then edit the generated 2D lookup table.',
  comingSoon: 'Wizard and DataGrid table coming soon',
  tagMapAxis: 'MAP Axis',
  // Wizard step labels
  step1Label: 'Engine Info',
  step2Label: 'Fuel & MAP',
  // Step 1 field labels
  numCylinders: 'Number of Cylinders',
  maxRPM: 'Max RPM',
  peakPower: 'Peak Power (HP)',
  rpmAtPeakPower: 'RPM at Peak Power',
  peakTorque: 'Peak Torque (Nm)',
  rpmAtPeakTorque: 'RPM at Peak Torque',
  // Step 2 field labels
  fuelType: 'Fuel Type',
  fuelTypeGasoline: 'Gasoline',
  fuelTypeEthanol: 'Ethanol',
  maxMAP: 'Max MAP (bar)',
  maxMAPHelper: 'Maximum manifold absolute pressure, e.g. 2.0 bar',
  injectorSize: 'Injector Size (lb/hr)',
  bsfc: 'BSFC (lb/HP·hr)',
  bsfcHelper:
    'Optional — defaults to {{gasolineDefault}} lb/HP·hr for gasoline, {{ethanolDefault}} lb/HP·hr for ethanol',
  // DataGrid
  dataGridRowLabel: 'Inj. Time (ms)',
  // Chart
  chartXLabel: 'MAP (bar)',
  chartYLabel: 'Injection Time (ms)',
} as const

export default injectionMapEn
