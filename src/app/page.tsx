import GenerateText from '@/components/generate-text'
import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.NEXT_PUBLIC_TURSO_DB_URL || '',
  syncUrl: 'https://fabioalcocerapp-fabioalcocer.turso.io',
  authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
})

export default async function Home() {
  const result = await client.execute('SELECT * FROM products')

  console.log('Products:', result.rows)

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="w-full max-w-lg flex flex-col gap-6 items-center sm:items-start">
        <GenerateText />
      </main>

      <span className="max-w-52 text-xs text-slate-200 absolute right-1 bottom-1">
        {JSON.stringify(result.rows, null, 2)}
      </span>
    </div>
  )
}
