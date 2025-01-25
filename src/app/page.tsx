import GenerateText from '@/components/generate-text'
import { db } from '@/db/client'
import { productsTable } from '@/db/schema'

export const runtime = 'edge'
export const revalidate = 0

export default async function Home() {
  const result = await db.select().from(productsTable).all()

  console.log('Products:', result)

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="w-full max-w-lg flex flex-col gap-6 items-center sm:items-start">
        <GenerateText />
      </main>

      <span className="max-w-52 text-xs text-slate-200 absolute right-1 bottom-1">
        {JSON.stringify(result, null, 2)}
      </span>
    </div>
  )
}
