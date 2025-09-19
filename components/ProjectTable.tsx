"use client"

import { Project } from "@/types"

interface ProjectTableProps {
  projects: Project[]
  actions?: (project: Project) => React.ReactNode
}

export function ProjectTable({ projects, actions }: ProjectTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Project Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Budget
            </th>
            {actions && <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.budget}
              </td>
              {actions && <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {actions(project)}
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}