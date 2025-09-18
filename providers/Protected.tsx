"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface ProtectedProps {
  children: ReactNode
  role?: string | string[] // single role or multiple roles allowed
  redirectTo?: string
}

export default function Protected({
  children,
  role,
  redirectTo = "/login"
}: ProtectedProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push(redirectTo)
      return
    }

    if (role) {
      const allowedRoles = Array.isArray(role) ? role : [role]
      if (!allowedRoles.includes(session?.user?.role)) {
        router.push("/unauthorized") // optional
      }
    }
  }, [status, session, role, router, redirectTo])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
