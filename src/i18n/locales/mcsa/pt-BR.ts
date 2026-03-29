const mcsaPtBR = {
  title: 'Calculadora de MCSA',
  subtitle:
    'Calcule a área mínima de seção transversal do duto de admissão para um RPM alvo de torque máximo. O MCSA define a área efetiva de escoamento que governa a velocidade e a inércia do ar — divida o resultado pelo coeficiente de descarga (Cd) do seu duto para obter a área física real necessária.',
  homeDescription:
    'Encontre a área mínima de seção transversal do duto de admissão para ajustar o RPM de torque máximo. Relaciona-se diretamente ao coeficiente de descarga (Cd) do duto: quanto menor o MCSA, mais preciso é o ajuste da inércia do ar para o RPM alvo.',
  fieldPistonDiameter: 'Diâmetro do Pistão (mm)',
  fieldStroke: 'Curso do Pistão (mm)',
  fieldRPM: 'RPM Desejado para Torque Máximo',
  calculate: 'Calcular',
  resultLabel: 'MCSA',
  resultUnit: 'mm²',
  tagCalculator: 'Calculadora',
  tagIntakePort: 'Duto de Admissão',
  chartXLabel: 'RPM',
  chartYLabel: 'MCSA (mm²)',
  chartDescription: 'Eixo X — RPM: rotação desejada para torque máximo.\nEixo Y — MCSA (mm²): área mínima de seção transversal do duto de admissão nessa rotação.',
  formulaTitle: 'Fórmula',
  formulaExpression: 'MCSA = √(D² × S × RPM × 0,000000279)',
  formulaVarMCSA: 'MCSA — área mínima de seção transversal do duto de admissão (mm²)',
  formulaVarD: 'D — diâmetro do pistão (mm)',
  formulaVarS: 'S — curso do pistão (mm)',
  formulaVarRPM: 'RPM — RPM desejado para torque máximo',
}
export default mcsaPtBR
