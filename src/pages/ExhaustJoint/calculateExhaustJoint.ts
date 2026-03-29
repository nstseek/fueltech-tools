export type ExhaustJointType = 'street' | 'drag'

export function calculateExhaustJoint(
  primaryLength: number,
  primaryDiameter: number,
  type: ExhaustJointType,
): { jointLength: number; jointDiameter: number } {
  const jointLength = 0.5 * primaryLength
  const multiplier = type === 'drag' ? 1.9 : 1.6
  const jointDiameter = multiplier * primaryDiameter
  return { jointLength, jointDiameter }
}
