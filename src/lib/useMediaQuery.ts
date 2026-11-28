import { useCallback, useSyncExternalStore } from "react"

export const DESKTOP = "(min-width: 800px)"

export const useMediaQuery = (query: string) => {
  const subscribe = useCallback((listener: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
