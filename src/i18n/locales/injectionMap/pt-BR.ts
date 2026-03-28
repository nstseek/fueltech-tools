const injectionMapPtBR = {
  title: 'Mapa de Injeção',
  subtitle: 'Configure o tempo de injeção pela pressão absoluta do coletor (MAP).',
  homeDescription:
    'Construa mapas de tempo de injeção a partir das entradas de pressão do coletor. Configure os eixos via assistente guiado e edite a tabela 2D gerada.',
  comingSoon: 'Assistente e tabela DataGrid em breve',
  tagMapAxis: 'Eixo MAP',
  // Rótulos das etapas do assistente
  step1Label: 'Dados do Motor',
  step2Label: 'Combustível & MAP',
  // Rótulos dos campos da etapa 1
  numCylinders: 'Número de Cilindros',
  maxRPM: 'RPM Máximo',
  peakPower: 'Potência Máxima (CV)',
  rpmAtPeakPower: 'RPM na Potência Máxima',
  peakTorque: 'Torque Máximo (Nm)',
  rpmAtPeakTorque: 'RPM no Torque Máximo',
  // Rótulos dos campos da etapa 2
  fuelType: 'Tipo de Combustível',
  fuelTypeGasoline: 'Gasolina',
  fuelTypeEthanol: 'Etanol',
  maxMAP: 'MAP Máximo (bar)',
  maxMAPHelper: 'Pressão absoluta máxima do coletor, ex.: 2,0 bar',
  injectorSize: 'Tamanho do Injetor (lb/hr)',
  bsfc: 'BSFC (lb/HP·hr)',
  bsfcHelper:
    'Opcional — padrão {{gasolineDefault}} lb/HP·hr para gasolina, {{ethanolDefault}} lb/HP·hr para etanol',
  // DataGrid
  dataGridRowLabel: 'T. Injeção (ms)',
  // Gráfico
  chartXLabel: 'MAP (bar)',
  chartYLabel: 'Tempo de Injeção (ms)',
} as const

export default injectionMapPtBR
