'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { ProjectFilters } from '@/components/ProjectFilters'
import { ProjectList } from '@/components/ProjectList'
import { ProjectVisualizations } from '@/components/ProjectVisualizations'
import { FilterOptions } from '@/types'

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterOptions>({})
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  return (
    <main className="min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProjectFilters
              filters={filters}
              onFiltersChange={setFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Visualizations */}
            <div className="mb-8">
              <ProjectVisualizations />
            </div>

            {/* Project List */}
            <ProjectList viewMode={viewMode} filters={filters} />
          </div>
        </div>
      </div>
    </main>
  )
}
