import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon, LucideCookingPot } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

const QuestionList = ({formData, onCreateLink}) => {

  const [loading, setLoading] = useState(false)
  const [questionList, setQuestionList] = useState()
  const {user} = useUser()
  const [saveLoading, setSaveLoading] = useState(false)
    useEffect(()=> {
        if(formData) {
            GenerateQuestionList();
        }

    }, [formData])

    const GenerateQuestionList = async () => {
      setLoading(true)
      try {
        const result = await axios.post('/api/ai-model', {
          ...formData
        })
        const content = result.data.content
        const FINAL_CONTENT = content.replace( '```json', '').replace('```', '')
        setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions)
        setLoading(false)
      } catch (error) {
        toast('Server Error')
        setLoading(false)
      } 
        
    }

    const onFinish = async () => {
      setSaveLoading(true)
      const interview_id = uuidv4()
      const { data, error } = await supabase
      .from('interviews')
      .insert([
        { 
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id
        },
      ])
      .select()


      const userUpdate= await supabase
      .from('Users')
      .update({ credits: Number(user?.credits) - 1 })
      .eq('email', user?.email)
      .select()
          
      console.log(userUpdate)

      setSaveLoading(false)
      
      onCreateLink(interview_id)   
    }
  return (
    <div>
      {
        loading && 
        <div className='bg-orange-100 rounded-xl p-5 border-2 border-primary flex gap-5 items-center'>
          <Loader2Icon className='animate-spin h-8 w-8 text-primary-500' />
            <div>
              <h2 className='font-medium '>Generating Questions...</h2>
              <p className='flex text-primary'>Our AI is Cooking <LucideCookingPot className='animate-bounce h-6 w-6 text-primary-500' /></p> 
            </div>
        </div>
      }
      {questionList?.length > 0 && 
      <div>
         <QuestionListContainer questionList={questionList}/>
      </div>
      }

      <div className='flex gap-5 justify-end mt-5'>
        <Button onClick={()=> onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2 className='animate-spin'/>} 
          Create Interview Link & Finish 
          </Button>
      </div>
    </div>
  )
}

export default QuestionList