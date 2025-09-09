"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    let timeoutId = null

    // Set a timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Auth initialization timeout, setting loading to false')
        setLoading(false)
      }
    }, 10000) // 10 second timeout

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          if (isMounted) {
            setUser(null)
            setLoading(false)
            setInitialized(true)
          }
          return
        }

        if (isMounted) {
          setUser(session?.user ?? null)
          setLoading(false)
          setInitialized(true)
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error)
        if (isMounted) {
          setUser(null)
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    // Only set up listener after initial session is checked
    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!isMounted) return

          try {
            setUser(session?.user ?? null)
            
            // Redirect based on auth state
            if (event === 'SIGNED_OUT') {
              router.push('/auth')
            }
          } catch (error) {
            console.error('Error in auth state change:', error)
          }
          
          if (isMounted) {
            setLoading(false)
          }
        }
      )

      return subscription
    }

    // Initialize auth and set up listener
    initializeAuth().then(() => {
      if (isMounted) {
        const subscription = setupAuthListener()
        
        // Clean up function
        return () => {
          subscription?.unsubscribe()
        }
      }
    })

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [router])

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      }
    } catch (error) {
      console.error('Error in signOut:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    initialized,
    signOut,
    isAuthenticated: !!user && initialized
  }
}
