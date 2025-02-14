import React, { useState } from 'react'
import CareerSelector from '@/app/components/how-to-start/career_choice'
import SpecializationSelector from '@/app/components/how-to-start/specialization'
import CommitSelector from '@/app/components/how-to-start/commitDaily'
import ChallengeSelector from '@/app/components/how-to-start/challengeDuration'
import { CareerType, CodingSpecialization, NonCodingSpecialization, DailyTimeCommitment, ChallengeDuration } from '@/app/Interface/Select'
import { useHowToStart } from '@/app/state/howSelector'

export default function Page() {
    const { careerStack, specialization, time, challengeDays } = useHowToStart()
    const [ parsedData, setParsedData ] = useState<{ idea_name: string; technologies: string[]; summary: string } | null>(null);
    const [ generate, setGenerate ] = useState<boolean>(false)

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
            });
    
            const rawResponse = await res.text();
            console.log("Raw Response:", rawResponse);
    
            // Check if the response is valid JSON
            let response;
            try {
                response = JSON.parse(rawResponse);
            } catch (e) {
                throw new Error("Invalid JSON response from the server");
            }
    
            // Check if the response contains the expected field
            if (!response.message) {
                throw new Error("Missing 'message' field in response");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setGenerate(false);
        }

    }

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

                <div className='p-4 bg-white shadow-md rounded-md w-full lg:w-3/5'>
                    <h1>Output Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet rem sint voluptatum, tempore at dolores facilis, laborum impedit autem fugiat illo vero.
                    </h1>
                </div>
            </div>
        </main>
    )
}
