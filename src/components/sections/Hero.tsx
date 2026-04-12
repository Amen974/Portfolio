import Claude from "../claude/Claude"
import Robot from "../robot/Robot"

const Hero = () => {
  return (
    <section className='h-[42vw] w-full mb-[12vw] mx-auto max-w-[94vw] relative uppercase'>
      <h1 className='text-[5vw] absolute tracking-wide'>Frontend Developer</h1>
      <h1 className="text-[4vw]/[1em] text-right absolute left-[18vw] top-[12vw] max-w-[35vw] tracking-wide">
        <span>specialize in </span>
        <span>building modern </span>
        <span>React applications</span>
      </h1>

      <div className="absolute right-[5vw] top-[2vw]">
        <Robot />
      </div>

      <h1 className="text-[4vw] text-right absolute right-0 top-[30vw] tracking-wide">with a focus</h1>
      <h1 className="text-[4vw]/[1em] text-right absolute right-[2vw] top-[35vw] tracking-wide">on performance</h1>

      <div className="absolute left-[5vw] bottom-[6vw]">
        <Claude />
      </div>

      <div className="flex absolute bottom-[-3vw] md:bottom-[2vw] md:left-[5.2vw] gap-2 text-[2vw] md:text-[0.9vw]">
        <div className="flex gap-1">
          <span className="hidden md:block">+</span>
          <span className="h-full w-[0.5vw] md:w-[0.2vw] bg-[#da7756] block"></span>
        </div>

        <div className="flex flex-col">
          <span>React Developer</span>
          <span>Freelancer</span>
        </div>
      </div>

    </section>
  )
}

export default Hero