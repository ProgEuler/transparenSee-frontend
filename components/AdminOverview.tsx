'use client'

import { Users, FolderKanban, MessageSquare, AlertTriangle, Clock } from 'lucide-react'

export function AdminOverview() {
  // Sample data for admin overview
  const stats = [
    { label: 'Total Projects', value: '2,847', icon: FolderKanban, color: 'text-primary-600', bgColor: 'bg-primary-100' },
    { label: 'Active Users', value: '15,247', icon: Users, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
    { label: 'New Feedback', value: '42', icon: MessageSquare, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Flagged Issues', value: '127', icon: AlertTriangle, color: 'text-accent-600', bgColor: 'bg-accent-100' },
  ]

  const recentActivities = [
    { id: 'a1', type: 'Project Update', description: 'Project "Laptop Distribution" status changed to On Track.', time: '2 hours ago' },
    { id: 'a2', type: 'New User', description: 'New user "Aisha Rahman" registered.', time: '5 hours ago' },
    { id: 'a3', type: 'Feedback Received', description: 'New feedback on "Rural Healthcare Centers" project.', time: '1 day ago' },
    { id: 'a4', type: 'Project Flagged', description: 'Project "Digital Bangladesh Infrastructure" flagged for review.', time: '2 days ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
