import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, user, country, region } = body

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const DIFY_API_KEY = process.env.DIFY_API_KEY

    if (!DIFY_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Build the request to Dify Chat API
    const difyPayload: Record<string, unknown> = {
      query: query,
      user: user || `user-${Date.now()}`,
      response_mode: 'streaming',
      inputs: {
        country: country || '',
        region: region || '',
      },
    }

    console.log('Sending to Dify Chat:', JSON.stringify(difyPayload))

    const difyResponse = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(difyPayload),
    })

    if (!difyResponse.ok) {
      const errorText = await difyResponse.text()
      console.error('Dify API error status:', difyResponse.status)
      console.error('Dify API error body:', errorText)
      return new Response(JSON.stringify({ error: `Dify error: ${errorText}` }), {
        status: difyResponse.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Stream the response back to the client
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true })
        const lines = text.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              // Pass through all events to the frontend
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsed)}\n\n`))
            } catch {
              // Skip invalid JSON
            }
          }
        }
      },
    })

    const responseBody = difyResponse.body
    if (!responseBody) {
      return new Response(JSON.stringify({ error: 'No response body' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const stream = responseBody.pipeThrough(transformStream)

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat handler error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
