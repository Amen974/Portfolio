import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects/Projects'

const Main = () => {
  return (
    <div className='pt-[clamp(1rem,5vw,6rem)]'>
      <Hero/>
      <About/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default Main