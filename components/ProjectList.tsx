'use client'

import { useState } from 'react'
import { Project, FilterOptions } from '@/types'
import { ProjectCard } from './ProjectCard'
import { ProjectTable } from './ProjectTable'
import { MapPin, Calendar, DollarSign, User, AlertTriangle, CheckCircle, Clock, Flag } from 'lucide-react'

interface ProjectListProps {
  viewMode: 'cards' | 'table'
  filters: FilterOptions
}

// Sample data - in a real app, this would come from your API/state
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Laptop Distribution Project – Dhaka',
    description: 'Distribution of laptops to students in Dhaka division as part of digital education initiative.',
    budget: { allocated: 50000000, spent: 35000000 },
    status: 'on-track',
    responsibleAuthority: {
      name: 'Dr. Mohammad Alamgir',
      department: 'Ministry of Education',
      profileLink: '/authority/alamgir'
    },
    region: 'Dhaka',
    ministry: 'Ministry of Education',
    category: 'ICT',
    deadline: '2025-03-15',
    startDate: '2024-09-01',
    transparencyProofs: [],
    location: { lat: 23.8103, lng: 90.4125 }
  },
  {
    id: '2',
    title: 'Rural Healthcare Centers – Chittagong',
    description: 'Construction of 25 new healthcare centers in rural areas of Chittagong division.',
    budget: { allocated: 75000000, spent: 45000000 },
    status: 'delayed',
    responsibleAuthority: {
      name: 'Prof. Dr. Khaleda Begum',
      department: 'Ministry of Health',
      profileLink: '/authority/khaleda'
    },
    region: 'Chittagong',
    ministry: 'Ministry of Health',
    category: 'Healthcare',
    deadline: '2025-02-28',
    startDate: '2024-06-01',
    transparencyProofs: [],
    location: { lat: 22.3569, lng: 91.7832 }
  },
  {
    id: '3',
    title: 'Digital Bangladesh Infrastructure',
    description: 'Fiber optic network expansion and digital infrastructure development across major cities.',
    budget: { allocated: 200000000, spent: 120000000 },
    status: 'flagged',
    responsibleAuthority: {
      name: 'Eng. Rashid Ahmed',
      department: 'Ministry of ICT',
      profileLink: '/authority/rashid'
    },
    region: 'Dhaka',
    ministry: 'Ministry of ICT',
    category: 'Infrastructure',
    deadline: '2025-06-30',
    startDate: '2024-01-01',
    transparencyProofs: [],
    location: { lat: 23.8103, lng: 90.4125 }
  },
  {
    id: '4',
    title: 'School Building Construction – Sylhet',
    description: 'Construction of 15 new school buildings in Sylhet division to improve education infrastructure.',
    budget: { allocated: 30000000, spent: 30000000 },
    status: 'completed',
    responsibleAuthority: {
      name: 'Dr. Fatima Khatun',
      department: 'Ministry of Education',
      profileLink: '/authority/fatima'
    },
    region: 'Sylhet',
    ministry: 'Ministry of Education',
    category: 'Education',
    deadline: '2024-12-31',
    startDate: '2024-03-01',
    transparencyProofs: [],
    location: { lat: 24.8949, lng: 91.8687 }
  }
]

export function ProjectList({ viewMode, filters }: ProjectListProps) {
  const [projects] = useState<Project[]>(sampleProjects)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="w-4 h-4 text-secondary-600" />
      case 'delayed':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'flagged':
        return <Flag className="w-4 h-4 text-accent-600" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-secondary-100 text-secondary-800'
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800'
      case 'flagged':
        return 'bg-accent-100 text-accent-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getProgressPercentage = (allocated: number, spent: number) => {
    return Math.round((spent / allocated) * 100)
  }

  // Filter projects based on current filters
  const filteredProjects = projects.filter(project => {
    if (filters.region && project.region !== filters.region) return false
    if (filters.ministry && project.ministry !== filters.ministry) return false
    if (filters.category && project.category !== filters.category) return false
    if (filters.status && project.status !== filters.status) return false
    return true
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Projects ({filteredProjects.length})
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-secondary-600 mr-1" />
              <span>On Track</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-yellow-600 mr-1" />
              <span>Delayed</span>
            </div>
            <div className="flex items-center">
              <Flag className="w-4 h-4 text-accent-600 mr-1" />
              <span>Flagged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                getProgressPercentage={getProgressPercentage}
              />
            ))}
          </div>
        ) : (
          <ProjectTable 
            projects={filteredProjects}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            getProgressPercentage={getProgressPercentage}
          />
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more projects.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
