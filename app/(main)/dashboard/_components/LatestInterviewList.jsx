"use client"
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import React, { useState } from 'react'

const LatestInterviewList = () => {
    const [interviewList, setInterviewList] = useState([])
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>Latest Interviews</h2>

        <div>
            {interviewList?.length == 0 &&
            <div className='p-5 flex flex-col gap-3 items-center bg-white mt-1'>
                <Video className='h-10 w-10 text-primary' />
                <h2>You have no interviews yet</h2>

                <Button>
                 + Create New Interview
                </Button>
            </div>}
        </div>
    </div>
  )
}

export default LatestInterviewList