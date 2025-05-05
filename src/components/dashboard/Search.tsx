
'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HeroSearchSection({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true)
    onSearch(searchQuery)
  }

  return (
    <section
      className={cn(
        'w-full flex justify-center transition-all duration-700',
        isSubmitted ? 'pt-6 fixed top-0 bg-background z-50' : 'min-h-screen items-center bg-gradient-to-br from-purple-900 to-blue-900'
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl px-4 flex flex-col md:flex-row gap-4 items-center"
      >
        <h1 className={cn("text-3xl font-bold text-white mb-4 md:mb-0", isSubmitted && "hidden")}>
          Find your next opportunity
        </h1>
        <Input
          type="text"
          placeholder="Search job title or keyword"
          className="flex-1 bg-white text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </section>
  )
}
