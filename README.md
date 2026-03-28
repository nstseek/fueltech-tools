# FuelTech Tools

A front-end EFI tuning toolkit built for engine tuners. All computation runs entirely in the browser — no backend, no accounts, no data leaves your machine.

---

## Features

### Injection Map
Build an injection time lookup table indexed by manifold absolute pressure (MAP).

Fill in your engine's parameters through a guided step wizard, then the tool generates a one-row 2D table covering MAP values from **-1.0 bar to your configured max MAP** in **0.1 bar increments**. A line chart renders the curve for visual reference. You can recalculate at any time using the **Refresh** button without losing your inputs.

**Wizard inputs:**

| Field | Unit | Notes |
|---|---|---|
| Number of cylinders | — | |
| Max RPM | RPM | |
| Peak power | HP | |
| RPM at peak power | RPM | |
| Peak torque | Nm | |
| RPM at peak torque | RPM | |
| Fuel type | — | Gasoline or Ethanol |
| Max MAP | bar | Upper bound of the table axis |
| Injector size | lb/hr | |
| BSFC | lb/HP·hr | Optional — defaults to **0.45** for gasoline, **0.65** for ethanol |

**Calculation entry point:** `src/pages/InjectionMap/calculateInjectionTimes.ts`

```ts
export function calculateInjectionTimes(params: InjectionMapParams): number[]
// Returns one injection time (ms) per MAP column, from -1.0 to maxMAP in 0.1 steps.
```

---

### Ignition Advance
Build an ignition advance lookup table indexed by engine RPM.

The wizard collects engine geometry and fuel data, then generates a one-row 2D table from **200 RPM to max RPM** in **200 RPM increments**. A line chart renders the advance curve alongside the table.

**Wizard inputs:**

| Field | Unit | Notes |
|---|---|---|
| Valves per cylinder | — | Typical: 2 or 4 |
| Max RPM | RPM | |
| Idle RPM | RPM | |
| RPM at peak torque | RPM | |
| Fuel type | — | Gasoline or Ethanol |
| Cylinder bore diameter | mm | Optional — defaults to **86 mm** |

**Calculation entry point:** `src/pages/IgnitionAdvance/calculateIgnitionAdvance.ts`

```ts
export function calculateIgnitionAdvance(params: IgnitionAdvanceParams): number[]
// Returns one advance value (degrees) per RPM column, from 200 to maxRPM in 200 steps.
```

---

### Engine Visualization
An interactive D3.js diagram of a full 4-stroke cycle (0–720° crankshaft rotation) for a single cylinder.

Import your existing injection map and ignition advance CSV files, configure the valve timing and injection angles, then use the live RPM and MAP controller to see how every event shifts across the cycle.

**Wizard inputs:**

| Field | Unit | Notes |
|---|---|---|
| Number of cylinders | — | |
| Intake valve opens | ° | Crankshaft angle |
| Intake valve closes | ° | Crankshaft angle |
| Exhaust valve opens | ° | Crankshaft angle |
| Exhaust valve closes | ° | Crankshaft angle |
| Injection angle | ° | Crankshaft angle where injection starts |
| Injection method | — | Sequential only (semi-sequential and multipoint coming soon) |
| Ignition method | — | Sequential only (wasted spark coming soon) |
| Max RPM | RPM | |
| Max MAP | bar | |
| Injection map CSV | — | Rows = MAP values, columns = RPM values |
| Ignition advance CSV | — | Rows = MAP values, columns = RPM values |

**CSV format:**
```
,1000,2000,3000,...
0.8,2.1,2.4,2.7,...
1.0,2.5,2.9,3.2,...
```
First row: header — first cell empty, remaining cells are RPM values.
Each data row: first cell is the MAP value (bar), remaining cells are the data values.

**Live controller:** Adjust **Engine RPM** and **Intake MAP** inputs below the graph to recalculate spark timing and injection timing on the fly.

**Graph series:**

