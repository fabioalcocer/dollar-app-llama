'use client'

import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { CornerRightUp } from 'lucide-react'
import { RefObject, useEffect, useState } from 'react'

const INITIAL_TEXT = 'What can I do for you? 💸'
const SPEED = 30

type Props = {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  adjustHeight: (reset?: boolean) => void
  textareaRef: RefObject<HTMLTextAreaElement | null>
  handleSubmit: () => void
  isLoading: boolean
}

export default function InputAI({
  inputValue,
  setInputValue,
  adjustHeight,
  textareaRef,
  handleSubmit,
  isLoading,
}: Props) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex < INITIAL_TEXT.length) {
        setDisplayText(INITIAL_TEXT.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, SPEED)
      } else {
        setIsTyping(false)
      }
    }

    typeText()
  }, [])

  return (
    <div className="w-full pb-4">
      <div className="text-2xl p-4 bg-background min-h-[100px] flex items-center justify-center">
        <p className="text-black dark:text-white font-semibold text-center">
          {displayText}
          {isTyping && <span className="animate-blink">|</span>}
        </p>
      </div>

      <div className="relative max-w-xl w-full mx-auto">
        <Textarea
          placeholder="Ask me anything!"
          className="max-w-xl bg-black/5 dark:bg-white/5 w-full rounded-3xl pl-4 pr-12 placeholder:text-black/70 dark:placeholder:text-white/70 border-none text-black dark:text-white resize-none text-wrap min-h-[40px] py-4"
          ref={textareaRef}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
            adjustHeight()
          }}
          disabled={isLoading}
        />
        <button
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 rounded-xl py-1 px-1',
            isLoading ? 'bg-none' : 'bg-black/5 dark:bg-white/5',
          )}
          type="button"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <div
              className="w-4 h-4 bg-black dark:bg-white rounded-sm animate-spin transition duration-700"
              style={{ animationDuration: '3s' }}
            />
          ) : (
            <CornerRightUp
              className={cn(
                'w-4 h-4 transition-opacity dark:text-white',
                inputValue ? 'opacity-100' : 'opacity-30',
              )}
            />
          )}
        </button>
      </div>

      <div className="text-sm text-center font-mono mt-6 w-full">
        <p className="mb-2">
          The logic of the action is in{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            api/generate/route.ts
          </code>
          .
        </p>
      </div>
    </div>
  )
}
