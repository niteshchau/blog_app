'use client'

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export const SearchBar = () => {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-1/2">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-full 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  )
}
