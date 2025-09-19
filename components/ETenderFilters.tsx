'use client'

import { useState } from 'react'
import { Filter, ChevronLeft, Calendar, Search, Building, Tag, Briefcase } from 'lucide-react'
import { ETenderFilterOptions } from '@/types'

interface ETenderFiltersProps {
  filters: ETenderFilterOptions
  onFiltersChange: (filters: ETenderFilterOptions) => void
  searchQuery: string
  onSearchQueryChange: (query: string) => void
}

export function ETenderFilters({ 
  filters, 
  onFiltersChange,
  searchQuery,
  onSearchQueryChange
}: ETenderFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const ministries = [
    'Ministry of Education', 'Ministry of Health', 'Ministry of ICT', 
    'Ministry of Infrastructure', 'Ministry of Agriculture', 'Ministry of Finance',
    'Ministry of Local Government', 'Ministry of Water Resources'
  ]

  const procuringEntities = [
    'Public Works Department', 'Local Government Engineering Department', 
    'Bangladesh Power Development Board', 'Bangladesh Rural Electrification Board',
    'Directorate General of Health Services', 'Primary Education Department'
  ]

  const procuringTypes = [
    'Goods', 'Works', 'Services', 'Consultancy'
  ]

  const handleFilterChange = (key: keyof ETenderFilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
    onSearchQueryChange('')
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Advanced Search
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Ministry / Division Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Building className="w-4 h-4 inline mr-1" />
              Ministry / Division
            </label>
            <select
              value={filters.ministry || ''}
              onChange={(e) => handleFilterChange('ministry', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            >
              <option value="">All Ministries</option>
              {ministries.map(ministry => (
                <option key={ministry} value={ministry}>{ministry}</option>
              ))}
            </select>
          </div>

          {/* Procuring Entity Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" />
              Procuring entity
            </label>
            <select
              value={filters.procuringEntity || ''}
              onChange={(e) => handleFilterChange('procuringEntity', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            >
              <option value="">All Entities</option>
              {procuringEntities.map(entity => (
                <option key={entity} value={entity}>{entity}</option>
              ))}
            </select>
          </div>

          {/* Type of Procuring Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Type of procuring
            </label>
            <select
              value={filters.procuringType || ''}
              onChange={(e) => handleFilterChange('procuringType', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            >
              <option value="">All Types</option>
              {procuringTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* From Publishing Date Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              From publishing date
            </label>
            <input
              type="date"
              value={filters.publishingDateFrom || ''}
              onChange={(e) => handleFilterChange('publishingDateFrom', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>

          {/* To Publishing Date Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              To publishing date
            </label>
            <input
              type="date"
              value={filters.publishingDateTo || ''}
              onChange={(e) => handleFilterChange('publishingDateTo', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>

          {/* From Closing Date Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              From Closing Date
            </label>
            <input
              type="date"
              value={filters.closingDateFrom || ''}
              onChange={(e) => handleFilterChange('closingDateFrom', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>

          {/* To Closing Date Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              To Closing Date
            </label>
            <input
              type="date"
              value={filters.closingDateTo || ''}
              onChange={(e) => handleFilterChange('closingDateTo', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm font-medium text-muted-foreground bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}