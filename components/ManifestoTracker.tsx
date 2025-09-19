'use client'

import { useState } from 'react'
import { ManifestoPromise } from '@/types'
import { CheckCircle, Clock, AlertTriangle, XCircle, TrendingUp, Calendar, DollarSign } from 'lucide-react'

export function ManifestoTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Sample manifesto promises data
  const manifestoPromises: ManifestoPromise[] = [
    {
      id: '1',
      title: 'Digital Education for All',
      description: 'Provide laptops to 100,000 students across the country for digital education.',
      status: 'in-progress',
      progress: 65,
      timeline: {
        promise: '2024-01-15',
        budget: '2024-03-01',
        delivery: '2024-06-01',
        verification: '2024-12-31'
      },
      relatedProjects: ['1', '2']
    },
    {
      id: '2',
      title: 'Healthcare for Rural Areas',
      description: 'Build 500 new healthcare centers in rural areas within 2 years.',
      status: 'in-progress',
      progress: 40,
      timeline: {
        promise: '2024-01-15',
        budget: '2024-02-15',
        delivery: '2024-08-01',
        verification: '2025-12-31'
      },
      relatedProjects: ['2']
    },
    {
      id: '3',
      title: 'Digital Bangladesh Infrastructure',
      description: 'Complete nationwide fiber optic network by 2025.',
      status: 'fulfilled',
      progress: 100,
      timeline: {
        promise: '2024-01-15',
        budget: '2024-01-20',
        delivery: '2024-11-30',
        verification: '2024-12-15'
      },
      relatedProjects: ['3']
    },
    {
      id: '4',
      title: 'Clean Water for All',
      description: 'Ensure clean drinking water access for 95% of population.',
      status: 'broken',
      progress: 30,
      timeline: {
        promise: '2024-01-15',
        budget: '2024-02-01',
        delivery: '2024-10-01',
        verification: '2024-12-31'
      },
      relatedProjects: []
    }
  ]

  const categories = [
    { value: 'all', label: 'All Promises' },
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'fulfilled', label: 'Fulfilled' },
    { value: 'broken', label: 'Broken' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'broken':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'broken':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'broken':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const filteredPromises = selectedCategory === 'all' 
    ? manifestoPromises 
    : manifestoPromises.filter(promise => promise.status === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Promises</p>
              <p className="text-2xl font-bold text-gray-900">{manifestoPromises.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fulfilled</p>
              <p className="text-2xl font-bold text-green-600">
                {manifestoPromises.filter(p => p.status === 'fulfilled').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {manifestoPromises.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Broken</p>
              <p className="text-2xl font-bold text-red-600">
                {manifestoPromises.filter(p => p.status === 'broken').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Promise Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPromises.map(promise => (
          <div key={promise.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {promise.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {promise.description}
                </p>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(promise.status)}`}>
                {getStatusIcon(promise.status)}
                <span className="ml-1 capitalize">{promise.status.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{promise.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(promise.status)}`}
                  style={{ width: `${promise.progress}%` }}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Timeline</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Promised</div>
                    <div className="font-medium">{formatDate(promise.timeline.promise)}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-2 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Budget Allocated</div>
                    <div className="font-medium">{formatDate(promise.timeline.budget)}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-2 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Delivery Target</div>
                    <div className="font-medium">{formatDate(promise.timeline.delivery)}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-2 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Verification</div>
                    <div className="font-medium">{formatDate(promise.timeline.verification)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            {promise.relatedProjects.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Related Projects:</span> {promise.relatedProjects.length} active
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPromises.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No promises found
          </h3>
          <p className="text-gray-600">
            Try selecting a different category to see more promises.
          </p>
        </div>
      )}
    </div>
  )
}
