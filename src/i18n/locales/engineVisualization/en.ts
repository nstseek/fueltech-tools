const engineVisualizationEn = {
  title: 'Engine Visualization',
  subtitle: 'Visualize cylinder events — injection, valve timing, and spark per stroke.',
  homeDescription:
    'Visualize injection pulses, valve timing, and spark events per cylinder stroke using an interactive D3 diagram.',
  comingSoon: 'Wizard and D3 diagram coming soon',
  tagD3Graph: 'D3.js Graph',
  tagPerStroke: 'Per-Stroke',

  // Wizard step labels
  stepEngineConfig: 'Engine Config',
  stepMethods: 'Methods',
  stepImportData: 'Import Data',

  // Step 1 — Engine Config
  fieldNumCylinders: 'Number of Cylinders',
  fieldIntakeValveOpens: 'Intake Valve Opens (°)',
  fieldIntakeValveOpensHelper: 'Crankshaft angle where the intake valve starts opening',
  fieldIntakeValveCloses: 'Intake Valve Closes (°)',
  fieldIntakeValveClosesHelper: 'Crankshaft angle where the intake valve fully closes',
  fieldExhaustValveOpens: 'Exhaust Valve Opens (°)',
  fieldExhaustValveOpensHelper: 'Crankshaft angle where the exhaust valve starts opening',
  fieldExhaustValveCloses: 'Exhaust Valve Closes (°)',
  fieldExhaustValveClosesHelper: 'Crankshaft angle where the exhaust valve fully closes',
  fieldInjectionAngle: 'Injection Angle (°)',
  fieldInjectionAngleHelper: 'Crankshaft angle where injection starts',

  // Step 2 — Methods
  fieldInjectionMethod: 'Injection Method',
  injectionMethodSequential: 'Sequential',
  injectionMethodSemiSequential: 'Semi-Sequential',
  injectionMethodMultipoint: 'Multipoint',
  fieldIgnitionMethod: 'Ignition Method',
  ignitionMethodSequential: 'Sequential',
  ignitionMethodWastedSpark: 'Wasted Spark',
  comingSoonNote: 'Coming soon',
  fieldMaxRPM: 'Max RPM',
  fieldMaxMAP: 'Max MAP (bar)',

  // Step 3 — Import Data
  importInjectionMap: 'Import Injection Map CSV',
  importInjectionMapHelper:
    'CSV format: first row is a header where the first cell is empty and remaining cells are RPM values; each subsequent row has the MAP value (bar) as the first cell and injection time (ms) as remaining cells.',
  importIgnitionAdvance: 'Import Ignition Advance CSV',
  importIgnitionAdvanceHelper:
    'CSV format: first row is a header where the first cell is empty and remaining cells are RPM values; each subsequent row has the MAP value (bar) as the first cell and ignition advance (degrees) as remaining cells.',
  importFileSelected: 'File selected: {{name}}',
  importNoFile: 'No file selected',

  // Graph legend labels
  legendPiston: 'Piston',
  legendIntakeValve: 'Intake Valve',
  legendExhaustValve: 'Exhaust Valve',
  legendSpark: 'Spark',
  legendInjStart: 'Inj. Start',
  legendInjEnd: 'Inj. End',

  // Stroke labels
  strokeTDC: 'TDC',
  strokePower: 'Power',
  strokeBDC: 'BDC',
  strokeExhaust: 'Exhaust',

  // Controller labels
  controllerRPM: 'Engine RPM',
  controllerMAP: 'Intake MAP (bar)',

  // Errors
  errorRequired: 'This field is required',
} as const

export default engineVisualizationEn
