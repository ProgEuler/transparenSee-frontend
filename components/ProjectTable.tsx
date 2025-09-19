'use client'

import Link from 'next/link'
import { Project } from '@/types'
import { MapPin, Calendar, User, ExternalLink } from 'lucide-react'

interface ProjectTableProps {
  projects: Project[]
  getStatusIcon: (status: string) => React.ReactNode
  getStatusColor: (status: string) => string
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  getProgressPercentage: (allocated: number, spent: number) => number
}

export function ProjectTable({ 
  projects, 
  getStatusIcon, 
  getStatusColor, 
  formatCurrency, 
  formatDate, 
  getProgressPercentage 
}: ProjectTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Budget Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Region
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Authority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => {
            const progressPercentage = getProgressPercentage(project.budget.allocated, project.budget.spent)
            
            return (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {project.title}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {project.description}
                    </div>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatCurrency(project.budget.spent)} / {formatCurrency(project.budget.allocated)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {project.region}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <User className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="truncate max-w-32">{project.responsibleAuthority.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-32">
                    {project.responsibleAuthority.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {formatDate(project.deadline)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-primary-600 hover:text-primary-900 flex items-center"
                  >
                    View
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
