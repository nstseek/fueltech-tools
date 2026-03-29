const exhaustPipeLengthEn = {
  title: 'Exhaust Pipe Length Calculator',
  subtitle:
    'Calculate the ideal primary exhaust pipe length based on the RPM at peak torque and the exhaust valve opening angle (EVO). Use this to tune exhaust scavenging for your target power band.',
  homeDescription:
    'Find the ideal primary exhaust pipe length for your target peak torque RPM. Enter the RPM at peak torque and the exhaust valve opening angle to size your exhaust correctly.',
  fieldRPM: 'RPM at Peak Torque',
  fieldEVO: 'EVO — Exhaust Valve Opens before BDC (degrees)',
  calculate: 'Calculate',
  resultLabel: 'Pipe Length',
  resultUnit: 'in',
  tagCalculator: 'Calculator',
  tagExhaust: 'Exhaust',
  chartXLabel: 'RPM',
  chartYLabel: 'Length (in)',
  chartDescription: 'X axis — RPM: engine speed at peak torque.\nY axis — Length (in): ideal primary exhaust pipe length at that RPM.',
  formulaTitle: 'Formula',
  formulaExpression: 'L = (850 × (180 + EVO)) / RPM − 3',
  formulaVarL: 'L — primary pipe length (in)',
  formulaVarEVO: 'EVO — exhaust valve opening before BDC (degrees)',
  formulaVarRPM: 'RPM — RPM at peak torque',
}
export default exhaustPipeLengthEn
