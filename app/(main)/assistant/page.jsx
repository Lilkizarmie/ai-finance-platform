"use client"

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { generateAiResponse } from '@/lib/inngest/function'
import { cn } from '@/lib/utils'

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI financial assistant. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await generateAiResponse(userMessage, messages)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = async (action) => {
    setInput(action)
    const event = new Event('submit', { cancelable: true })
    document.querySelector('form').dispatchEvent(event)
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Chat interface */}
        <Card className="h-[600px] flex flex-col">
          {/* Chat messages */}
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-4",
                    message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "flex-1 rounded-lg p-4",
                      message.role === 'assistant'
                        ? 'bg-muted'
                        : 'bg-primary text-primary-foreground'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 rounded-lg p-4 bg-muted">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input area */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your finances..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Quick actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => handleQuickAction("What's my cash flow this quarter?")}
          >
            <h3 className="font-semibold">What's my cash flow this quarter?</h3>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => handleQuickAction("Generate report for Jan–Mar")}
          >
            <h3 className="font-semibold">Generate report for Jan–Mar</h3>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => handleQuickAction("Send invoice to [Client]")}
          >
            <h3 className="font-semibold">Send invoice to [Client]</h3>
          </Button>
        </div>
      </div>
    </div>
  )
} 