'use client'

import { AdminSidebar } from './AdminSidebar'
import { AdminOverview } from './AdminOverview'

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AdminOverview />
        </div>
      </div>
    </div>
  )
}
