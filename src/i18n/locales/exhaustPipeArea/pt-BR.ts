const exhaustPipeAreaPtBR = {
  title: 'Calculadora de Diâmetro do Escapamento',
  subtitle:
    'Calcule o diâmetro ideal do tubo primário de escapamento para o RPM alvo de torque máximo. Baseado no volume do cilindro em polegadas cúbicas e no RPM desejado no torque máximo. A área da seção transversal também é fornecida como referência.',
  homeDescription:
    'Encontre o diâmetro ideal do tubo primário de escapamento para o RPM alvo de torque máximo. Insira o volume do cilindro e o RPM para dimensionar corretamente o sistema de escapamento.',
  fieldRPM: 'RPM no Torque Máximo',
  fieldCylinderVolume: 'Volume do Cilindro (pol³)',
  calculate: 'Calcular',
  resultArea: 'Área do Tubo',
  resultAreaUnit: 'pol²',
  resultDiameter: 'Diâmetro do Tubo',
  resultDiameterUnit: 'pol',
  tagCalculator: 'Calculadora',
  tagExhaust: 'Escapamento',
  chartXLabel: 'RPM',
  chartYLabel: 'Diâmetro (pol)',
  chartDescription: 'Eixo X — RPM: rotação do motor no torque máximo.\nEixo Y — Diâmetro (pol): diâmetro ideal do tubo primário de escapamento nessa rotação.',
  formulaTitle: 'Fórmula',
  formulaArea: 'Área = (RPM × Vol) / 88200',
  formulaDiameter: 'D = 2 × √(Área / π)',
  formulaVarArea: 'Área — área da seção transversal do tubo (pol²)',
  formulaVarD: 'D — diâmetro do tubo (pol)',
  formulaVarVol: 'Vol — volume do cilindro (pol³)',
  formulaVarRPM: 'RPM — RPM no torque máximo',
}
export default exhaustPipeAreaPtBR
