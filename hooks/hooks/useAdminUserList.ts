'use client'

import { useState, useEffect } from 'react'
import { User } from '@/types/index'

// Sample data - moved here to be managed by the hook
const initialSampleUsers: User[] = [
  {
    id: 'u1',
    name: 'Aisha Rahman',
    email: 'aisha.rahman@example.com',
    role: 'admin',
    status: 'active',
    registeredAt: '2023-01-15T10:00:00Z',
    lastLogin: '2024-12-19T14:30:00Z',
  },
  {
    id: 'u2',
    name: 'Jamal Hossain',
    email: 'jamal.hossain@example.com',
    role: 'citizen',
    status: 'active',
    registeredAt: '2023-03-20T11:30:00Z',
    lastLogin: '2024-12-18T09:15:00Z',
  },
  {
    id: 'u3',
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@example.com',
    role: 'moderator',
    status: 'active',
    registeredAt: '2023-05-01T08:00:00Z',
    lastLogin: '2024-12-19T10:00:00Z',
  },
  {
    id: 'u4',
    name: 'Khalid Mahmud',
    email: 'khalid.mahmud@example.com',
    role: 'citizen',
    status: 'suspended',
    registeredAt: '2023-02-10T16:00:00Z',
    lastLogin: '2024-11-01T12:00:00Z',
  },
  {
    id: 'u5',
    name: 'Sara Islam',
    email: 'sara.islam@example.com',
    role: 'citizen',
    status: 'active',
    registeredAt: '2024-01-05T09:00:00Z',
    lastLogin: '2024-12-19T11:00:00Z',
  },
  {
    id: 'u6',
    name: 'Rahim Uddin',
    email: 'rahim.uddin@example.com',
    role: 'local-authority',
    status: 'active',
    registeredAt: '2024-02-20T13:00:00Z',
    lastLogin: '2024-12-19T15:00:00Z',
  },
]

export default function useAdminUserList() {
  const [users, setUsers] = useState<User[]>(initialSampleUsers)

  const addUser = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, newUser])
  }

  const deleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
  }

  // In a real application, you might fetch users here
  // useEffect(() => {
  //   // fetch users from API
  // }, [])

  return { users, addUser, deleteUser, setUsers }
}
