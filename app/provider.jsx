"use client"

import { UserDetailContext } from '@/context/UserDetailContext'
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'

const Provider = ({children}) => {
    const [user, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    await createOrGetUser(session.user)
                } else {
                    setUsers(null)
                }
                setLoading(false)
            }
        )

        // Get initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                await createOrGetUser(session.user)
            }
            setLoading(false)
        }

        getInitialSession()

        return () => subscription.unsubscribe()
    }, [])

    const createOrGetUser = async (authUser) => {
        try {
            // Check if user exists in database
            const { data: existingUsers, error: fetchError } = await supabase
                .from('Users')
                .select("*")
                .eq('email', authUser.email)

            if (fetchError) {
                console.error('Error fetching user:', fetchError)
                return
            }

            if (existingUsers?.length === 0) {
                // Create new user in database
                const { data: newUser, error: insertError } = await supabase
                    .from('Users')
                    .insert([
                        {
                            name: authUser.user_metadata?.name || authUser.email,
                            email: authUser.email,
                            picture: authUser.user_metadata?.picture || null
                        }
                    ])
                    .select()
                    .single()

                if (insertError) {
                    console.error('Error creating user:', insertError)
                    return
                }

                setUsers(newUser)
            } else {
                setUsers(existingUsers[0])
            }
        } catch (error) {
            console.error('Error in createOrGetUser:', error)
        }
    }

    return (
        <UserDetailContext.Provider value={{ user, setUsers, loading }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider

export const useUser=()=> {
    const context = useContext(UserDetailContext)
    return context
}