"use client"
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'

const page = () => {
    const [interviewList, setInterviewList] = useState([])
    const {user} = useUser()
    console.log(user)

    useEffect(() => {
      user && GetInterviewList();
    }, [user])
    const GetInterviewList = async () => {
      let { data: interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })
      .limit(6)

      console.log(interviews)
    }

   
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
            {interviewList && (
              <div className='grid grid-cols-2 mt-5 lg:grid-cols-3 gap-5'>
              {
                interviewList.map((interview, index) => (
                  <InterviewCard key={index} interview={interview} />
                ))
              }
              </div>
            )}
        </div>
    </div>
  )
}

export default page