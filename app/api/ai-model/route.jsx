import { QUESTION_PROMPT } from "@/services/Constant";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {

const { jobPosition, jobDescription, duration, type } = await request.json();
const FINAL_PROMPT = QUESTION_PROMPT
.replace('{{jobTitle}}', jobPosition)
.replace('{{jobDescription}}', jobDescription)
.replace('{{duration}}', duration)
.replace('{{type}}', type)


try {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey:  process.env.OPENROUTER_API_KEY,
      })
    
    const completion = await openai.chat.completions.create({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "user", content: FINAL_PROMPT }
        ],
    })
    
    return NextResponse.json(completion.choices[0].message)
} catch (error) {
    console.log(error)
    return NextResponse.json(error)
}
    

}