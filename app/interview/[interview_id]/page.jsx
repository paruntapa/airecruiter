"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/services/supabaseClient'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const Interview = () => {

  const {interview_id} = useParams()
  const [interviewData, setInterviewData] = useState({})
  const [loading, setLoading ] = useState(false)
  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const { setInterviewInfo } = useContext(InterviewDataContext)
  const router = useRouter()

  useEffect(() => {
    console.log(interview_id, "interview_id")
    interview_id && GetInterviewDetails()
  }, [interview_id])

  const GetInterviewDetails = async () => {
    console.log(supabase, "supabase")
    setLoading(true)
    try {
      let { data: interview, error } = await supabase
      .from('interviews')
      .select('jobPosition, jobDescription, duration, type')
      .eq('interview_id', interview_id)
      console.log(error, "error")

      setInterviewData(interview[0])  
      if(interview.length === 0) {
        toast.error('Invalid interview link')
        setLoading(false)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error, "Error while getting data from DB")
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onJoinInterview = async () => {
    setLoading(true)
    let {data: interview, error} = await supabase
    .from('interviews')
    .select('*')
    .eq('interview_id', interview_id)
    console.log(error, "error")
    console.log(interview, "interview")

    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: interview[0],
    })

    router.push(`/interview/${interview_id}/start`) 

    setLoading(false)

  }

  return (
    <div className='px-10 md:px-28 lg:px-32 xl:px-64 mt-16 '>
      <div className='flex flex-col border rounded-lg p-7 bg-white items-center'>
        <h2 className='mt-3'>AI Recruitor</h2>

        <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-gray-400'><Clock className='h-4 w-4 inline-block' /> {interviewData?.duration} min</h2>

        <div className='w-[300px] mt-6'>
          <h2 className='font-medium'>Enter your full Name</h2>
          <Input type='text' placeholder='e.g. John Doe' onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='w-[300px] mt-6'>
          <h2 className='font-medium'>Enter your Email</h2>
          <Input type='text' placeholder='e.g. John@gmail.com' onChange={(e) => setUserEmail(e.target.value)} />
        </div>

        <div className='p-3 bg-orange-100 flex gap-4 rounded-xl mt-6'>
          <Info className='text-primary'/>
          <div>
            <h2 className='font-bold'>Begin you begin</h2>
              <ul className='text-sm text-primary'>
                <li>- Test your camera and microphone</li>
                <li>- Ensure you have a stable internet connection</li>
                <li>- Find a Quit place for interview</li>
              </ul>
          </div>
        </div>

        <Button
        disabled={loading || !userName}
        onClick={() => onJoinInterview()}
        className='mt-6 font-bold'><Video className='h-4 w-4' /> {loading && <Loader2Icon className='animate-spin'/>} Start Interview</Button>
        {console.log(loading, userName)} 
      </div>
    </div>
  )
}

export default Interview