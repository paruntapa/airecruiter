import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
  
const CandidateFeedbackDialog = ({candidate}) => {
    const feedback = candidate?.feedback?.feedback
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button variant='outline' className='text-primary'>
        View Feedback
        </Button></DialogTrigger>
    <DialogContent>
    <DialogHeader>
        <DialogTitle>Feedback</DialogTitle>
        <DialogDescription asChild>
            <div className='mt-5'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-5'>
                        <h2 className='text-2xl font-bold rounded-full p-3 text-white'>{candidate?.userName[0]}</h2>
                    <div>
                        <h2 className='font-bold'>{candidate?.userName}</h2>
                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                    </div>
                    </div>
                    <div className='flex gap-3 items-center'>   
                        <h2 className='text-primary font-bold text-2xl'>6/10</h2>
                    </div>
                </div>
                <div className='mt-5'>
                    <h2 className='font-bold'>Skills Assesment</h2>
                    <div className='mt-3 grid grid-cols-2 gap-5'>
                        <div>
                            <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                            <ProgressBar value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                        </div>
                        <div>
                            <h2 className='flex justify-between'>Communication Skills <span>{feedback?.rating?.communicationSkills}/10</span></h2>
                            <ProgressBar value={feedback?.rating?.communicationSkills*10} className='mt-1'/>
                        </div>
                        <div>
                            <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                            <ProgressBar value={feedback?.rating?.problemSolving*10} className='mt-1'/>
                        </div>
                        <div>
                            <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience}/10</span></h2>
                            <ProgressBar value={feedback?.rating?.experience*10} className='mt-1'/>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <h2 className='font-bold'>Performance Summary</h2>
                    <div className='mt-3 p-5 rounded-md bg-secondary my-3'>
                        {feedback?.summary?.map((summary, idx)=> (
                            <p key={idx} className='text-sm'>{summary}</p>
                        ))}
                    </div>
                </div>

                <div className={`p-5 mt-8 flex justify-between items-center ${feedback?.Recommendation == 'No' ? 'bg-red-500' : 'bg-green-500'} rounded-md`}>
                    <h2 className={`font-bold ${feedback?.Recommendation == 'No' ? 'text-red-500' : 'text-green-500'}`}>Recommendation</h2>
                    <p className={`${feedback?.Recommendation == 'No' ? 'text-red-500' : 'text-green-500'}`}>{feedback?.Recommendation}</p>
                </div>
                <Button className={`${feedback?.Recommendation == 'No' ? 'bg-red-700' : 'bg-green-700'}`}>Send Message</Button>
            </div>
        </DialogDescription>
    </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog