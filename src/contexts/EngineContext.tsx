import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { EngineProfile } from '../types/engineProfile'

const ENGINES_KEY = 'fueltech:engines'
const ACTIVE_ENGINE_KEY = 'fueltech:activeEngineId'

function loadEngines(): EngineProfile[] {
  try {
    const stored = localStorage.getItem(ENGINES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function loadActiveEngineId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_ENGINE_KEY)
  } catch {
    return null
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

interface EngineContextValue {
  engines: EngineProfile[]
  activeEngine: EngineProfile | null
  activeEngineId: string | null
  createEngine: (name: string) => EngineProfile
  updateEngine: (id: string, updates: Partial<EngineProfile>) => void
  deleteEngine: (id: string) => void
  selectEngine: (id: string | null) => void
  updateActiveEngine: (updates: Partial<EngineProfile>) => void
}

const EngineContext = createContext<EngineContextValue | null>(null)

export function EngineProvider({ children }: { children: ReactNode }) {
  const [engines, setEngines] = useState<EngineProfile[]>(loadEngines)
  const [activeEngineId, setActiveEngineId] = useState<string | null>(loadActiveEngineId)

  const activeEngine = engines.find((e) => e.id === activeEngineId) ?? null

  useEffect(() => {
    try {
      localStorage.setItem(ENGINES_KEY, JSON.stringify(engines))
    } catch {}
  }, [engines])

  useEffect(() => {
    try {
      if (activeEngineId === null) localStorage.removeItem(ACTIVE_ENGINE_KEY)
      else localStorage.setItem(ACTIVE_ENGINE_KEY, activeEngineId)
    } catch {}
  }, [activeEngineId])

  const createEngine = useCallback((name: string): EngineProfile => {
    const engine: EngineProfile = {
      id: generateId(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setEngines((prev) => [...prev, engine])
    setActiveEngineId(engine.id)
    return engine
  }, [])

  const updateEngine = useCallback((id: string, updates: Partial<EngineProfile>) => {
    setEngines((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: Date.now() } : e)),
    )
  }, [])

  const deleteEngine = useCallback(
    (id: string) => {
      setEngines((prev) => prev.filter((e) => e.id !== id))
      setActiveEngineId((prev) => {
        if (prev !== id) return prev
        const remaining = engines.filter((e) => e.id !== id)
        return remaining.length > 0 ? remaining[0].id : null
      })
    },
    [engines],
  )

  const selectEngine = useCallback((id: string | null) => {
    setActiveEngineId(id)
  }, [])

  const updateActiveEngine = useCallback(
    (updates: Partial<EngineProfile>) => {
      if (!activeEngineId) return
      setEngines((prev) =>
        prev.map((e) =>
          e.id === activeEngineId ? { ...e, ...updates, updatedAt: Date.now() } : e,
        ),
      )
    },
    [activeEngineId],
  )

  return (
    <EngineContext.Provider
      value={{
        engines,
        activeEngine,
        activeEngineId,
        createEngine,
        updateEngine,
        deleteEngine,
        selectEngine,
        updateActiveEngine,
      }}
    >
      {children}
    </EngineContext.Provider>
  )
}

export function useEngineContext(): EngineContextValue {
  const ctx = useContext(EngineContext)
  if (!ctx) throw new Error('useEngineContext must be used within EngineProvider')
  return ctx
}
