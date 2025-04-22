"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image'
import React from 'react'

const WelcomeContainer = () => {
    const { user } = useUser()
  return (
    <div className='bg-white p-5 rounded-xl flex justify-between'>
      <div > 
        <h2 className='text-lg font-bold'>{user ? `Welcome Back, ${user?.name}!`: 'Welcome Back!' }</h2>
        <h2 className='text-gray-500'>AI-Engineered, Hiring Hood</h2>
      </div>
      {user ? <Image src={user?.picture} alt='user' draggable={false} className='rounded-4xl' width={50} height={50} />  : null}
    </div>
  )
}

export default WelcomeContainer