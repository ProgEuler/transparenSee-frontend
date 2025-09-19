'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdminSidebar } from '@/components/AdminSidebar'
import { AdminCreateUserForm } from '@/components/AdminCreateUserForm'
import useAdminUserList from '@/hooks/hooks/useAdminUserList'

export default function AdminCreateUserPage() {
  const { addUser } = useAdminUserList() // Use the hook to get addUser function

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AdminCreateUserForm onUserCreated={addUser} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
