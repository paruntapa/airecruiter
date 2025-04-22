"use client"
import React, { useState } from 'react'
import InterviewHeader from './_components/interviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

const Interviewlayout = ({children}) => {
    const [interviewInfo, setInterviewInfo] = useState()
  return (
    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
    <div className='bg-secondary h-screen'>
        <InterviewHeader />
        {children}
    </div>
    </InterviewDataContext.Provider>
  )
}

export default Interviewlayout 