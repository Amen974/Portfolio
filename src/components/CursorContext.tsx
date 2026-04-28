import { createContext, useContext } from "react"
import type { CursorType } from "../Types"

export const CursorContext = createContext<{
  type: CursorType
  setType: (t: CursorType) => void
}>({
  type: 'default',
  setType: () => {},
})

export const useCursor = () => useContext(CursorContext)