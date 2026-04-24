export type RobotState = "waveidle" | "Move" | 'transition' | 'non'
export type CursorType = 'default' | 'click' | 'link'
export type Message = {
  role: 'user' | 'assistant'
  content: string
}