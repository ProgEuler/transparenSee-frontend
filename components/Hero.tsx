'use client'

import { useState } from 'react'
import { Search, ArrowRight, Shield, Eye, TrendingUp } from 'lucide-react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Tagline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            See the promises.{' '}
            <span className="text-primary-600">Track the truth.</span>{' '}
            <span className="text-secondary-600">Limit corruption.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            TransparenSee brings complete transparency to government projects. 
            Track budgets, monitor progress, and hold authorities accountable 
            through blockchain-verified data and citizen feedback.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by region, ministry, or keyword..."
                className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Feature Icons */}
          <div className="flex justify-center items-center space-x-12 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Blockchain Verified</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-3">
                <Eye className="w-8 h-8 text-secondary-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Real-time Tracking</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-accent-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">AI-Powered Analytics</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 font-semibold text-lg flex items-center justify-center space-x-2">
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl hover:bg-primary-50 font-semibold text-lg">
              View Manifesto Tracker
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
