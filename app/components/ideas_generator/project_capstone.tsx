import React, { useEffect, useState } from 'react'
import IndustrySelector from './IndustrySelector'
import IdeasSelector from './IdeasSelector'
import ProjectType from './ProjectType'
import { ideasType, Industry, projectType } from '@/app/Interface/Select'
import DifLevel from '../common/level'
import { Lightbulb } from 'lucide-react'
import { useGenerator } from '@/app/state/generator_select'

export default function project_capstone() {
    const { setLevelType, level_type, ideas, industry, project_type, add_details, setAddDetails } = useGenerator()

    async function handleGenerate() {
        console.table({
            "ideas": ideas,
            "industry": industry,
            "project_type": project_type,
            "level_type": level_type,
            "add_details": add_details
        })
    }

    return (
        <main className='w-full h-full lg:w-4/5 lg:h-4/5 flex flex-col lg:flex-row gap-5 p-4 lg:p-0 cursor-default'>
            <section className='w-full lg:w-2/5  flex flex-col gap-2 lg:gap-2'>
                <h1 className='text-lg font-semibold'>Mini projects & Capstone ideas</h1>
                <div className='w-full bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3'>
                    <div>
                        <h4>Ideas Type</h4>
                        <IdeasSelector options={ideasType}/>
                    </div>

                    <div>
                        <h4>Choose an Industry</h4>
                        <IndustrySelector options={Industry}/>
                    </div>

                    <div>
                        <h4>Project Type</h4>
                        <ProjectType options={projectType}/>
                    </div>

                    <div className='w-full'>
                        <h4>Difficulty level</h4>
                        <div className='flex gap-2 w-full overflow-x-scroll'>
                            <DifLevel onclick={()=> setLevelType('Easy')} label='Easy'/>
                            <DifLevel onclick={()=> setLevelType('Medium')} label='Medium'/>
                            <DifLevel onclick={()=> setLevelType('Hard')} label='Hard'/>
                        </div>
                    </div>

                    <button className='bg-blue-600 mt-2 text-white font-semibold py-2 rounded-md flex justify-center items-center' onClick={handleGenerate}>Suggest Ideas <Lightbulb size={20}/> </button>
                </div>
                <div className='w-full lg:h-full bg-white rounded-lg shadow-lg p-4'>
                    <h4>Please specify the details of your mini project/capstone project (optional).</h4>
                    <textarea name="" id="" className="w-full h-40 lg:flex-grow p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none resize-none" value={add_details} onChange={(e)=> setAddDetails(e.target.value)}></textarea>
                </div>
            </section>
            <section className='w-full lg:w-3/5 p-4 bg-white rounded-lg shadow-lg'>
                <div>
                    <h1>Result</h1>
                </div>
            </section>
        </main>
    )
}
