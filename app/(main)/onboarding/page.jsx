'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    key: 'connect-bank',
    title: 'Connect Bank Account',
    description:
      "Easily link your Bank account to automatically import transactions. Once connected, we'll retrieve a portion of your past transactions, set your opening balance, and sync new transactions daily, automatically categorizing them. Your linked account will also be added to your Chart of Accounts.",
    action: 'Connect',
    skip: false
  },
  {
    key: 'upload-statement',
    title: 'Upload Bank Statement',
    description:
      'You can upload your bank statements in PDF or CSV format, no templates required. Just provide a few details about how you\'d like your transactions categorized, and we\'ll take care of the rest.',
    action: 'Upload Statement',
    skip: true
  },
  {
    key: 'view-pl',
    title: 'View Profit & Loss',
    description:
      'As transactions are imported and categorized, your Profit and Loss statement, along with other key financial reports, are generated automatically. These reports are available anytime for quick downloads, evaluations, and insights.',
    action: 'View Report',
    skip: true
  },
  {
    key: 'create-dashboard',
    title: 'Create Custom Dashboard',
    description:
      "Create a personalized dashboard based on the metrics that matter most to your business. Just tell Adam what you'd like to track, and a dynamic dashboard will be built for you.",
    action: 'Create Dashboard',
    skip: true
  },
  {
    key: 'chat-adam',
    title: 'Chat with Adam',
    description:
      'Get quick answers and insights into your business finances by chatting with Adam. Whether you need specific metrics, an overview, or help with record-keeping, Adam is ready to assist.',
    action: 'Chat',
    skip: false
  }
]

export default function OnboardingPage() {
  // Reset: no steps completed, start at first step
  const [completed, setCompleted] = useState([])
  const [current, setCurrent] = useState(steps[0].key)
  const [expanded, setExpanded] = useState(steps[0].key)

  const completedCount = completed.length
  const totalSteps = steps.length
  const progress = (completedCount / totalSteps) * 100

  function handleAction(step) {
    // Demo: mark as completed and go to next
    if (!completed.includes(step.key)) {
      setCompleted([...completed, step.key])
    }
    const idx = steps.findIndex(s => s.key === step.key)
    if (idx < steps.length - 1) {
      setCurrent(steps[idx + 1].key)
      setExpanded(steps[idx + 1].key)
    }
  }

  function handleExpand(key) {
    setExpanded(expanded === key ? null : key)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Get started with AI–first accounting assistant</h1>
      <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>Let&apos;s get you set up</span>
        <span>{completedCount} / {totalSteps} onboarding tasks completed</span>
      </div>
      <Progress value={progress} className="h-2 mb-8 bg-gray-200" style={{ '--tw-bg-opacity': 1, backgroundColor: '#32AE4C' }} />
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completed.includes(step.key)
          const isCurrent = current === step.key
          const isExpanded = expanded === step.key
          return (
            <Card
              key={step.key}
              className={cn(
                'transition-all overflow-hidden',
                isCompleted ? 'bg-gray-100 border-gray-200 opacity-80' : 'bg-white',
                isCurrent ? 'ring-2 ring-[#32AE4C]' : '',
                !isCompleted && !isCurrent ? 'hover:border-[#32AE4C]/60' : ''
              )}
            >
              <CardHeader
                className="flex flex-row items-center justify-between cursor-pointer p-4"
                onClick={() => handleExpand(step.key)}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="text-[#32AE4C] h-6 w-6" />
                  ) : (
                    <div className={cn(
                      'h-6 w-6 rounded-full border flex items-center justify-center',
                      isCurrent ? 'border-[#32AE4C]' : 'border-gray-300',
                      isCurrent ? 'bg-[#32AE4C]/10' : 'bg-white'
                    )}>
                      <span className={cn(
                        'block h-2 w-2 rounded-full',
                        isCurrent ? 'bg-[#32AE4C]' : 'bg-gray-300'
                      )} />
                    </div>
                  )}
                  <CardTitle className={cn('text-base font-semibold', isCompleted && 'line-through text-gray-400')}>{step.title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="ml-2" tabIndex={-1}>
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </CardHeader>
              {isExpanded && (
                <CardContent className="pt-0 pb-4 px-4">
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  <div className="flex gap-2">
                    <Button
                      className="bg-[#32AE4C] hover:bg-[#278c3b] text-white"
                      disabled={isCompleted}
                      onClick={() => handleAction(step)}
                    >
                      {step.action}
                    </Button>
                    {step.skip && !isCompleted && (
                      <Button variant="outline" onClick={() => handleAction(step)}>
                        Skip
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
