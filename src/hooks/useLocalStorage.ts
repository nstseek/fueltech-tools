import { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

/**
 * Drop-in replacement for useState that persists the value to localStorage.
 * Reads the stored value synchronously on mount; writing is automatic on every
 * state update. Works with both plain values and functional updaters.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? (JSON.parse(stored) as T) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const set: Dispatch<SetStateAction<T>> = useCallback(
    (action) => {
      setValue((prev) => {
        const next =
          typeof action === 'function' ? (action as (prev: T) => T)(prev) : action
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // quota exceeded or private browsing — silently ignore
        }
        return next
      })
    },
    [key],
  )

  return [value, set]
}