| Series | Color | Type |
|---|---|---|
| Piston position | White | Continuous line (0 = TDC, 100 = BDC) |
| Intake valve lift | Light blue | Continuous line (0 = closed, 100 = open) |
| Exhaust valve lift | Light red | Continuous line (0 = closed, 100 = open) |
| Stroke dividers | Grey dashed | Vertical lines at 0°, 180°, 360°, 540°, 720° |
| Spark timing | Yellow | Single vertical line |
| Injection start | Red | Single vertical line |
| Injection end | Orange | Single vertical line |

**Calculation entry points:** `src/pages/EngineVisualization/engineCalculations.ts`

```ts
getPistonPosition(degree: number, params: EngineParams): number
getIntakeValveLift(degree: number, params: EngineParams): number
getExhaustValveLift(degree: number, params: EngineParams): number
getSparkTiming(controller: ControllerValues, ignitionData: number[][] | null): number
getInjectionTiming(controller: ControllerValues, injectionData: number[][] | null, injectionAngle: number): { start: number; end: number }
getStrokeDividers(): number[]
```

---

## Implementing the calculation logic

Each tool ships with **stub functions that return zeros**. The function signatures, parameter types, and axis generation helpers are all in place — fill in the physics to make the tables live.

All entry points are pure functions with no side effects; they receive strongly-typed parameter objects and return plain number arrays or scalars. The UI calls them on every Refresh and re-renders the table and chart automatically.

---

## Units reference

| Quantity | Unit |
|---|---|
| Power | HP |
| Torque | Nm |
| Pressure / MAP | bar |
| Injector size | lb/hr |
| BSFC | lb/HP·hr |
| Angles | degrees (crankshaft) |
| Bore diameter | mm |
| RPM | rev/min |
| Injection time | ms |
| Ignition advance | ° BTDC |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build tool | Vite 8 + React Compiler (Babel) |
| UI components | Material UI v7 (dark theme) |
| Data tables | MUI X DataGrid v8 |
| Charts | D3.js v7 |
| Routing | React Router v7 |
| Internationalisation | i18next + react-i18next + browser language detector |
| Linting | ESLint 9 + typescript-eslint |

---

## Internationalisation

The app ships with **English** and **Brazilian Portuguese** and defaults to the browser's system language, falling back to English if the language is not supported.

A language toggle (**EN / PT**) in the top-right of the header switches the language instantly at runtime.

Translation files live under `src/i18n/locales/`. Each feature owns its own sub-directory:

```
src/i18n/locales/
  en.ts                  ← merges all namespaces
  pt-BR.ts
  injectionMap/
    en.ts
    pt-BR.ts
  ignitionAdvance/
    en.ts
    pt-BR.ts
  engineVisualization/
    en.ts
    pt-BR.ts
```

---

## Project structure

```
src/
  components/
    layout/
      AppLayout.tsx        ← shell: sidebar + header + outlet
      Sidebar.tsx          ← permanent navigation drawer
      Header.tsx           ← app bar with page title and language toggle
    ui/
      FeatureCard.tsx      ← home page feature card
      LineChart.tsx        ← reusable D3 line chart
  i18n/
    index.ts               ← i18next initialisation
    locales/               ← translation files (see above)
  pages/
    Home.tsx
    InjectionMap.tsx
    InjectionMap/
      calculateInjectionTimes.ts   ← ★ implement here
    IgnitionAdvance.tsx
    IgnitionAdvance/
      calculateIgnitionAdvance.ts  ← ★ implement here
    EngineVisualization.tsx
    EngineVisualization/
      engineCalculations.ts        ← ★ implement here
  router/
    routes.tsx             ← ROUTES constants + routeConfig
  theme/
    theme.ts               ← MUI dark theme (primary: #fe0000)
  App.tsx                  ← router tree
  main.tsx                 ← React root + ThemeProvider
```

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Lint
npm run lint
```

No environment variables or external services required.
