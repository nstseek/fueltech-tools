import injectionMap from './injectionMap/es'
import ignitionAdvance from './ignitionAdvance/es'
import engineVisualization from './engineVisualization/es'
import mcsa from './mcsa/es'
import volumetricEfficiency from './volumetricEfficiency/es'
import lambdaCorrection from './lambdaCorrection/es'
import ignitionAdvanceComparison from './ignitionAdvanceComparison/es'
import aiAssistant from './aiAssistant/es'

const es = {
  common: {
    appName: 'FuelTech Tools',
    openTool: 'Abrir Herramienta',
    settings: 'Configuración',
    wizardForm: 'Asistente',
    dataGrid: 'DataGrid',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Finalizar',
    reset: 'Restablecer',
    refresh: 'Actualizar',
    optional: 'Opcional',
  },
  nav: {
    home: 'Inicio',
    injectionMap: 'Mapa de Inyección',
    ignitionAdvance: 'Avance de Encendido',
    engineVisualization: 'Visualización del Motor',
    mcsa: 'Calculadora MCSA',
    volumetricEfficiency: 'Corrección EV',
    lambdaCorrection: 'Corrección Lambda',
    ignitionAdvanceComparison: 'Comparación de Avance',
    aiAssistant: 'Asistente IA',
  },
  home: {
    subtitle: 'Selecciona una herramienta a continuación para comenzar a configurar tu EFI personalizado.',
  },
  injectionMap,
  ignitionAdvance,
  engineVisualization,
  mcsa,
  volumetricEfficiency,
  lambdaCorrection,
  ignitionAdvanceComparison,
  aiAssistant,
}

export default es
