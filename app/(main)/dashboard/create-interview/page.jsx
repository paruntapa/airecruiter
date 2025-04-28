"use client"
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormContainer from './_components/FormContainer'
import { toast } from 'sonner'
import QuestionList from './_components/QuestionList'
import InterviewLink from './_components/InterviewLink'
import { useUser } from '@/app/provider'

const CreateInterview = () => {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formdata, setFormdata] = useState({})
    const [interviewId, setInterviewId] = useState()
    const { user } = useUser();
    const onHandleInputChange = (field, value) => {
      setFormdata(prev => ({...prev, [field]: value}))

      console.log(formdata)
    }

    useEffect(() => {
      const origin = window.location.origin;
      console.log('Client URL:', origin);
    }, []);

    const onGoToNext = () => {
      if(user?.credits <= 0){
        toast.error('You have no credits left', {
          duration: 3000,
          position: 'top-right',
          icon: '🚨',
          })
        return;
      }
        if(!formdata?.jobPosition|| !formdata?.jobDescription || !formdata?.duration || !formdata?.type){
          console.log('first')
          toast('Please fill all the fields')
          return;
        }
        setStep(step + 1)
    }

    const onCreateLink = (interview_id) => {
      setInterviewId(interview_id)
      setStep(step + 1);
    }
  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=> router.back()} className='text-primary cursor-pointer' />
            <h2 className='font-bold text-2xl mb-1'>Create New Interview</h2>
        </div>
        <Progress value={step * 33.33}  className='my-5'/>
        {step ==1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={()=> onGoToNext()}/>
        : step == 2 ? <QuestionList formData={formdata} onCreateLink={(interview_id) => onCreateLink(interview_id)}/> 
        : step === 3 ? <InterviewLink  interview_Id={interviewId} origin={origin} formData={formdata} /> : null}
    </div>
  )
}

export default CreateInterview