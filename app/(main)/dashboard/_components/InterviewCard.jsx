import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const InterviewCard = ({interview, viewDetail}) => {
    const url = process.env.NEXT_PUBLIC_APP_URL+'/'+interview?.interview_id

    const copyLink = () => {
        navigator.clipboard.writeText(url)
        toast.success('Link copied!')
    }

    const onSend = () => {
        window.location.href="mailto:account@anujsundola0.1@gmail.com?subject=AIRecruiter interview Link & body=interview Link:"+url
    }
  return (
    <div className='p-5 bg-white rounded-lg border'>
        <div className='flex items-center '>
            <div className='h-[40px] w-[40px] rounded-full bg-primary' />
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2> 
        </div>
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.duration}
            <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span>
        </h2>
        {!viewDetail ? 
        <div className='flex gap-3 w-full mt-5'>
            <Button variant={'outline'} onClick={() => copyLink()}><Send/> Copy Link</Button>
            <Button className={'w-full'} onClick={()=> onSend()}><Send/> Send</Button>
        </div>
        : 
        <Link href={`/scheduled-interview/${interview?.interview_id}/details`}>
        <Button className={'mt-5 w-full'} variant={'outline'}>View Details</Button>
        </Link>
        }
    </div>
  )
}

export default InterviewCard