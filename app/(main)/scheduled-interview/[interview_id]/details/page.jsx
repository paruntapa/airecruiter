"use client"
import { useParams } from "next/navigation";

function InterviewDetailPage() {
  const { interview_id } = useParams();
  const GetInterviewDetails = async () => {

  }
  return <div>InterviewDetailPage</div>;
}

export default InterviewDetailPage;
