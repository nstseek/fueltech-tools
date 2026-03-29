export function calculateCompressionRatio(
  bore: number,
  stroke: number,
  chamberVolume: number,
  pistonDishVolume: number,
  gasketBore: number,
  gasketThickness: number,
  deckClearance: number,
): number {
  const vd = (Math.PI / 4) * bore ** 2 * stroke
  const gasketVolume = (Math.PI / 4) * gasketBore ** 2 * gasketThickness
  const deckVolume = (Math.PI / 4) * bore ** 2 * deckClearance
  const vc = chamberVolume + gasketVolume + pistonDishVolume + deckVolume
  return (vd + vc) / vc
}
