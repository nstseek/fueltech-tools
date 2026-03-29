/**
 * Calculates the primary exhaust pipe area and diameter.
 *
 * @param rpm - RPM at peak torque
 * @param cylinderVolume - Cylinder volume in cubic inches
 * @returns Object with area (in²) and diameter (in)
 */
export function calculateExhaustPipeArea(
  rpm: number,
  cylinderVolume: number,
): { area: number; diameter: number } {
  const area = (rpm * cylinderVolume) / 88200
  const diameter = 2 * Math.sqrt(area / Math.PI)
  return { area, diameter }
}
