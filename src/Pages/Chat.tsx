import { useRef, useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import { useChat } from "../hooks/UseChat"

const Chat = () => {
  const [message, setMessage] = useState<string>('')
  const { messages, loading, sendMessage } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const load = () => {

  }

  if(loading) load()

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
        </div>
      </div>

      <div className="border border-[#da7756] shadow-xs shadow-black rounded-3xl p-[1.5vw] flex flex-col fixed bottom-10 left-1/2 -translate-x-1/2 w-[95vw] max-w-175 bg-[#0a0f1e]">
        <textarea
          ref={textareaRef}
          value={message}
          className="outline-none resize-none overflow-y-auto min-h-11 max-h-[50vh]"
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
        <div className="relative h-3">
          <button className="absolute right-0" onClick={handleSend}>send</button>
        </div>
      </div>

    </section>
  )
}

export default Chat