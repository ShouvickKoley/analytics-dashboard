import { useEffect, useState } from 'react'

/**
 * Generic persisted state, the same shape as useState but backed by
 * localStorage under `key`. Used for anything the user changes that should
 * survive a reload (goal progress, settings) without needing a backend.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Best-effort persistence only (private browsing, quota, etc).
    }
  }, [key, value])

  return [value, setValue]
}
