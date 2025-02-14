import React, { useState } from 'react'
import IndustrySelector from './IndustrySelector'
import IdeasSelector from './IdeasSelector'
import ProjectType from './ProjectType'
import { ideasType, Industry, projectType } from '@/app/Interface/Select'
import DifLevel from '../common/level'
import { Lightbulb, Download } from 'lucide-react'
import { useGenerator } from '@/app/state/generator_select'
import Image from 'next/image'

export default function project_capstone() {
    const { setLevelType, level_type, industry, ideas, project_type, add_details, setAddDetails } = useGenerator()
    const [ parsedData, setParsedData ] = useState<{ idea_name: string; technologies: string[]; summary: string } | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false)

    async function handleGenerate() {
        setLoading(true)
        const prompt = `Generate a mini project idea based on the following criteria:
        Ideas for: ${ideas}
        Industry: ${industry}
        Project Type: ${project_type}
        Difficulty Level: ${level_type}
        Additional Details: ${add_details || "None"}

        Respond in JSON format with:
        {
        "idea_name": "Project Name",
        "technologies": ["Tech1", "Tech2", "Tech3"],
        "summary": "A brief description of the project."
        }`

        try {
            const res = await fetch('http://localhost:5000/add/data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ prompt })
            })
            const response = await res.json()

            try {
                const parsed = JSON.parse(response.message);
                setParsedData(parsed);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                setParsedData(null);
            }
        } catch (error) {
            console.error("error: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='w-[320px] min-[380px]:w-full h-full lg:w-4/5 lg:h-4/5 flex flex-col lg:flex-row gap-5 p-4 lg:p-0 cursor-default'>
            <section className='w-full lg:w-2/5 flex min-w-0 flex-col gap-2 lg:gap-2'>
                <h1 className='text-lg font-semibold'>Mini projects & Capstone ideas</h1>
                <div className='w-full bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3'>
                    <div>
                        <h4 className='font-semibold'>Ideas Type</h4>
                        <IdeasSelector options={ideasType}/>
                    </div>

                    <div>
                        <h4 className='font-semibold'>Choose an Industry</h4>
                        <IndustrySelector options={Industry}/>
                    </div>

                    <div>
                        <h4 className='font-semibold'>Project Type</h4>
                        <ProjectType options={projectType}/>
                    </div>

                    <div className='w-full'>
                        <h4 className='font-semibold'>Difficulty level</h4>
                        <div className='flex gap-2 w-full overflow-x-auto'>
                            <DifLevel onclick={()=> setLevelType('Easy')} label='Easy'/>
                            <DifLevel onclick={()=> setLevelType('Medium')} label='Medium'/>
                            <DifLevel onclick={()=> setLevelType('Hard')} label='Hard'/>
                        </div>
                    </div>

                    <button className='bg-blue-600 mt-2 text-white font-semibold py-2 rounded-md flex justify-center items-center' onClick={handleGenerate}>{loading ? "Thinking..." : (<>Suggest Ideas <Lightbulb size={20}/></>)} </button>
                </div>
                <div className="w-full lg:h-full bg-white rounded-lg shadow-lg p-4 flex flex-col">
                    <h4>Please specify the details of your mini project/capstone project (optional).</h4>
                    <textarea 
                        className="w-full lg:flex-grow p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none resize-none"
                        value={add_details}
                        onChange={(e) => setAddDetails(e.target.value)}
                    ></textarea>
                </div>

            </section>
            <section className='w-full lg:w-3/5 h-full lg:h-auto py-4 px-6 lg:mt-9 bg-white rounded-lg shadow-lg'>
                {loading ? (
                    <div className='w-full h-64 lg:h-full flex flex-col justify-center items-center'>
                        <img src="/run.gif" alt="Animated GIF" width={100} height={200} />
                        <h1 className='-mt-24 text-gray-400'>Thinking...</h1>
                    </div>
                ) : parsedData ? (
                    <>
                        <div className='flex items-center justify-between lg:mt-5'>
                            <h1 className='text-2xl font-semibold'>📌 {parsedData.idea_name}</h1>
                            <Download />
                        </div>
                        <h1 className="text-based mt-5 font-semibold">
                        🛠 Technologies:
                        {parsedData?.technologies.map((tech: string, index: number) => (
                            <span key={index} className="bg-gray-200 text-sm font-medium text-black px-2 py-1 rounded-md mx-1">
                            {tech}
                            </span>
                        ))}
                        </h1>
                        <h1 className='mt-10 text-lg text-gray-600'><span className='font-semibold text-xl text-black'>📖 Summary:</span> <br /> {parsedData.summary}</h1>
                    </>
                ) : (
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <div className='h-48 w-48 relative'>
                            <Image
                                fill
                                loading='lazy'
                                alt='Ass Tech Logo'
                                src={'/ass-tech-logo.png'}
                            />
                        </div>
                        <h1 className='text-xl font-bold text-gray-300'>Your Next Project is One Click Away!🎨</h1>
                    </div>
                )}

            </section>
        </main>
    )
}
