export type RobotState = "waveidle" | "Move" | 'transition' | 'non'
export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export type Project = {
  id: number
  title: string
  number: string
  link: string
  img: string
  year: string
  role: string
  technologies: string[]
  p: string
  created_at?: string
}