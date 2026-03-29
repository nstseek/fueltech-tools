import injectionMap from './injectionMap/pt-BR'
import ignitionAdvance from './ignitionAdvance/pt-BR'
import engineVisualization from './engineVisualization/pt-BR'
import mcsa from './mcsa/pt-BR'
import volumetricEfficiency from './volumetricEfficiency/pt-BR'
import lambdaCorrection from './lambdaCorrection/pt-BR'
import ignitionAdvanceComparison from './ignitionAdvanceComparison/pt-BR'
import aiAssistant from './aiAssistant/pt-BR'
import exhaustPipeArea from './exhaustPipeArea/pt-BR'
import exhaustPipeLength from './exhaustPipeLength/pt-BR'
import exhaustJoint from './exhaustJoint/pt-BR'

const ptBR = {
  common: {
    appName: 'FuelTech Tools',
    openTool: 'Abrir Ferramenta',
    settings: 'Configurações',
    wizardForm: 'Assistente',
    dataGrid: 'DataGrid',
    back: 'Voltar',
    next: 'Próximo',
    finish: 'Concluir',
    reset: 'Redefinir',
    refresh: 'Atualizar',
    optional: 'Opcional',
  },
  nav: {
    home: 'Início',
    injectionMap: 'Mapa de Injeção',
    ignitionAdvance: 'Avanço de Ignição',
    engineVisualization: 'Visualização do Motor',
    mcsa: 'Calculadora MCSA',
    exhaustPipeArea: 'Diâmetro do Escapamento',
    exhaustPipeLength: 'Comprimento do Escapamento',
    exhaustJoint: 'Junta de Escapamento',
    volumetricEfficiency: 'Correção EV',
    lambdaCorrection: 'Correção Lambda',
    ignitionAdvanceComparison: 'Comparação de Avanço',
    aiAssistant: 'Assistente IA',
  },
  home: {
    subtitle: 'Selecione uma ferramenta abaixo para começar a configurar seu EFI.',
  },
  injectionMap,
  ignitionAdvance,
  engineVisualization,
  mcsa,
  volumetricEfficiency,
  lambdaCorrection,
  ignitionAdvanceComparison,
  aiAssistant,
  exhaustPipeArea,
  exhaustPipeLength,
  exhaustJoint,
}

export default ptBR
