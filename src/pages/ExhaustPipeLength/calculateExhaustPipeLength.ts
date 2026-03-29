/**
 * Calculates the primary exhaust pipe length.
 *
 * Formula: [850 * (360 - EVO)] + RPM - 3
 *   1. (360 - EVO)              — parenthesis
 *   2. 850 * result             — bracket (multiplication)
 *   3. bracket result + RPM - 3 — addition/subtraction left to right
 *
 * @param rpm - RPM at peak torque
 * @param evo - Exhaust valve opening angle in degrees before BDC
 * @returns Primary exhaust pipe length in inches
 */
export function calculateExhaustPipeLength(rpm: number, evo: number): number {
  const exhaustWindowDegrees = 180 + evo;
  const exhaustPulseDistance = 850 * exhaustWindowDegrees;
  const correctionOffset = 3;
  return exhaustPulseDistance / rpm - correctionOffset;
}
