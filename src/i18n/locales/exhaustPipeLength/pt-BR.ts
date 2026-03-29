const exhaustPipeLengthPtBR = {
  title: 'Calculadora de Comprimento do Escapamento',
  subtitle:
    'Calcule o comprimento ideal do tubo primário de escapamento com base no RPM de torque máximo e no ângulo de abertura da válvula de escape (EVO). Use para ajustar a extração do escapamento para a faixa de potência desejada.',
  homeDescription:
    'Encontre o comprimento ideal do tubo primário de escapamento para o RPM alvo de torque máximo. Insira o RPM no torque máximo e o ângulo de abertura da válvula de escape para dimensionar corretamente o escapamento.',
  fieldRPM: 'RPM no Torque Máximo',
  fieldEVO: 'EVO — Abertura da Válvula de Escape antes do PMI (graus)',
  calculate: 'Calcular',
  resultLabel: 'Comprimento do Tubo',
  resultUnit: 'pol',
  tagCalculator: 'Calculadora',
  tagExhaust: 'Escapamento',
  chartXLabel: 'RPM',
  chartYLabel: 'Comprimento (pol)',
  chartDescription: 'Eixo X — RPM: rotação do motor no torque máximo.\nEixo Y — Comprimento (pol): comprimento ideal do tubo primário de escapamento nessa rotação.',
  formulaTitle: 'Fórmula',
  formulaExpression: 'L = (850 × (180 + EVO)) / RPM − 3',
  formulaVarL: 'L — comprimento do tubo primário (pol)',
  formulaVarEVO: 'EVO — abertura da válvula de escape antes do PMI (graus)',
  formulaVarRPM: 'RPM — RPM no torque máximo',
}
export default exhaustPipeLengthPtBR
