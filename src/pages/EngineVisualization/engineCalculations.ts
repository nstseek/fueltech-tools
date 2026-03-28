export interface EngineParams {
  numCylinders: number
  intakeValveOpens: number // degrees
  intakeValveCloses: number // degrees
  exhaustValveOpens: number // degrees
  exhaustValveCloses: number // degrees
  injectionAngle: number // degrees
  injectionMethod: 'sequential'
  ignitionMethod: 'sequential'
  maxRPM: number
  maxMAP: number
}

export interface ControllerValues {
  rpm: number
  map: number
}

// Returns piston position (0–100) for a given crank angle degree.
// 0 = TDC (top dead center), 100 = BDC (bottom dead center).
// For now return 0 — user will implement real sinusoidal logic later.
export function getPistonPosition(_degree: number, _params: EngineParams): number {
  return 0
}

// Returns intake valve lift (0–100) for a given crank angle degree.
// Valve is open between intakeValveOpens and intakeValveCloses degrees.
// Step function: 100 when open, 0 when closed.
export function getIntakeValveLift(degree: number, params: EngineParams): number {
  const normalDeg = degree % 720
  const opens = params.intakeValveOpens
  const closes = params.intakeValveCloses
  if (opens <= closes) {
    return normalDeg >= opens && normalDeg <= closes ? 100 : 0
  }
  return normalDeg >= opens || normalDeg <= closes ? 100 : 0
}

// Returns exhaust valve lift (0–100) for a given crank angle degree.
// Step function using exhaustValveOpens/exhaustValveCloses.
export function getExhaustValveLift(degree: number, params: EngineParams): number {
  const normalDeg = degree % 720
  const opens = params.exhaustValveOpens
  const closes = params.exhaustValveCloses
  if (opens <= closes) {
    return normalDeg >= opens && normalDeg <= closes ? 100 : 0
  }
  return normalDeg >= opens || normalDeg <= closes ? 100 : 0
}

// Returns the spark timing as a single crank angle degree (for a vertical line on the graph).
// Looks up from ignition advance data: interpolate between nearest RPM and MAP values.
// For now return 0 (user will implement interpolation later).
export function getSparkTiming(
  _controller: ControllerValues,
  _ignitionData: number[][] | null,
): number {
  return 0
}

// Returns stroke divider angles: [0, 180, 360, 540, 720].
// These are drawn as vertical dashed lines to mark each stroke boundary.
export function getStrokeDividers(): number[] {
  return [0, 180, 360, 540, 720]
}

// Returns injection start and end angles as two vertical lines.
// Start = injectionAngle from params.
// Duration = looked up from injection map CSV based on controller RPM and MAP, then converted to degrees.
// For now: start = injectionAngle, end = injectionAngle + 30 (static placeholder).
export function getInjectionTiming(
  _controller: ControllerValues,
  _injectionData: number[][] | null,
  injectionAngle: number,
): { start: number; end: number } {
  return { start: injectionAngle, end: injectionAngle + 30 }
}
