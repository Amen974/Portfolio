import { useState } from "react"
import type { CursorType } from "../Types"
import { CursorContext } from "./CursorContext"

const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<CursorType>('default')
  return (
     <CursorContext.Provider value={{ type, setType }}>
      {children}
    </CursorContext.Provider>
  )
}

export default CursorProvider