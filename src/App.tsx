import CustomCursor from "./components/CustomCursor"
import About from "./components/sections/About"
import Contact from "./components/sections/Contact"
import Hero from "./components/sections/Hero"
import Projects from "./components/sections/Projects/Projects"

function App() {

  return (
    <div className="pt-[5vw]"> 
      <CustomCursor/>
      <Hero/>
      <About/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default App
