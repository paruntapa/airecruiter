"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './_components/AlertConfirmation';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import VapiDebug from '@/components/VapiDebug';

const StartInterview = () => {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext)
  const [vapi, setVapi] = useState(null)
  const [vapiError, setVapiError] = useState(null)
  const [activeUser, setActiveUser] = useState(false)
  const [conversation, setConversation] = useState()
  const {interview_id} = useParams();
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Initialize VAPI client
  useEffect(() => {
    const initializeVapi = () => {
      try {
        const vapiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
        
        if (!vapiKey) {
          const errorMsg = 'VAPI public key is not configured. Please check your environment variables.';
          console.error(errorMsg);
          setVapiError(errorMsg);
          toast.error('Configuration error: Missing VAPI key');
          return;
        }

        console.log('Initializing VAPI with key:', vapiKey ? 'Key present' : 'Key missing');
        const vapiClient = new Vapi(vapiKey);
        setVapi(vapiClient);
        setVapiError(null);
        console.log('VAPI client initialized successfully');
      } catch (error) {
        const errorMsg = `Failed to initialize VAPI: ${error.message}`;
        console.error(errorMsg, error);
        setVapiError(errorMsg);
        toast.error('Failed to initialize voice service');
      }
    };

    initializeVapi();
  }, []);

  useEffect(() => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
  
    function updateTimer() {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
  
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      const timerElement = document.getElementById('timer');
      if (timerElement) {
        timerElement.textContent = formattedTime;
      }
    }
  
    const intervalId = setInterval(updateTimer, 1000);  // start timer
  
    return () => {
      clearInterval(intervalId); // clear timer when component unmounts
    }
  }, []);

  

  useEffect(()=> {
    if (interviewInfo && vapi && !vapiError) {
      startCall();
    } else if (interviewInfo && vapiError) {
      toast.error('Cannot start interview: Voice service unavailable');
    }
  }, [interviewInfo, vapi, vapiError])

  const startCall = () => {
    if (!vapi) {
      toast.error('Voice service not initialized');
      return;
    }

    try {
      const questionList = interviewInfo?.interviewData?.questionList?.map(
        (q) => q.question
      ) || [];
      console.log('Starting call with questions:', questionList);

      const assistantOptions = {
        name: "AI Recruiter",
        firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`, 
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai", 
          model: "gpt-4", 
          messages: [{
            role: "system", 
            content:`
            You are an AI voice assistant conducting interviews.
            Your job is to ask candidates provided interview questions, assess their responses.
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
            "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
            Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
            Questions: ${questionList}
            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
            "Need a hint? Think about how React tracks component updates!"
            Provide brief, encouraging feedback after each answer. Example:
            "Nice! That's a solid answer."
            "Hmm, not quite! Want to try again?"
            Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!" After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
            "That was great! You handled some tough questions well. Keep sharpening your skills!"
            End on a positive note:
            "Thanks for chatting! Hope to see you crushing projects soon!"
            Key Guidelines:
            Be friendly, engaging, and witty
            Keep responses short and natural, like a real conversation
            Adapt based on the candidate's confidence level
            Ensure the interview remains focused on React`
            .trim(),
          }],
        },
      }
      
      console.log('Starting VAPI call with options:', assistantOptions);
      vapi.start(assistantOptions);
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error(`Failed to start interview: ${error.message}`);
    }
  }

  const stopInterview = () => {
    if (!vapi) {
      toast.error('Voice service not available');
      return;
    }
    
    try {
      vapi.stop();
      generateFeedback();
    } catch (error) {
      console.error('Error stopping interview:', error);
      toast.error('Error stopping interview');
      // Still try to generate feedback
      generateFeedback();
    }
  }

  useEffect(() => {
    if (!vapi) return;

    const handleMessage = (msg) => {
      console.log('VAPI message:', msg)
      if (msg?.conversation) {
        const convoString = JSON.stringify(msg?.conversation)
        setConversation(convoString)
      }
    }
  
    const handleCallStart = () => {
      console.log('Call has started')
      toast.success('Call Connected...')
    }
  
    const handleSpeechStart = () => {
      console.log('Assistant speech has started')
      setActiveUser(false)
    }
  
    const handleCallEnd = () => {
      console.log('Call has ended.')
      toast.success('Interview Ended. Please wait while we generate your feedback.')
      generateFeedback();
    }

    const handleSpeechEnd = () => {
      console.log('Assistant speech has ended')
      setActiveUser(true)
    }

    const handleError = (error) => {
      console.error('VAPI error:', error)
      toast.error(`Voice service error: ${error.message || 'Unknown error'}`)
    }
  
    try {
      vapi.on("message", handleMessage);
      vapi.on("call-start", handleCallStart);
      vapi.on("speech-start", handleSpeechStart);
      vapi.on("speech-end", handleSpeechEnd);  
      vapi.on("call-end", handleCallEnd);
      vapi.on("error", handleError);
    } catch (error) {
      console.error('Error setting up VAPI listeners:', error);
    }
  
    return () => {
      if (vapi) {
        try {
          console.log('Cleaning up Vapi listeners...');
          vapi.off("message", handleMessage);
          vapi.off("call-start", handleCallStart);
          vapi.off("speech-start", handleSpeechStart);
          vapi.off("speech-end", handleSpeechEnd);  
          vapi.off("call-end", handleCallEnd);
          vapi.off("error", handleError);
        } catch (error) {
          console.error('Error cleaning up VAPI listeners:', error);
        }
      }
    }
  }, [vapi]);

  const generateFeedback = async () => {
    setLoading(true)
   
    const result = await axios.post('api/ai-feedback', {
      conversation: conversation
    })
    console.log(result?.data)
    const content = result.data.content;
    const FINAL_CONTENT = content.replace('```json', '').replace('```', '')
    
    const {data, error } = await supabase
    .from('interview-feedback')
    .insert([
      {
       userName: interviewInfo?.userName, 
       userEmail: interviewInfo?.userEmail,
       interview_id: interview_id,
       feedback: JSON.parse(FINAL_CONTENT),
       recommended: false,
      }
    ])
    .select()
    setLoading(false)
    router.replace('/interview/'+interview_id+'/completed')
  }

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
        <span id="timer" className='flex gap-2 items-center'>
          <Timer/>
          00:00:00
        </span>
      </h2>

      {/* VAPI Status Indicator */}
      {vapiError && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4'>
          <p className='font-bold'>Voice Service Error</p>
          <p className='text-sm'>{vapiError}</p>
          <p className='text-sm mt-1'>Please check your configuration and try again.</p>
        </div>
      )}

      {!vapi && !vapiError && (
        <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-4'>
          <p className='text-sm'>Initializing voice service...</p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white p-20 rounded-lg border flex-col gap-3 flex items-center justify-center'>
          <h2 className='font-bold relative'>
          {!activeUser && <span className='inset-0 absolute rounded-full bg-orange-500 opacity-75 animate-ping'/>}
            Interviewer
          </h2>
          <h2>
            AI Recruiter
          </h2>
        </div>
        <div className='bg-white p-20 rounded-lg border flex flex-col gap-3 items-center  justify-center'>
          <h2 className='text-2xl bg-primary text-white p-3 px-5 rounded-full relative'>
            {!activeUser && <span className='inset-0 absolute rounded-full bg-orange-500 opacity-75 animate-ping'/>}
            {interviewInfo?.userName[0].toUpperCase()}
            </h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-10'>
        <Mic className='h-12 w-12 p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full cursor-pointer'/>
        <AlertConfirmation  stopInterview={() => stopInterview()}>
        {!loading ? <Phone className='h-12 w-12 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer'/>
        : <Loader2Icon className='animate-spin h-12 w-12 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer'/>}
        </AlertConfirmation>
      </div>
      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview is in Progress...</h2>
      <VapiDebug />
    </div>
  )
}

export default StartInterview