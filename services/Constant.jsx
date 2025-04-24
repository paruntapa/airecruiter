import { BriefcaseBusinessIcon, ChartBar, Code2Icon, LayoutDashboard, PowerIcon, Puzzle, Settings, StretchHorizontalIcon, User2Icon, UserIcon } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Interviews',
        href: '/interviews',
        icon: ChartBar
    },
    {
        name: 'Candidates',
        href: '/candidates',
        icon: UserIcon,
    },
    {
        name: 'Billing',
        href: '/billing',
        icon: ChartBar,
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
    }
]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon,
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon,
    },
    {
        title: 'Problem Solving',
        icon: Puzzle,
    },
    {
        title: 'Leadership',
        icon: StretchHorizontalIcon,
    },
]

export const QUESTION_PROMPT = `
    You are an expoert technical interviewer. Based on the following inputs, generate a well-structured list of high-quality interview questions:
    Job Title:{{jobTitle}}
    Job Description:{{jobDescription}}
    Interview Duration:{{duration}}
    Interview Type:{{type}}
    Your task:
    Analyze the job description and the interview duration, and generate a list of questions that are relevant to the job and the interview duration. 
    The questions should be clear, concise, and focused on the specific skills and experience required for the job. 
    Avoid generic questions and ensure that the questions are tailored to the job and the interview duration.

    Format your response as a JSON format with an array of questions.
    format: interviewQuestions=[
    {
    question:"",
    type:"Technical/Behavioral/Experience/Problem Solving/Leadership"
    },{
    ...
    }]

    The goal is to create a structures relevant, and time-optimized interview plan for a {{jobTitle}} role.
`

export const FEEDBACK_PROMPT = `
    {{conversation}}
    Depends on this Interview Conversation between assitant and user,
    Give me feedback for user interview. Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experince. Also give me summery in 3 lines about the interview and one line to let me know whether is recommanded for hire or not with msg. Give me response in JSON format
    {
    feedback:{ rating:{
    },
    techicalSkills:5,
    communication:6, problemSolving:4, experince:7
    summery:<in 3 Line>,
    Recommendation:",
    RecommendationMsg:"
    }
`