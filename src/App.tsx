import { Route, Routes } from "react-router-dom"
import CustomCursor from "./components/CustomCursor"
import Main from "./Pages/main/main"
import Chat from "./Pages/Chat"
import Transition from "./Transition"
import { usePageTransition } from "./usePageTransition"
import { TransitionProvider } from "./TransitionProvider"

const AppInner = () => {
  const { isStart, onDone } = usePageTransition()
  return (
    <>
      <CustomCursor />
      {isStart && <Transition isStart={isStart} onDone={onDone} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
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