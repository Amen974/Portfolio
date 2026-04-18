import { createContext, useContext } from "react"
import type { CursorType } from "../Types"

// 1. create context at module level, outside any component
export const CursorContext = createContext<{
  type: CursorType
  setType: (t: CursorType) => void
}>({
  type: 'default',
  setType: () => {},
})

// 3. custom hook — this is what Robot and CustomCursor import
export const useCursor = () => useContext(CursorContext)