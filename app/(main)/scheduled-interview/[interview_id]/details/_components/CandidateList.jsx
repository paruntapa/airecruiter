import moment from 'moment'
import React from 'react'

const CandidateList = ({candidateList}) => {
  return (
    <div>
        <h2 className='font-bold my-5 text-gray-500'>Candidate {candidateList?.length}</h2>
        {candidateList?.map((candidate, idx)=> (
            <div key={idx} className='flex gap-3 justify-between rounded-lg p-3 bg-gray-100'>
                <div className='flex items-center gap-5'>
                <h2 className='text-2xl font-bold rounded-full p-3 text-white'>{candidate?.userName[0]}</h2>
                <div>
                    <h2 className='font-bold'>{candidate?.userName}</h2>
                    <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('MM DD yyyy')}</h2>
                </div>
                </div>
                <div className='flex gap-3 items-center'>   
                    <h2 className='text-green-600'>6/10</h2>
                <Button variant='outline' className='text-primary'>
                    View Feedback
                </Button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CandidateList