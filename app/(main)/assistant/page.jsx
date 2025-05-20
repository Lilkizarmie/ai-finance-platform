"use client"

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2, Target, TrendingUp, Calculator, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { generateAiResponse } from '@/lib/inngest/function'
import { cn } from '@/lib/utils'

// Mock data - replace with actual data fetching
const mockData = {
  goals: [
    {
      id: 1,
      name: 'Reduce Burn Rate',
      target: 15,
      current: 12,
      unit: '%',
      status: 'on-track',
      suggestions: [
        'Optimize marketing spend in Q2',
        'Review SaaS subscriptions'
      ]
    },
    {
      id: 2,
      name: 'Increase Gross Margin',
      target: 75,
      current: 68,
      unit: '%',
      status: 'at-risk',
      suggestions: [
        'Review pricing strategy',
        'Analyze cost of goods sold'
      ]
    },
    {
      id: 3,
      name: 'Customer Acquisition',
      target: 500,
      current: 350,
      unit: 'customers',
      status: 'behind',
      suggestions: [
        'Increase marketing budget',
        'Optimize conversion funnel'
      ]
    }
  ],
  unitEconomics: {
    cac: {
      value: 2500,
      trend: 'down',
      change: 15,
      details: 'Customer Acquisition Cost decreasing due to improved conversion rates'
    },
    ltv: {
      value: 15000,
      trend: 'up',
      change: 20,
      details: 'Lifetime Value increasing with new premium features'
    },
    grossMargin: {
      value: 68,
      trend: 'up',
      change: 5,
      details: 'Gross margin improving with scale'
    },
    netRetention: {
      value: 110,
      trend: 'up',
      change: 8,
      details: 'Net revenue retention above 100% indicates healthy growth'
    }
  },
  runway: {
    months: 18,
    status: 'healthy',
    details: 'Current burn rate and cash position support 18 months of operations'
  }
}

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI financial assistant. I can help you analyze your finances, track goals, and provide insights. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
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

  const getGoalStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return 'text-green-500'
      case 'at-risk':
        return 'text-yellow-500'
      case 'behind':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
      </div>
      
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Unit Economics
          </TabsTrigger>
        </TabsList>

        {/* Chat Interface */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="h-[600px] flex flex-col">
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

          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => handleQuickAction("How did my net income change this quarter?")}
            >
              <h3 className="font-semibold">Net Income Analysis</h3>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => handleQuickAction("Show me unusual vendor payments in March")}
            >
              <h3 className="font-semibold">Payment Anomalies</h3>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => handleQuickAction("What's my runway if revenue stays flat?")}
            >
              <h3 className="font-semibold">Runway Analysis</h3>
            </Button>
          </div>
        </TabsContent>

        {/* Goals Tracking */}
        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockData.goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="text-base font-normal">{goal.name}</CardTitle>
                  <CardDescription>
                    Target: {goal.target}{goal.unit} | Current: {goal.current}{goal.unit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={(goal.current / goal.target) * 100} />
                    <div className="flex items-center gap-2">
                      <span className={cn("text-sm", getGoalStatusColor(goal.status))}>
                        {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                      </span>
                      {goal.status === 'on-track' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">AI Suggestions:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {goal.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Unit Economics */}
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition Cost (CAC)</CardTitle>
                <CardDescription>
                  ${mockData.unitEconomics.cac.value.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {getTrendIcon(mockData.unitEconomics.cac.trend)}
                  <span className={cn(
                    "text-sm",
                    mockData.unitEconomics.cac.trend === 'up' ? "text-red-500" : "text-green-500"
                  )}>
                    {mockData.unitEconomics.cac.change}% change
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {mockData.unitEconomics.cac.details}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lifetime Value (LTV)</CardTitle>
                <CardDescription>
                  ${mockData.unitEconomics.ltv.value.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {getTrendIcon(mockData.unitEconomics.ltv.trend)}
                  <span className={cn(
                    "text-sm",
                    mockData.unitEconomics.ltv.trend === 'up' ? "text-green-500" : "text-red-500"
                  )}>
                    {mockData.unitEconomics.ltv.change}% change
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {mockData.unitEconomics.ltv.details}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gross Margin</CardTitle>
                <CardDescription>
                  {mockData.unitEconomics.grossMargin.value}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {getTrendIcon(mockData.unitEconomics.grossMargin.trend)}
                  <span className={cn(
                    "text-sm",
                    mockData.unitEconomics.grossMargin.trend === 'up' ? "text-green-500" : "text-red-500"
                  )}>
                    {mockData.unitEconomics.grossMargin.change}% change
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {mockData.unitEconomics.grossMargin.details}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Net Revenue Retention</CardTitle>
                <CardDescription>
                  {mockData.unitEconomics.netRetention.value}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {getTrendIcon(mockData.unitEconomics.netRetention.trend)}
                  <span className={cn(
                    "text-sm",
                    mockData.unitEconomics.netRetention.trend === 'up' ? "text-green-500" : "text-red-500"
                  )}>
                    {mockData.unitEconomics.netRetention.change}% change
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {mockData.unitEconomics.netRetention.details}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Runway Analysis</CardTitle>
              <CardDescription>
                {mockData.runway.months} months of runway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {mockData.runway.details}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 