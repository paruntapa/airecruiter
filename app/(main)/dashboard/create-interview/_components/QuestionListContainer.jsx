import React from 'react'

const QuestionListContainer = ({ questionList }) => {
  return (
    <div>
         <h2 className='font-bold text-lg'>Genrated Interview Questions:</h2>
          <div className='p-5 border border-gray-300 rounded-2xl bg-white'> 
            {questionList.map((questionList, idx) => (
              <div key={idx} className='p-3 border mb-3 border-gray-200 rounded-2xl'>
                <h2 className='font-normal'>{questionList.question}</h2>
                <h2 className='text-sm text-primary'>Type: {questionList?.type}</h2>
              </div>
            ))}
          </div>
    </div>
  )
}

export default QuestionListContainer