import React from 'react'
import CareerSelector from '@/app/components/how-to-start/career_choice'
import SpecializationSelector from '@/app/components/how-to-start/specialization'
import { CareerType, CodingSpecialization, NonCodingSpecialization } from '@/app/Interface/Select'
import { useHowToStart } from '@/app/state/howSelector'

export default function Page() {
    const { careerStack } = useHowToStart()

    return (
        <main className='h-full w-full p-4 lg:p-4 flex flex-col justify-center items-start '>
            <h1 className='text-xl font-semibold'>🚀Choose Your Learning Path</h1>
            <div className='flex gap-3 flex-col lg:flex-row w-full'>
                <div className='p-4 bg-white shadow-md rounded-md w-full lg:w-2/5 flex flex-col gap-3'>
                    <CareerSelector options={CareerType}/>
                    <SpecializationSelector options={careerStack !== 'Developer Track' ? NonCodingSpecialization : CodingSpecialization}/>
                </div>

                <div className='p-4 bg-white shadow-md rounded-md w-full lg:w-3/5'>
                    <h1>Output</h1>
                </div>
            </div>
        </main>
    )
}
