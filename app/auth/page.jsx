"use client"

import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Login = () => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (!loading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [loading, isAuthenticated, router])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) {
      console.error(error.message)
    }
  }

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Don't show login form if already authenticated
  if (isAuthenticated) {
    return null
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center text-center border rounded-2xl p-8'>
        AI Recruiter
        <div>
          Login to your account
          
          <h2 className='text-2xl font-bold text-center'>Welcome to AI Recruiter</h2>
          <p className='text-gray-500 text-center'>Login to your account to access your dashboard</p>
          <Button className='mt-7' onClick={signInWithGoogle}>Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login