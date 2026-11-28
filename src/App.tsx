import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Main from "./Pages/main/Main"
import Transition from "./Transition"
import { usePageTransition, TransitionProvider } from "./TransitionProvider"

const Chat = lazy(() => import("./Pages/Chat"))

const AppInner = () => {
  const { isStart, onDone } = usePageTransition()
  return (
    <>
      {isStart && <Transition onDone={onDone} />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </Suspense>
    </>
  )
}

function App() {
  return (
    <TransitionProvider>
      <AppInner />
    </TransitionProvider>
  )
}

export default App