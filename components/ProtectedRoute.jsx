"use client"

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated, initialized } = useAuth()
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    // Only redirect after auth is initialized and we're sure user is not authenticated
    if (initialized && !loading && !isAuthenticated && !redirecting) {
      setRedirecting(true)
      router.push('/auth')
    }
  }, [loading, isAuthenticated, initialized, router, redirecting])

  // Show loading spinner while checking auth or redirecting
  if (loading || !initialized || redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return children
}

export default ProtectedRoute
