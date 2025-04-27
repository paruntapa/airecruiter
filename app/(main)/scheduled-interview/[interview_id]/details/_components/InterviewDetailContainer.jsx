import moment from 'moment'
import React from 'react'

const InterviewDetailContainer = ({interviewDetail}) => {
  return (
    <div className='mt-5 bg-white rounded-lg p-5'>
        <h2>{interviewDetail?.jobPosition}</h2>

        <div className='mt-4 flex justify-between items-center lg:pr-52'>
            <div>
                <h2 className='text-sm text-gray-500'>Duration</h2>
                <h2 className='flex text-md font-bold items-center gap-2'><Clock className='w-4 h-4'/> {interviewDetail?.duration}</h2>
            </div>
            <div>
                <h2 className='text-sm text-gray-500'>Created On</h2>
                <h2 className='flex text-md font-bold items-center gap-2'><Clock className='w-4 h-4'/> {moment(interviewDetail?.created_at).format('MMM DD, yyyy')}</h2>
            </div>
            {interviewDetail?.type &&<div>
                <h2 className='text-sm text-gray-500'>Type</h2>
                <h2 className='flex text-md font-bold items-center gap-2'><Clock className='w-4 h-4'/> {JSON.parse(interviewDetail?.type)[0]}</h2>
            </div>}
        </div>
        <div className='mt-5'>
            <h2 className='font-bold'>Job Description</h2>
            <p className='text-sm text-gray-500 leading-6'>{interviewDetail?.jobDescription}</p>
        </div>

        <div className='mt-5'>
            <h2 className='font-bold'>Interview Questions</h2>
            <div className='grid grid-cols-2 mt-3 gap-3'>
                {interviewDetail?.questionList.map((items, idx)=> (
                    <h2 className='text-xs'>{idx+1}.{items?.question}</h2>
                ))}
            </div>
        </div>
    </div>
  )
}

export default InterviewDetailContainer