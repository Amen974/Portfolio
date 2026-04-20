import CustomCursor from "./components/CustomCursor"
import About from "./components/sections/About/About"
import Hero from "./components/sections/Hero"
import Projects from "./components/sections/Projects/Projects"

function App() {

  return (
    <div className="pt-[5vw]"> 
      <CustomCursor/>
      <Hero/>
      <About/>
      <Projects/>
    </div>
  )
}

export default App
