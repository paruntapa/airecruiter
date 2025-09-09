"use client"

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/app/provider'

// Only show this in development or when debugging is needed
const AuthDebug = () => {
  const authState = useAuth()
  const userState = useUser()

  // Only render in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs opacity-80">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <div>Auth Loading: {authState.loading ? 'true' : 'false'}</div>
        <div>Auth Initialized: {authState.initialized ? 'true' : 'false'}</div>
        <div>Is Authenticated: {authState.isAuthenticated ? 'true' : 'false'}</div>
        <div>Auth User: {authState.user ? 'Yes' : 'No'}</div>
        <div>DB User: {userState.user ? 'Yes' : 'No'}</div>
        <div>User Loading: {userState.loading ? 'true' : 'false'}</div>
        {authState.user && (
          <div>Email: {authState.user.email}</div>
        )}
      </div>
    </div>
  )
}

export default AuthDebug
