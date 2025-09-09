import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, CheckCheck, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const InterviewLink = ({ interview_Id, formData, origin }) => {

    const url = origin + '/interview/' + interview_Id
    
    const GetInterviewUrl = () => {
        return url;
    }

    const OnCopyLink = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
              } else {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select({preventScroll: true});
                document.execCommand('copy');
                textArea.remove();
              }
              toast.success('Link Copied');
        } catch (error) {
            toast.error('Failed to copy link')
        }
    }
  return (
    <div className='flex flex-col items-center justify-center gap-5 mt-5 bg-orange-100 rounded-xl p-5 border-2 border-primary'> 
        <CheckCheck className='text-primary-500 animate-pulse h-8 w-8' />
        <h2 className='font-bold text-lg'>Your AI Interview is Ready!</h2>
        <p>Share this link with your team members to start the interview</p>

        <div className='w-full p-7 mt-6 rounded-lg'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold'>Interview Link</h2>
                <h2 className='p-2 -x-2 text-primary bg-orange-50 rounded-xl'>Valid for 30 Days</h2>
            </div>
            <div className='mt-4 flex gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                    <Button onClick={()=> OnCopyLink()}> <Copy/> Copy Link</Button>
            </div>
            <hr className='my-5'/>

            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center '><Clock className='h-4 w-4'/>  {formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center '><List className='h-4 w-4'/>  10 Question</h2>
                {/* <h2 className='text-sm text-gray-500 flex gap-2 items-center '><Calenk className='h-4 w-4'/> 30 Min {formData?.duration}</h2> */}

            </div>

            <div className='mt-7 bg-white p-5 rounded-lg w-full '>
                <h2 className='font-bold'>Share Via</h2>
                <div className='flex gap-7 mt-2 justify-around'>
                    <Button variant={'outline'}><Mail/> Email</Button>
                    <Button variant={'outline'}><Mail/> Slack</Button>
                    <Button variant={'outline'}><Mail/> WhatApp</Button>
                </div>
            </div>

            <div className='justify-between flex gap-5 mt-6 w-full '>
                <Link href={'/dashboard'}>
                <Button> <ArrowLeft/> Back To Dashboard</Button>
                </Link>
                <Link href={'/dashboard/create-interview'}>
                <Button><Plus/> Create New Interview </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default InterviewLink