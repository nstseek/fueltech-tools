const exhaustJointPtBR = {
  title: 'Calculadora de Junta de Escapamento',
  subtitle:
    'Calcule o diâmetro e o comprimento ideais do tubo de junta de escapamento onde os tubos primários se unem. Escolha entre configuração de rua e arrancada para dimensionar a junta corretamente.',
  homeDescription:
    'Encontre o diâmetro e comprimento ideais da junta de escapamento para juntas de união em cabeçotes aspirados. Selecione rua ou arrancada e insira as dimensões do tubo primário.',
  fieldPrimaryLength: 'Comprimento do Tubo Primário (pol)',
  fieldPrimaryDiameter: 'Diâmetro do Tubo Primário (pol)',
  fieldType: 'Tipo de Configuração',
  typeStreet: 'Rua',
  typeDrag: 'Arrancada',
  calculate: 'Calcular',
  resultJointLength: 'Comprimento da Junta',
  resultJointDiameter: 'Diâmetro da Junta',
  resultUnit: 'pol',
  tagCalculator: 'Calculadora',
  tagExhaust: 'Escapamento',
  chartDiameterXLabel: 'Diâmetro Primário (pol)',
  chartDiameterYLabel: 'Diâmetro da Junta (pol)',
  chartDiameterDescription:
    'Eixo X — Diâmetro Primário (pol): diâmetro do tubo primário de escapamento.\nEixo Y — Diâmetro da Junta (pol): diâmetro resultante da junta para o tipo de configuração selecionado.',
  chartLengthXLabel: 'Comprimento Primário (pol)',
  chartLengthYLabel: 'Comprimento da Junta (pol)',
  chartLengthDescription:
    'Eixo X — Comprimento Primário (pol): comprimento do tubo primário de escapamento.\nEixo Y — Comprimento da Junta (pol): comprimento resultante da junta (sempre 0,5 × comprimento primário).',
  formulaTitle: 'Fórmula',
  formulaJointLength: 'Comprimento da Junta = 0,5 × Comprimento Primário',
  formulaDiameterStreet: 'Diâmetro da Junta (Rua) = 1,6 × Diâmetro Primário',
  formulaDiameterDrag: 'Diâmetro da Junta (Arrancada) = 1,9 × Diâmetro Primário',
  formulaVarJointLength: 'Comprimento da Junta — comprimento do tubo de junta de união (pol)',
  formulaVarJointDiameter: 'Diâmetro da Junta — diâmetro do tubo de junta de união (pol)',
  formulaVarPrimaryLength: 'Comprimento Primário — comprimento do tubo primário de escapamento (pol)',
  formulaVarPrimaryDiameter: 'Diâmetro Primário — diâmetro do tubo primário de escapamento (pol)',
}
export default exhaustJointPtBR
