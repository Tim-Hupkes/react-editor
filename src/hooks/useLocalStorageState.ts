import { useEffect, useState } from 'react'

export function useLocalStorageState(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Keep the editor usable when browser storage is unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}
