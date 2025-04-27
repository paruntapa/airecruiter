"use client"

import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidateList from "./_components/CandidateList";

function InterviewDetailPage() {
  const { interview_id } = useParams();
  const {user} = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);

  useEffect(() => {
    user&&GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await supabase
    .from('interviews')
    .select(`jobPosition, jobDescription, created_at, type, questionList, duration, interview_id, interview-feedback(userEmail,userName, feedback,created_at)`)
    .eq('userEmail', user?.email)
    .eq('interview_id', interview_id)

    setInterviewDetail(result?.data[0])
    console.log(result)

  }
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">
        <InterviewDetailContainer interviewDetail={interviewDetail}/>
        <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
      </h2>
    </div>
  )
}

export default InterviewDetailPage;
