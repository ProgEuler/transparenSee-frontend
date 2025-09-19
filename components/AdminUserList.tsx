'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User as UserIcon, Search, Mail, Shield, Clock, CheckCircle, Ban, Edit, Trash2, AlertTriangle, Building, PlusCircle } from 'lucide-react'
import { User } from '@/types/index'
import useAdminUserList from '@/hooks/hooks/useAdminUserList'

export function AdminUserList() {
  const { users, deleteUser, setUsers } = useAdminUserList() // Use the hook to get users and deleteUser
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'moderator' | 'citizen' | 'local-authority'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all')

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'admin': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><Shield className="w-3 h-3 mr-1" />Admin</span>
      case 'moderator': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Shield className="w-3 h-3 mr-1" />Moderator</span>
      case 'citizen': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><UserIcon className="w-3 h-3 mr-1" />Citizen</span>
      case 'local-authority': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Building className="w-3 h-3 mr-1" />Local Authority</span>
    }
  }

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</span>
      case 'suspended': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><Ban className="w-3 h-3 mr-1" />Suspended</span>
    }
  }

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId)
    // Implement edit logic (e.g., open a modal or navigate to edit page)
  }

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId) // Use the deleteUser function from the hook
      console.log('Delete user:', userId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as typeof filterRole)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="citizen">Citizen</option>
            <option value="local-authority">Local Authority</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <Link href="/admin/users/create" className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium whitespace-nowrap">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create User
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.registeredAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-gray-400" />
                    </div>
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
