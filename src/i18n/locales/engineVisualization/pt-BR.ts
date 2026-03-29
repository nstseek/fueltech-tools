const engineVisualizationPtBR = {
  title: 'Visualização do Motor',
  subtitle: 'Visualize os eventos do cilindro — injeção, válvulas e centelha por tempo.',
  homeDescription:
    'Visualize os pulsos de injeção, a sincronização das válvulas e os eventos de centelha por tempo do cilindro usando um diagrama D3 interativo.',
  comingSoon: 'Assistente e diagrama D3 em breve',
  tagD3Graph: 'Gráfico D3.js',
  tagPerStroke: 'Por Tempo',

  // Rótulos das etapas do assistente
  stepEngineConfig: 'Config. do Motor',
  stepMethods: 'Métodos',
  stepImportData: 'Importar Dados',

  // Etapa 1 — Config. do Motor
  fieldNumCylinders: 'Número de Cilindros',
  fieldIntakeValveOpens: 'Abertura da Válvula de Admissão (°)',
  fieldIntakeValveOpensHelper: 'Ângulo do virabrequim onde a válvula de admissão começa a abrir',
  fieldIntakeValveCloses: 'Fechamento da Válvula de Admissão (°)',
  fieldIntakeValveClosesHelper:
    'Ângulo do virabrequim onde a válvula de admissão fecha completamente',
  fieldExhaustValveOpens: 'Abertura da Válvula de Escape (°)',
  fieldExhaustValveOpensHelper: 'Ângulo do virabrequim onde a válvula de escape começa a abrir',
  fieldExhaustValveCloses: 'Fechamento da Válvula de Escape (°)',
  fieldExhaustValveClosesHelper:
    'Ângulo do virabrequim onde a válvula de escape fecha completamente',
  fieldInjectionAngle: 'Ângulo de Injeção (°)',
  fieldInjectionAngleHelper: 'Ângulo do virabrequim onde a injeção começa',
  fieldStroke: 'Curso do Pistão (mm)',
  fieldStrokeHelper: 'Deslocamento total do pistão do PMF ao PMI',
  fieldConrodLength: 'Comprimento da Biela (mm)',
  fieldConrodLengthHelper: 'Distância entre os centros do pino do virabrequim e do pino do pistão',

  // Etapa 2 — Métodos
  fieldInjectionMethod: 'Método de Injeção',
  injectionMethodSequential: 'Sequencial',
  injectionMethodSemiSequential: 'Semi-Sequencial',
  injectionMethodMultipoint: 'Multiponto',
  fieldIgnitionMethod: 'Método de Ignição',
  ignitionMethodSequential: 'Sequencial',
  ignitionMethodWastedSpark: 'Faísca Perdida',
  comingSoonNote: 'Em breve',
  fieldMaxRPM: 'RPM Máximo',
  fieldMaxMAP: 'MAP Máximo (bar)',

  // Etapa 3 — Importar Dados
  importInjectionMap: 'Importar CSV do Mapa de Injeção',
  importInjectionMapHelper:
    'Formato CSV: a primeira linha é um cabeçalho onde a primeira célula está vazia e as demais células são valores de RPM; cada linha subsequente tem o valor de MAP (bar) como primeira célula e o tempo de injeção (ms) nas demais células.',
  importIgnitionAdvance: 'Importar CSV do Avanço de Ignição',
  importIgnitionAdvanceHelper:
    'Formato CSV: a primeira linha é um cabeçalho onde a primeira célula está vazia e as demais células são valores de RPM; cada linha subsequente tem o valor de MAP (bar) como primeira célula e o avanço de ignição (graus) nas demais células.',
  importFileSelected: 'Arquivo selecionado: {{name}}',
  importNoFile: 'Nenhum arquivo selecionado',

  // Rótulos da legenda do gráfico
  legendPiston: 'Pistão',
  legendIntakeValve: 'Válvula de Admissão',
  legendExhaustValve: 'Válvula de Escape',
  legendSpark: 'Centelha',
  legendInjStart: 'Início Inj.',
  legendInjEnd: 'Fim Inj.',
  legendPistonVelocity: 'Velocidade do Pistão',

  // Rótulos dos tempos
  strokeTDC: 'PMF',
  strokePower: 'Potência',
  strokeBDC: 'PMI',
  strokeExhaust: 'Escape',

  // Rótulos do controlador
  controllerRPM: 'RPM do Motor',
  controllerMAP: 'MAP de Admissão (bar)',

  // Erros
  errorRequired: 'Este campo é obrigatório',
} as const

export default engineVisualizationPtBR
