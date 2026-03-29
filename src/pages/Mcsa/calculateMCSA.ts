/**
 * Calculates the Minimum Cross-Section Area (MCSA) for an intake port
 * to control the RPM at which peak torque occurs.
 *
 * @param pistonDiameter - Piston bore diameter in mm
 * @param stroke - Piston stroke in mm
 * @param rpm - Desired RPM for peak torque
 * @returns Minimum cross-section area in mm²
 */
export function calculateMCSA(
  _pistonDiameter: number,
  _stroke: number,
  _rpm: number,
): number {
  const pistonDiameterSquared = Math.pow(_pistonDiameter, 2);
  return Math.sqrt(pistonDiameterSquared * _stroke * _rpm * 0.000000279);
}
