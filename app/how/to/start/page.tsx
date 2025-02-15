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
    const [ isError, setError ] = useState<boolean>(false)
    const [ generate, setGenerate ] = useState<boolean>(false)
    const [dailyTasks, setDailyTasks] = useState<{ day: number; task: string }[]>([]);

    async function generatePlan() {
        setGenerate(true)
        const prompt = `Generate a personalized learning challenge based on the following criteria:
            Career Path: ${careerStack}
            Specialization: ${specialization}
            Time Commitment: ${time}
            Challenge Duration: ${challengeDays}
            
            Provide the response in JSON format with:
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
                to ${challengeDays}
            ],
            "resources": ["Resource1", "Resource2", "Resource3"]
        }`;

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
                setError(true); // Set error state
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setGenerate(false);
        }
    }

    useEffect(()=> {
        const rawData = parsedData?.message ?? ""; // Ensure rawData is a string
        if (rawData) {
            const jsonString = rawData.replace(/```json|```/g, ""); // Remove markdown formatting
            try {
                const parsedJson = JSON.parse(jsonString); // Convert string to object
                const tasks = parsedJson.daily_tasks || [];

                const learningOutcomes = parsedJson.learning_outcomes || []
                setDailyTasks(tasks); 
            } catch (error) {
                console.error("JSON parsing error:", error);
                setError(true);
            }
        }
    }, [parsedData])
    

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

                <div className='p-4 bg-white shadow-md rounded-md w-full lg:w-3/5 overflow-y-auto'>
                <h1>Learning Outcomes</h1>
                    <ul>
                        {dailyTasks.map((task) => (
                            <li key={task.day}>Day {task.day}: {task.task}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}
