import { useState } from 'react'
import type { Message } from '../Types'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const newMessages = [...messages, { role: 'user' as const, content }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      if (!res.ok) throw new Error('Chat request failed')
      const data: { text?: string } = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.text ?? '' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now.' }])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
}
