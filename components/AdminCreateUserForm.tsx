'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/index'
import { User as UserIcon, Mail, Lock, Shield, CheckCircle, Ban, Building, ArrowLeft } from 'lucide-react'

interface AdminCreateUserFormProps {
  onUserCreated: (newUser: User) => void;
}

export function AdminCreateUserForm({ onUserCreated }: AdminCreateUserFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<User['role']>('citizen')
  const [status, setStatus] = useState<User['status']>('active')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !email || !password) {
      setError('Please fill in all required fields.')
      return
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    // Simulate user ID generation
    const newUserId = `u${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const newUser: User = {
      id: newUserId,
      name,
      email,
      role,
      status,
      registeredAt: now,
      lastLogin: now, // Assuming first login is at registration
    }

    console.log('Creating new user:', newUser)
    onUserCreated(newUser) // Call the callback to add the user to the list
    router.push('/admin/users') // Redirect back to the user list
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 mr-3">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <UserIcon className="w-4 h-4 inline mr-1" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            <Lock className="w-4 h-4 inline mr-1" />
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            <Shield className="w-4 h-4 inline mr-1" />
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as User['role'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="citizen">Citizen</option>
            <option value="local-authority">Local Authority</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as User['status'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  )
}
