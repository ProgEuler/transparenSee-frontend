'use client'

import { useState } from 'react'
import { Filter, Grid, List, Calendar, MapPin, Building, Tag } from 'lucide-react'
import { FilterOptions } from '@/types'

interface ProjectFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  viewMode: 'cards' | 'table'
  onViewModeChange: (mode: 'cards' | 'table') => void
}

export function ProjectFilters({ 
  filters, 
  onFiltersChange, 
  viewMode, 
  onViewModeChange 
}: ProjectFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const regions = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'
  ]

  const ministries = [
    'Ministry of Education', 'Ministry of Health', 'Ministry of ICT', 
    'Ministry of Infrastructure', 'Ministry of Agriculture', 'Ministry of Finance'
  ]

  const categories = [
    'ICT', 'Healthcare', 'Infrastructure', 'Education', 'Agriculture', 'Other'
  ]

  const statuses = [
    'On Track', 'Delayed', 'Flagged', 'Completed'
  ]

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* View Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              View Mode
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => onViewModeChange('cards')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                  viewMode === 'cards'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4 mr-1" />
                Cards
              </button>
              <button
                onClick={() => onViewModeChange('table')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                  viewMode === 'table'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4 mr-1" />
                Table
              </button>
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Region
            </label>
            <select
              value={filters.region || ''}
              onChange={(e) => handleFilterChange('region', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Ministry Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-1" />
              Ministry
            </label>
            <select
              value={filters.ministry || ''}
              onChange={(e) => handleFilterChange('ministry', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Ministries</option>
              {ministries.map(ministry => (
                <option key={ministry} value={ministry}>{ministry}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase().replace(' ', '-')}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date Range
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={filters.dateRange?.start || ''}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters.dateRange,
                  start: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={filters.dateRange?.end || ''}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters.dateRange,
                  end: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="End Date"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}
