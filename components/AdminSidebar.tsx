'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FolderKanban, MessageSquare, Settings, LogOut, PlusCircle } from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Create Project', href: '/admin/projects/create', icon: PlusCircle },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Create User', href: '/admin/users/create', icon: PlusCircle },
    { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-2">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-700 font-semibold'
                : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.name}</span>
          </Link>
        )
      })}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <button className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-left transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
