'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './Chatbot.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatbotProps {
  country?: string
  region?: string
  inline?: boolean
}

export default function Chatbot({ country = '', region = '', inline = false }: ChatbotProps) {
  const contextLabel = region || country
  const isRegion = Boolean(region)
  const [isOpen, setIsOpen] = useState(inline) // Always open if inline
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the whole page
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  useEffect(() => {
    // Only scroll when there are messages and not during streaming
    if (messages.length > 0 && !isLoading) {
      scrollToBottom()
    }
  }, [messages.length, isLoading])

  useEffect(() => {
    if ((isOpen || inline) && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, inline])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Add empty assistant message that will be streamed
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          user: `user-${Date.now()}`,
          country: country,
          region: region,
          conversation_id: conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader available')

      const decoder = new TextDecoder()
      let buffer = ''
      let accumulatedAnswer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            try {
              const parsed = JSON.parse(data)

              // Capture conversation ID for follow-up messages
              if (parsed.conversation_id && !conversationId) {
                setConversationId(parsed.conversation_id)
              }

              // Handle different event types from Dify chat
              if (parsed.event === 'message' || parsed.event === 'agent_message') {
                // Accumulate the answer - Dify sends chunks
                const chunk = parsed.answer || ''
                if (chunk) {
                  accumulatedAnswer += chunk
                }
              } else if (parsed.event === 'message_end') {
                // Message complete
                console.log('Stream complete, answer length:', accumulatedAnswer.length)
              } else if (parsed.event === 'error') {
                throw new Error(parsed.message || 'Error from AI')
              }
            } catch (parseError) {
              // Skip invalid JSON lines
              console.debug('Parse error:', parseError)
            }
          }
        }

        // Update UI with accumulated answer after processing each chunk
        if (accumulatedAnswer) {
          const currentAnswer = accumulatedAnswer
          setMessages(prev =>
            prev.map((msg, idx) =>
              idx === prev.length - 1 && msg.role === 'assistant'
                ? { ...msg, content: currentAnswer }
                : msg
            )
          )
        }
      }

      // Final update to ensure answer is preserved
      if (accumulatedAnswer) {
        const finalAnswer = accumulatedAnswer
        setMessages(prev =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 && msg.role === 'assistant'
              ? { ...msg, content: finalAnswer }
              : msg
          )
        )
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.role === 'assistant'
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Inline mode - embedded in sidebar
  if (inline) {
    return (
      <div className={styles.inlineContainer}>
        <div className={styles.inlineHeader}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Your Cabinet Advisor</span>
        </div>

        <div className={styles.inlineMessages}>
          {messages.length === 0 && (
            <div className={styles.inlineWelcome}>
              <p>
                {isRegion
                  ? <>Ask anything about EdTech in <strong>{contextLabel}</strong>.</>
                  : <>Ask questions about <strong>{contextLabel}</strong>&apos;s EdTech landscape.</>}
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${styles[message.role]}`}
            >
              <div className={styles.messageContent}>
                {message.content || (
                  <span className={styles.typing}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inlineInputForm} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className={styles.inlineInput}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={styles.inlineSendButton}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    )
  }

  // Floating mode (original)
  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <span className={styles.headerTitle}>Country Profile Assistant</span>
              <span className={styles.headerSubtitle}>Ask about {country}</span>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.welcome}>
                <p>Hello! I can help you understand the EdTech landscape in <strong>{country}</strong>.</p>
                <p className={styles.suggestions}>Try asking:</p>
                <ul>
                  <li>What are the data privacy requirements?</li>
                  <li>What connectivity challenges exist?</li>
                  <li>What languages should EdTech support?</li>
                </ul>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[message.role]}`}
              >
                <div className={styles.messageContent}>
                  {message.content || (
                    <span className={styles.typing}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className={styles.input}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
