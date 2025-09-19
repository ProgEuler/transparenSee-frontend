'use client'

import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { ETenderFilters } from '@/components/ETenderFilters'
import { ETenderList } from '@/components/ETenderList'
import { ETenderFilterOptions } from '@/types/index'

export default function ETenderPage() {
  const [filters, setFilters] = useState<ETenderFilterOptions>({})
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ETenderFilters
              filters={filters}
              onFiltersChange={setFilters}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          </div>

          {/* Main Content - Tender List */}
          <div className="lg:col-span-3">
            <ETenderList filters={filters} searchQuery={searchQuery} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
