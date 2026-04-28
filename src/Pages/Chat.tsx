import { useRef, useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import { useChat } from "../hooks/UseChat"
import { ArrowLeft, ArrowUpward } from '@material-symbols-svg/react';
import Claude from "../components/Claude";
import gsap from "gsap"
import { useCursor } from "../components/CursorContext";
import { usePageTransition } from "../usePageTransition";

const Chat = () => {
  const [message, setMessage] = useState<string>('')
  const { messages, loading, sendMessage } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const claudLoading = useRef<HTMLDivElement>(null)

  const { setType } = useCursor()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
    setMessage(el.value)
  }

  const handleSend = () => {
    sendMessage(message)
    setMessage('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  useEffect(() => {
    if (!claudLoading.current) return
    if (loading) {
      gsap.to(claudLoading.current, {
        rotateZ: 360,
        duration: 3,
        repeat: -1,
        ease: "none",
        immediateRender: false,
      })
    } else {
      if (!claudLoading.current) return 
      gsap.killTweensOf(claudLoading.current)
      gsap.set(claudLoading.current, { rotateZ: 0 })
    }
  }, [loading])

  const { triggerTransition } = usePageTransition()
   const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
  
    const robotSize = windowWidth <= 800 ? 10 : 4
  return (
    <section className="fixed inset-0 flex flex-col items-center">

      <div className="fixed top-12 bottom-32 left-0 right-0 overflow-y-auto">
        <div className="flex flex-col gap-4 w-[95vw] max-w-175 mx-auto px-2 py-4">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user'
              ? 'self-end bg-black p-2 rounded-lg max-w-[80%] wrap-break-word'
              : 'self-start max-w-[75%] wrap-break-word'}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
          {messages.length > 0 && (
            <div ref={claudLoading} className="h-[3vw] w-[3vw]">
              <Claude size={3} />
            </div>
          )}

        </div>
        {messages.length === 0 && (
          <div className="uppercase flex items-center justify-center text-[clamp(20px,2.5vw,9999px)] gap-2 absolute bottom-[2vw] left-1/2 -translate-x-1/2 w-full">
            <Claude size={robotSize} />
            <h1>ask me about Amen</h1>
          </div>
        )}
      </div>

      <div className="border border-[#da7756] shadow-xs shadow-black rounded-3xl p-[1.5vw] flex flex-col fixed bottom-10 left-1/2 -translate-x-1/2 w-[95vw] max-w-175 bg-[#0a0f1e]">
        <textarea
          ref={textareaRef}
          value={message}
          className="outline-none resize-none overflow-y-auto min-h-14 max-h-[50vh]"
          placeholder="SEND..."
          onChange={handleInput}
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button className="absolute min-[800px]:right-[1vw] right-[3vw] min-[800px]:bottom-[1vw] bottom-[2.5vw] bg-[#da7756] rounded-lg h-8 w-8 flex justify-center items-center hover:bg-[#cc6f50]" onClick={handleSend}><ArrowUpward size={20} /></button>
      </div>

      <button className="absolute left-3 top-2"
        onMouseEnter={(() => setType('click'))}
        onMouseLeave={(() => setType('default'))}
        onClick={() => triggerTransition('/')}
      >
        <ArrowLeft size={30} color="#da7756" />
      </button>

    </section>
  )
}

export default Chat