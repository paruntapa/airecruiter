"use client"

import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import React from 'react'

const Login = () => {

  const signInWithGoogle = async () => {
    const {error} = await supabase.auth.signInWithOAuth({provider:'google'})
    if(error){
      console.error(error.message)
    }
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