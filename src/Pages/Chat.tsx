import { useEffect, useRef, useState } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, ArrowUpward } from "@material-symbols-svg/react"
import Robot from "../components/Robot"
import { useChat } from "../hooks/useChat"
import { usePageTransition } from "../TransitionProvider"

const remarkPlugins = [remarkGfm]

const components: Components = {
  p: ({ children }) => (
    <p className="mb-3 leading-relaxed text-fg/85 last:mb-0">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="break-words text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-fg">{children}</strong>,
  ul: ({ children }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 text-fg/85">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 text-fg/85">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  h1: ({ children }) => <h1 className="mb-2 mt-4 text-xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-2 mt-4 text-lg">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-1 mt-3 text-base">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-accent pl-4 text-fg/70 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-5 border-fg/10" />,
  code: ({ children }) => (
    <code className="rounded bg-fg/10 px-1.5 py-0.5 text-[0.85em] text-accent-soft">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-xl bg-black/50 p-3 text-xs leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-white/85">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-4 w-full overflow-x-auto rounded-xl border border-fg/10">
      <table className="w-full min-w-120 border-collapse text-left text-xs min-[800px]:text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-fg/5">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-fg/15 px-3 py-2 text-left font-bold text-accent">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-fg/5 px-3 py-2 align-top text-fg/85">{children}</td>
  ),
}

const Chat = () => {
  const [message, setMessage] = useState("")
  const { messages, loading, sendMessage } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const { triggerTransition } = usePageTransition()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, loading])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
    setMessage(el.value)
  }

  const handleSend = () => {
    if (!message.trim() || loading) return
    sendMessage(message)
    setMessage("")
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  return (
    <section className="fixed inset-0 flex flex-col">
      <div className="shrink-0 px-3 py-2">
        <button
          type="button"
          aria-label="Back to home"
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-fg/10"
          onClick={() => triggerTransition("/")}
        >
          <ArrowLeft size={26} className="text-accent" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="text-accent">
              <Robot size={10} />
            </div>
            <h1 className="text-[clamp(20px,6vw,40px)] uppercase leading-tight">
              ask me about Amen
            </h1>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-4 min-[800px]:px-6">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <div
                  key={i}
                  className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-fg/8 px-4 py-2.5 text-sm leading-relaxed wrap-break-word"
                >
                  {msg.content}
                </div>
              ) : (
                <div key={i} className="text-sm wrap-break-word min-[800px]:text-[15px]">
                  <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )
            )}
            <div ref={endRef} />
            {loading && (
              <span className="h-5 w-5 rounded-full border-2 border-fg/20 border-t-accent motion-safe:animate-spin" />
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 px-4 pb-6 pt-3 min-[800px]:px-6">
        <div className="group/bar relative mx-auto w-full max-w-3xl">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-1 rounded-full bg-accent/25 blur-xl transition-opacity duration-500 group-focus-within/bar:opacity-100 group-hover/bar:opacity-60 ${
              loading ? "opacity-100 motion-safe:animate-pulse" : "opacity-0"
            }`}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="relative flex w-full items-end gap-2 rounded-[26px] border border-accent/40 bg-black/30 p-2 pl-4 transition-[border-color,background-color,box-shadow] duration-300 ease-out focus-within:border-accent focus-within:bg-black/50 focus-within:shadow-[0_10px_30px_-12px_var(--color-accent)]"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <textarea
              id="chat-input"
              ref={textareaRef}
              value={message}
              rows={1}
              placeholder="SEND..."
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return
                  e.currentTarget.form?.requestSubmit()
                }
              }}
              className="max-h-[40vh] min-h-11 flex-1 resize-none overflow-y-auto bg-transparent py-2 text-sm leading-relaxed caret-accent outline-none transition-colors placeholder:text-fg/30 focus:placeholder:text-fg/15"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!message.trim() || loading}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent shadow-[0_0_18px_-8px_var(--color-accent)] transition-[transform,background-color,opacity,box-shadow] duration-200 ease-out hover:bg-accent-soft motion-safe:hover:scale-105 motion-safe:active:scale-95 disabled:shadow-none ${
                loading ? "" : "disabled:opacity-40"
              }`}
            >
              {loading ? (
                <span className="h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink motion-safe:animate-spin" />
              ) : (
                <ArrowUpward size={20} className="text-ink" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Chat
