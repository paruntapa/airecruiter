import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React, { useEffect, useState } from 'react'
import { InterviewType } from '@/services/Constant'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const FormContainer = ({onHandleInputChange, GoToNext}) => {

    const [interviewType, setInterviewType] = useState([]);

    useEffect(()=>{
        if(interviewType) {
            onHandleInputChange('type', interviewType)
        }
    }, [interviewType])

    const AddInterviewType = (type) => {

        const data = interviewType.includes(type);
        if(!data){
            setInterviewType(prev => [...prev, type])
        } else {
            const result = interviewType.filter(t => t !== type)
            setInterviewType(result)
        }
    }

  return (
    <div className='bg-white p-5 rounded-2xl'>
        <div>
            <h2 className='text-sm font-medium'> Job Position</h2>
            <Input 
            placeholder='e.g. Full Stack Developer' 
            className='mt-2' 
            onChange={(e)=> onHandleInputChange('jobPosition', e.target.value)}
            />
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium'> Job Description</h2>
            <Textarea 
            placeholder='Enter Job Description' 
            className='mt-2 h-[200px]' 
            onChange={(e)=> onHandleInputChange('jobDescription', e.target.value)}
            />
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium'> Job Duration</h2>
            <Select onValueChange={(value)=> onHandleInputChange('duration', value)} className='mt-2'>
            <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="15">15 Min</SelectItem>
                <SelectItem value="30">30 Min</SelectItem>
                <SelectItem value="45">45 Min</SelectItem>
                <SelectItem value="60">60 Min</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Type</h2>
        </div>
        <div className='flex flex-wrap gap-2 mt-2'> 
            {InterviewType.map((t, idx)=> (
                <div 
                key={idx} 
                className={`flex gap-2 cursor-pointer border border-gray-300 hover:bg-secondary items-center p-1 bg-white rounded-2xl px-2 ${interviewType.includes(t.title) && 'bg-orange-400 text-primary'}`}
                onClick={()=> AddInterviewType(t.title)}
                >
                    <t.icon className=''/>
                    <span>{t.title}</span>
                </div>
            ))}
        </div>

        <div className='flex justify-end mt-5' onClick={()=> GoToNext()}>
        <Button>
            Generate Questions <ArrowRight className='ml-2'/>
        </Button>
        </div>
    </div>
  )
}

export default FormContainer