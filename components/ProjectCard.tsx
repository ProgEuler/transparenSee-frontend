'use client'

import Link from 'next/link'
import { Project } from '@/types'
import { MapPin, Calendar, DollarSign, User, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  getStatusIcon: (status: string) => React.ReactNode
  getStatusColor: (status: string) => string
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  getProgressPercentage: (allocated: number, spent: number) => number
}

export function ProjectCard({ 
  project, 
  getStatusIcon, 
  getStatusColor, 
  formatCurrency, 
  formatDate, 
  getProgressPercentage 
}: ProjectCardProps) {
  const progressPercentage = getProgressPercentage(project.budget.allocated, project.budget.spent)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ml-4 ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Budget Progress</span>
          <span className="font-medium text-gray-900">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
          <span>Spent: {formatCurrency(project.budget.spent)}</span>
          <span>Allocated: {formatCurrency(project.budget.allocated)}</span>
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span>{project.region}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>Deadline: {formatDate(project.deadline)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2 text-gray-400" />
          <span>{project.responsibleAuthority.name}</span>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {project.category}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Link
          href={`/projects/${project.id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
        >
          View Details
          <ExternalLink className="w-3 h-3 ml-1" />
        </Link>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-600 text-sm">
            Share
          </button>
          <button className="text-gray-400 hover:text-gray-600 text-sm">
            Flag
          </button>
        </div>
      </div>
    </div>
  )
}
