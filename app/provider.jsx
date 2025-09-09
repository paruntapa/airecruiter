"use client"

import { UserDetailContext } from '@/context/UserDetailContext'
import { supabase } from '@/services/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import React, { useContext, useEffect, useState } from 'react'

const Provider = ({children}) => {
    const [user, setUsers] = useState(null)
    const [userLoading, setUserLoading] = useState(false)
    const { user: authUser, isAuthenticated, initialized } = useAuth()

    useEffect(() => {
        if (initialized && isAuthenticated && authUser) {
            createOrGetUser(authUser)
        } else if (initialized && !isAuthenticated) {
            setUsers(null)
            setUserLoading(false)
        }
    }, [authUser, isAuthenticated, initialized])

    const createOrGetUser = async (authUser) => {
        if (!authUser?.email) return
        
        setUserLoading(true)
        try {
            // Check if user exists in database
            const { data: existingUsers, error: fetchError } = await supabase
                .from('Users')
                .select("*")
                .eq('email', authUser.email)

            if (fetchError) {
                console.error('Error fetching user:', fetchError)
                setUserLoading(false)
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
                    setUserLoading(false)
                    return
                }

                setUsers(newUser)
            } else {
                setUsers(existingUsers[0])
            }
        } catch (error) {
            console.error('Error in createOrGetUser:', error)
        } finally {
            setUserLoading(false)
        }
    }

    return (
        <UserDetailContext.Provider value={{ 
            user, 
            setUsers, 
            loading: userLoading,
            authUser,
            isAuthenticated 
        }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider

export const useUser=()=> {
    const context = useContext(UserDetailContext)
    return context
}