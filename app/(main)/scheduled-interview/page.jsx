"use client"
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react'
import React from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'

const ScheduleInterview = () => {
    const {user} = useUser()
    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
      user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        const result = await supabase
        .from('interviews')
        .select('jobPosition, duration, interview_id, interview-feedback(userEmail)')
        .eq('userEmail', user?.email)
        .order('id', { ascending: false })

        setInterviewList(result.data)
    }

  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>Interview List with candidate feedback</h2>
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
            <InterviewCard 
            key={index} 
            interview={interview} 
            viewDetail={true}
            />
            ))
        }
        </div>
        )}
    </div>
  )
}

export default ScheduleInterview