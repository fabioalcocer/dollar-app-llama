import GenerateText from '@/components/generate-text'

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="w-full max-w-lg flex flex-col gap-6 items-center sm:items-start">
        <GenerateText />
      </main>
    </div>
  )
}
