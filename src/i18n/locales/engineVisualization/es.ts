const engineVisualizationEs = {
  title: 'Visualización del Motor',
  subtitle: 'Visualiza los eventos del cilindro — inyección, distribución de válvulas y chispa por carrera.',
  homeDescription:
    'Visualiza pulsos de inyección, distribución de válvulas y eventos de chispa por carrera del cilindro usando un diagrama D3 interactivo.',
  comingSoon: 'Asistente y diagrama D3 próximamente',
  tagD3Graph: 'Gráfico D3.js',
  tagPerStroke: 'Por Carrera',

  stepEngineConfig: 'Config. del Motor',
  stepMethods: 'Métodos',
  stepImportData: 'Importar Datos',

  fieldNumCylinders: 'Número de Cilindros',
  fieldIntakeValveOpens: 'Apertura de Válvula de Admisión (°)',
  fieldIntakeValveOpensHelper: 'Ángulo del cigüeñal donde comienza a abrirse la válvula de admisión',
  fieldIntakeValveCloses: 'Cierre de Válvula de Admisión (°)',
  fieldIntakeValveClosesHelper: 'Ángulo del cigüeñal donde se cierra completamente la válvula de admisión',
  fieldExhaustValveOpens: 'Apertura de Válvula de Escape (°)',
  fieldExhaustValveOpensHelper: 'Ángulo del cigüeñal donde comienza a abrirse la válvula de escape',
  fieldExhaustValveCloses: 'Cierre de Válvula de Escape (°)',
  fieldExhaustValveClosesHelper: 'Ángulo del cigüeñal donde se cierra completamente la válvula de escape',
  fieldInjectionAngle: 'Ángulo de Inyección (°)',
  fieldInjectionAngleHelper: 'Ángulo del cigüeñal donde comienza la inyección',
  fieldStroke: 'Carrera del Pistón (mm)',
  fieldStrokeHelper: 'Desplazamiento total del pistón del PMS al PMI',
  fieldConrodLength: 'Longitud de la Biela (mm)',
  fieldConrodLengthHelper: 'Distancia entre los centros del pasador del cigüeñal y el pasador del pistón',

  fieldInjectionMethod: 'Método de Inyección',
  injectionMethodSequential: 'Secuencial',
  injectionMethodSemiSequential: 'Semisecuencial',
  injectionMethodMultipoint: 'Multipunto',
  fieldIgnitionMethod: 'Método de Encendido',
  ignitionMethodSequential: 'Secuencial',
  ignitionMethodWastedSpark: 'Chispa Desperdiciada',
  comingSoonNote: 'Próximamente',
  fieldMaxRPM: 'RPM Máximo',
  fieldMaxMAP: 'MAP Máximo (bar)',

  importInjectionMap: 'Importar CSV de Mapa de Inyección',
  importInjectionMapHelper:
    'Formato CSV: la primera fila es un encabezado donde la primera celda está vacía y las restantes son valores de RPM; cada fila siguiente tiene el valor MAP (bar) como primera celda y el tiempo de inyección (ms) como celdas restantes.',
  importIgnitionAdvance: 'Importar CSV de Avance de Encendido',
  importIgnitionAdvanceHelper:
    'Formato CSV: la primera fila es un encabezado donde la primera celda está vacía y las restantes son valores de RPM; cada fila siguiente tiene el valor MAP (bar) como primera celda y el avance de encendido (grados) como celdas restantes.',
  importFileSelected: 'Archivo seleccionado: {{name}}',
  importNoFile: 'Ningún archivo seleccionado',

  legendPiston: 'Pistón',
  legendIntakeValve: 'Válvula de Admisión',
  legendExhaustValve: 'Válvula de Escape',
  legendSpark: 'Chispa',
  legendInjStart: 'Inicio Iny.',
  legendInjEnd: 'Fin Iny.',
  legendPistonVelocity: 'Velocidad del Pistón',

  strokeTDC: 'PMS',
  strokePower: 'Potencia',
  strokeBDC: 'PMI',
  strokeExhaust: 'Escape',

  controllerRPM: 'RPM del Motor',
  controllerMAP: 'MAP de Admisión (bar)',

  errorRequired: 'Este campo es obligatorio',
} as const

export default engineVisualizationEs
