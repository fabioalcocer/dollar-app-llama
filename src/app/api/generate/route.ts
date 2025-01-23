import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  try {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      tools: {
        dolar: tool({
          description:
            'Get which type of Dolar the user wants to get information about.',
          parameters: z.object({
            type: z
              .union([z.literal('oficial'), z.literal('binance')])
              .describe(
                'The type of Dolar the user wants to get information about.',
              ),
          }),
          execute: async ({ type }) => {
            console.log(type)
            const price = await fetch(
              `https://bo.dolarapi.com/v1/dolares/${type}`,
            )?.then((res) => res.json())

            return { price, type }
          },
        }),
      },
      prompt,
      system:
        'You are a helpful assistant that can answer questions about the dolar price in Bolivia.',
      maxSteps: 5,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error generating text:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate text' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
