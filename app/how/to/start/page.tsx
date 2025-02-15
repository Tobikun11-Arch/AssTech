import React, { useEffect, useState } from 'react'
import CareerSelector from '@/app/components/how-to-start/career_choice'
import SpecializationSelector from '@/app/components/how-to-start/specialization'
import CommitSelector from '@/app/components/how-to-start/commitDaily'
import ChallengeSelector from '@/app/components/how-to-start/challengeDuration'
import { CareerType, CodingSpecialization, NonCodingSpecialization, DailyTimeCommitment, ChallengeDuration } from '@/app/Interface/Select'
import { useHowToStart } from '@/app/state/howSelector'

export default function Page() {
    const { careerStack, specialization, time, challengeDays } = useHowToStart()
    const [ parsedData, setParsedData ] = useState<any | null>(null);
    const [ generate, setGenerate ] = useState<boolean>(false)
    const [ challengeTitle, setTitle ] = useState<string>('');
    const [ dailyTasks, setDailyTasks ] = useState<{ day: number; task: string }[]>([]);
    const [ outcomes, setOutcomets ] = useState<string[]>([]);

    async function generatePlan() {
        setGenerate(true)
        const prompt = `Generate a personalized learning challenge based on the following criteria:
        Career Path: ${careerStack}
        Specialization: ${specialization}
        Time Commitment: ${time}
        Challenge Duration: ${challengeDays}

        Provide the response in strict JSON format with:
        {
        "challenge_title": "Title of the challenge",
        "learning_outcomes": ["Outcome1", "Outcome2", "Outcome3"],
        "daily_tasks": [
            {
            "day": 1,
            "task": "Description of what to learn or do on this day."
            },
            {
            "day": 2,
            "task": "Next task description."
            },
            {
            "day": 90,
            "task": "Final Project Submission and Review. Deploy your complete full-stack application."
            }
        ],
        "resources": ["Resource1", "Resource2", "Resource3"]
        }

        **Rules:**
        1. If you cannot generate all tasks individually, replace missing tasks with a structured entry:
        example you cant generate the part of day, but this is only example if u still can generate, generate it and if you
        go the day that cant, just put an what they will do in that days
        **"day": "(what day u stop generate - until what days u cant generate", "task": "please provide what they will do in that time"**  
        2. **Do not generate incomplete days** (e.g., "day": 65, "task": ... should not exist).  
        3. **Do not use unstructured placeholders** like "and continue until Day 90".  

        Ensure the response is a **valid JSON** without any syntax errors, extra comments, or markdown formatting.`;


        try {
            const res = await fetch('http://localhost:5000/challenges/request', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            })
    
            try {
                const rawResponse = await res.text();
                console.log("rawResponse: ", rawResponse);
            
                const cleanedResponse = rawResponse.replace(/^json\n/, "").trim();
            
                // Validate JSON before parsing
                if (!cleanedResponse.startsWith("{") && !cleanedResponse.startsWith("[")) {
                    throw new Error("Invalid JSON response");
                }
            
                const response = JSON.parse(cleanedResponse);
                console.log("Parsed: ", response);
            
                setParsedData(response);
            } catch (error) {
                console.error("Error parsing response:", error);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setGenerate(false);
        }
    }

    useEffect(() => {
        const rawData = parsedData?.message ?? ""; // Ensure rawData is a string
        if (rawData) {
            let jsonString = rawData.replace(/```json|```/g, "").trim(); // Remove markdown code block
    
            // Function to remove AI-generated comments
            const sanitizeJSON = (json: string): string => {
                return json.replace(/\/\*[\s\S]*?\*\//g, ''); // Removes /* comments */
            };
    
            try {
                if (!jsonString.startsWith("{") && !jsonString.startsWith("[")) {
                    throw new Error("Invalid JSON format detected.");
                }
    
                // Remove AI-generated comments before parsing
                const cleanedJsonString = sanitizeJSON(jsonString);
                const parsedJson = JSON.parse(cleanedJsonString);
    
                const challengeTitle = parsedJson.challenge_title || "";
                const tasks = parsedJson.daily_tasks || [];
                const learningOutcomes = parsedJson.learning_outcomes || [];
    
                setTitle(challengeTitle);
                setDailyTasks(tasks);
                setOutcomets(learningOutcomes);
            } catch (error) {
                console.error("JSON parsing error:", error, "Raw data:", jsonString);
            }
        }
    }, [parsedData]);
    
    
        

    return (
        <main className='h-full xl:w-4/5 w-full lg:px-10 px-4 py-4 flex flex-col justify-center items-start'>
            <h1 className='text-xl font-semibold'>🚀Choose Your Learning Path</h1>
            <div className='flex gap-3 flex-col lg:flex-row  w-full'>
                <div className='px-4 pt-6 pb-4 bg-white shadow-md rounded-md w-full lg:w-2/5 flex flex-col gap-3'>
                   <div>
                        <h4 className='font-semibold'>Choose a Career Track</h4>
                        <CareerSelector options={CareerType}/>
                   </div>
                   <div>
                        <h4 className='font-semibold'>Select Your Specialization</h4>
                        <SpecializationSelector options={careerStack !== 'Developer Track' ? NonCodingSpecialization : CodingSpecialization}/>
                   </div>
                    <div>
                        <h4 className='font-semibold'>How much time can you commit daily?</h4>
                        <CommitSelector options={DailyTimeCommitment}/>
                    </div>
                    <div>
                        <h4 className='font-semibold'>Pick Your Learning Challenge Duration</h4>
                        <ChallengeSelector options={ChallengeDuration}/>
                    </div> 
                    <button className='w-full bg-green-600 text-white py-2 rounded-md mt-12' onClick={generatePlan}>{generate ? 'Generating...' : 'Generate learning plan'}</button>
                </div>

                <div className='p-4 bg-white shadow-md rounded-md w-full lg:w-3/5 h-[440px] overflow-y-auto flex flex-col'>
                    <h1>Challenge Title: {challengeTitle}</h1>
                    <ul>
                        {outcomes.map((outcomes, index)=> (
                            <li key={index}>{outcomes}</li>
                        ))}
                        {dailyTasks.map((task) => (
                            <li key={task.day}>Day {task.day}: {task.task}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}
