"use client"

import { UserDetailContext } from '@/context/UserDetailContext'
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'

const Provider = ({children}) => {
    const [user, setUsers ] = useState()

    useEffect(()=> {
        CreateNewUser()
    }, [])
    const CreateNewUser = () => {
        supabase.auth.getUser().then( async ({data: {user}})=> {
        let { data: Users, error } = await supabase
        .from('Users')
        .select("*")
        .eq('email', user?.email)

        console.log(Users)

        if(Users?.length === 0){
           const { data, error} = await supabase
            .from('Users')
            .insert([
                {
                    name:user?.user_metadata?.name,
                    email:user?.email,
                    picture:user?.user_metadata?.picture
                }
            ])
            setUsers(data)
            return;
        }
        setUsers(Users[0])
    })
    }
  return (
    <UserDetailContext.Provider value={{ user, setUsers }}>
    <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUser=()=> {
    const context = useContext(UserDetailContext)
    return context
}