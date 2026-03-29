const injectionMapEs = {
  title: 'Mapa de Inyección',
  subtitle: 'Configure el tiempo de inyección según la presión absoluta del colector (MAP).',
  homeDescription:
    'Construya mapas de tiempo de inyección a partir de entradas de presión del colector. Configure los ejes mediante el asistente guiado y luego edite la tabla de consulta 2D generada.',
  comingSoon: 'Asistente y tabla DataGrid próximamente',
  tagMapAxis: 'Eje MAP',
  step1Label: 'Info del Motor',
  step2Label: 'Combustible y MAP',
  numCylinders: 'Número de Cilindros',
  maxRPM: 'RPM Máximo',
  peakPower: 'Potencia Máxima (HP)',
  rpmAtPeakPower: 'RPM en Potencia Máxima',
  peakTorque: 'Torque Máximo (Nm)',
  rpmAtPeakTorque: 'RPM en Torque Máximo',
  fuelType: 'Tipo de Combustible',
  fuelTypeGasoline: 'Gasolina',
  fuelTypeEthanol: 'Etanol',
  maxMAP: 'MAP Máximo (bar)',
  maxMAPHelper: 'Presión absoluta máxima del colector, ej. 2.0 bar',
  injectorSize: 'Tamaño del Inyector (lb/hr)',
  bsfc: 'BSFC (lb/HP·hr)',
  bsfcHelper:
    'Opcional — por defecto {{gasolineDefault}} lb/HP·hr para gasolina, {{ethanolDefault}} lb/HP·hr para etanol',
  dataGridRowLabel: 'Tiempo Iny. (ms)',
  chartXLabel: 'MAP (bar)',
  chartYLabel: 'Tiempo de Inyección (ms)',
} as const

export default injectionMapEs
