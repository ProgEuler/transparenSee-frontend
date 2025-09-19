"use client"

import { useEffect, useState } from "react"
import { Project } from "@/types"
import { AdminProjectTable } from "@/components/AdminProjectTable"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`)
        console.log(res.json())
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.statusText}`)
        }
        const data = await res.json()
        setProjects(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>
      <AdminProjectTable projects={projects} setProjects={setProjects} />
    </div>
  )
}
