'use client'

import { ETenderProposal } from '@/types'

interface ETenderCardProps {
  tender: ETenderProposal
}

export function ETenderCard({ tender }: ETenderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'closed':
        return 'bg-muted text-muted-foreground'
      case 'awarded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-BD', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const end = new Date(endDate).toLocaleDateString('en-BD', { day: '2-digit', month: '2-digit', year: 'numeric' })
    return `${start} - ${end}`
  }

  return (
    <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
          <span>Ref No <span className="font-semibold text-foreground">{tender.refNo}</span></span>
          <span>Type <span className="font-semibold text-foreground">{tender.type}</span></span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(tender.status)}`}>
          {tender.status}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-6">
          {tender.description}
        </p>
      </div>

      {/* Dates */}
      <div className="text-xs text-muted-foreground text-right">
        {formatDateRange(tender.publishingDate, tender.closingDate)}
      </div>
    </div>
  )
}