'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdminDashboard } from '@/components/AdminDashboard'

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <AdminDashboard />
      </div>
      <Footer />
    </main>
  )
}
