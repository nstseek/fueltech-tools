const ignitionAdvanceEs = {
  title: 'Avance de Encendido',
  subtitle: 'Configure el avance de encendido según el RPM.',
  homeDescription:
    'Defina curvas de avance de encendido por rango de RPM. Use el asistente para establecer los puntos de referencia del eje y luego ajuste la tabla de avance.',
  comingSoon: 'Asistente y tabla DataGrid próximamente',
  tagRpmAxis: 'Eje RPM',
  stepEngineInfo: 'Info del Motor',
  stepFuelGeometry: 'Combustible y Geometría',
  fieldValvesPerCylinder: 'Válvulas por Cilindro',
  fieldMaxRPM: 'RPM Máximo',
  fieldIdleRPM: 'RPM en Ralentí',
  fieldPeakTorqueRPM: 'RPM en Torque Máximo',
  fieldFuelType: 'Tipo de Combustible',
  fuelGasoline: 'Gasolina',
  fuelEthanol: 'Etanol',
  fieldBoreDiameter: 'Diámetro del Cilindro (mm)',
  helperBoreDiameter: 'Opcional — por defecto 86 mm',
  errorRequired: 'Este campo es obligatorio',
  gridRowLabel: 'Avance (°)',
  chartXLabel: 'RPM',
  chartYLabel: 'Avance (°)',
} as const

export default ignitionAdvanceEs
