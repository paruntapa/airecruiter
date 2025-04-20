"use client"
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import { toast } from 'sonner'
import QuestionList from './_components/QuestionList'

const CreateInterview = () => {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formdata, setFormdata] = useState({})
    const onHandleInputChange = (field, value) => {
      setFormdata(prev => ({...prev, [field]: value}))

      console.log(formdata)
    }

    const onGoToNext = () => {
        if(!formdata?.jobPosition|| !formdata?.jobDescription || !formdata?.duration || !formdata?.type){
          console.log('first')
          toast('Please fill all the fields')
          return;
        }
        setStep(step + 1)
    }
  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=> router.back()} className='text-primary cursor-pointer' />
            <h2 className='font-bold text-2xl mb-1'>Create New Interview</h2>
        </div>
        <Progress value={step * 33.33}  className='my-5'/>
        {step ==1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={()=> onGoToNext()}/>
        : step == 2 ? <QuestionList formData={formdata}/> : null}
    </div>
  )
}

export default CreateInterview