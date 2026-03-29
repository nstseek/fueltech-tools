const mcsaEs = {
  title: 'Calculadora MCSA',
  subtitle:
    'Calcula el área mínima de sección transversal del puerto de admisión para un RPM objetivo de torque máximo. El MCSA define el área de flujo efectiva que gobierna la velocidad e inercia del aire — divide el resultado por el coeficiente de descarga (Cd) de tu puerto para obtener el área física real requerida.',
  homeDescription:
    'Encuentra el área mínima de sección transversal del puerto de admisión para ajustar el RPM de torque máximo. Se relaciona directamente con el coeficiente de descarga (Cd) del puerto: cuanto menor sea el MCSA, más preciso es el ajuste de la inercia del aire al RPM objetivo.',
  fieldPistonDiameter: 'Diámetro del Pistón (mm)',
  fieldStroke: 'Carrera del Pistón (mm)',
  fieldRPM: 'RPM Deseado de Torque Máximo',
  calculate: 'Calcular',
  resultLabel: 'MCSA',
  resultUnit: 'mm²',
  tagCalculator: 'Calculadora',
  tagIntakePort: 'Puerto de Admisión',
  chartXLabel: 'RPM',
  chartYLabel: 'MCSA (mm²)',
  chartDescription: 'Eje X — RPM: velocidad del motor deseada para torque máximo.\nEje Y — MCSA (mm²): área mínima de sección transversal del puerto de admisión a esa RPM.',
  formulaTitle: 'Fórmula',
  formulaExpression: 'MCSA = √(D² × S × RPM × 0,000000279)',
  formulaVarMCSA: 'MCSA — área mínima de sección transversal del puerto de admisión (mm²)',
  formulaVarD: 'D — diámetro del pistón (mm)',
  formulaVarS: 'S — carrera del pistón (mm)',
  formulaVarRPM: 'RPM — RPM deseado de torque máximo',
}
export default mcsaEs
