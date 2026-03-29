const exhaustPipeAreaEs = {
  title: 'Calculadora de Diámetro del Escape',
  subtitle:
    'Calcula el diámetro ideal del tubo primario de escape para un RPM objetivo de torque máximo. Basado en el volumen del cilindro en pulgadas cúbicas y el RPM deseado en el torque máximo. El área de sección transversal también se proporciona como referencia.',
  homeDescription:
    'Encuentra el diámetro ideal del tubo primario de escape para tu RPM objetivo de torque máximo. Ingresa el volumen del cilindro y el RPM para dimensionar correctamente tu sistema de escape.',
  fieldRPM: 'RPM en Torque Máximo',
  fieldCylinderVolume: 'Volumen del Cilindro (pulg³)',
  calculate: 'Calcular',
  resultArea: 'Área del Tubo',
  resultAreaUnit: 'pulg²',
  resultDiameter: 'Diámetro del Tubo',
  resultDiameterUnit: 'pulg',
  tagCalculator: 'Calculadora',
  tagExhaust: 'Escape',
  chartXLabel: 'RPM',
  chartYLabel: 'Diámetro (pulg)',
  chartDescription: 'Eje X — RPM: velocidad del motor en torque máximo.\nEje Y — Diámetro (pulg): diámetro ideal del tubo primario de escape a esa RPM.',
  formulaTitle: 'Fórmula',
  formulaArea: 'Área = (RPM × Vol) / 88200',
  formulaDiameter: 'D = 2 × √(Área / π)',
  formulaVarArea: 'Área — área de sección transversal del tubo (pulg²)',
  formulaVarD: 'D — diámetro del tubo (pulg)',
  formulaVarVol: 'Vol — volumen del cilindro (pulg³)',
  formulaVarRPM: 'RPM — RPM en torque máximo',
}
export default exhaustPipeAreaEs
