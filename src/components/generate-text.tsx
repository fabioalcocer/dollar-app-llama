'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea'
import { useCompletion } from 'ai/react'
import { useCallback, useState } from 'react'
import InputAI from './compound/input-ai'

const MIN_HEIGHT = 54

function GenerateText() {
  const { completion, complete } = useCompletion({
    api: '/api/generate',
  })

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: 200,
  })

  const generateResponse = async (prompt: string) => {
    await complete(prompt)
  }

  const handleSubmit = useCallback(async () => {
    setInputValue('')
    setIsLoading(true)
    adjustHeight(true)

    try {
      await generateResponse(inputValue)
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, adjustHeight])

  return (
    <div className="w-full">
      <InputAI
        inputValue={inputValue}
        setInputValue={setInputValue}
        adjustHeight={adjustHeight}
        textareaRef={textareaRef}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {isLoading && !completion && (
        <div className="mt-4">
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-3/4 h-4 mb-2" />
        </div>
      )}

      {completion && (
        <div className="mt-2 font-mono px-2">
          <p>{completion}</p>
        </div>
      )}
    </div>
  )
}

export default GenerateText
