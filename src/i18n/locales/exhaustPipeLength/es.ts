const exhaustPipeLengthEs = {
  title: 'Calculadora de Longitud del Escape',
  subtitle:
    'Calcula la longitud ideal del tubo primario de escape en función del RPM de torque máximo y el ángulo de apertura de la válvula de escape (EVO). Úsalo para ajustar el barrido del escape hacia la banda de potencia deseada.',
  homeDescription:
    'Encuentra la longitud ideal del tubo primario de escape para tu RPM objetivo de torque máximo. Ingresa el RPM en el torque máximo y el ángulo de apertura de la válvula de escape para dimensionar correctamente el escape.',
  fieldRPM: 'RPM en Torque Máximo',
  fieldEVO: 'EVO — Apertura de Válvula de Escape antes del PMI (grados)',
  calculate: 'Calcular',
  resultLabel: 'Longitud del Tubo',
  resultUnit: 'pulg',
  tagCalculator: 'Calculadora',
  tagExhaust: 'Escape',
  chartXLabel: 'RPM',
  chartYLabel: 'Longitud (pulg)',
  chartDescription: 'Eje X — RPM: velocidad del motor en torque máximo.\nEje Y — Longitud (pulg): longitud ideal del tubo primario de escape a esa RPM.',
  formulaTitle: 'Fórmula',
  formulaExpression: 'L = (850 × (180 + EVO)) / RPM − 3',
  formulaVarL: 'L — longitud del tubo primario (pulg)',
  formulaVarEVO: 'EVO — apertura de válvula de escape antes del PMI (grados)',
  formulaVarRPM: 'RPM — RPM en torque máximo',
}
export default exhaustPipeLengthEs
