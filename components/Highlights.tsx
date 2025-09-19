'use client'

import { CheckCircle, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'

export function Highlights() {
  const stats = [
    {
      icon: CheckCircle,
      label: 'Total Projects',
      value: '2,847',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      icon: DollarSign,
      label: 'Total Budget Allocated',
      value: '৳12.4B',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '73%',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      icon: AlertTriangle,
      label: 'Flagged Issues',
      value: '127',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Live Project Statistics
          </h2>
          <p className="text-lg text-gray-600">
            Real-time insights into government project transparency and accountability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-primary-900 mb-3">
              Blockchain Verification
            </h3>
            <p className="text-primary-700 mb-4">
              All project data is stored on blockchain for immutable transparency and verification.
            </p>
            <div className="text-sm text-primary-600">
              Last verified: 2 minutes ago
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-3">
              Citizen Engagement
            </h3>
            <p className="text-secondary-700 mb-4">
              Over 15,000 citizens actively monitoring and providing feedback on projects.
            </p>
            <div className="text-sm text-secondary-600">
              Active users: 15,247
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-accent-900 mb-3">
              AI-Powered Monitoring
            </h3>
            <p className="text-accent-700 mb-4">
              Advanced AI algorithms detect anomalies and flag potential issues automatically.
            </p>
            <div className="text-sm text-accent-600">
              Issues detected today: 3
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
