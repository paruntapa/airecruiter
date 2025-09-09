"use client"
import React, { useState } from 'react'
import InterviewHeader from './_components/interviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import ProtectedRoute from '@/components/ProtectedRoute'

const Interviewlayout = ({children}) => {
    const [interviewInfo, setInterviewInfo] = useState()
    return (
      <ProtectedRoute>
        <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
        <div className='bg-secondary h-screen'>
            <InterviewHeader />
            {children}
        </div>
        </InterviewDataContext.Provider>
      </ProtectedRoute>
    )
}

export default Interviewlayout 