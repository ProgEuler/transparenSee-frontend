'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export function ProjectVisualizations() {
  // Sample data - in a real app, this would come from your API/state
  const budgetData = [
    { name: 'ICT', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 25, color: '#22c55e' },
    { name: 'Infrastructure', value: 20, color: '#f59e0b' },
    { name: 'Education', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ]

  const timelineData = [
    { month: 'Jan', promises: 45, deliveries: 38 },
    { month: 'Feb', promises: 52, deliveries: 41 },
    { month: 'Mar', promises: 48, deliveries: 44 },
    { month: 'Apr', promises: 61, deliveries: 52 },
    { month: 'May', promises: 55, deliveries: 48 },
    { month: 'Jun', promises: 67, deliveries: 58 },
  ]

  const statusData = [
    { status: 'On Track', count: 1847, color: '#22c55e' },
    { status: 'Delayed', count: 623, color: '#f59e0b' },
    { status: 'Flagged', count: 127, color: '#ef4444' },
    { status: 'Completed', count: 250, color: '#3b82f6' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget Allocation Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Budget Allocation by Sector
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value}%`, 'Budget']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {budgetData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Status Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Status Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="status" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                formatter={(value: any) => [value, 'Projects']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Promises vs Deliveries Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Promises vs Deliveries Over Time
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  value, 
                  name === 'promises' ? 'Promises' : 'Deliveries'
                ]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="promises" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="deliveries" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-primary-600 mr-2" />
            <span className="text-sm text-gray-600">Promises Made</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-secondary-600 mr-2" />
            <span className="text-sm text-gray-600">Deliveries Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
