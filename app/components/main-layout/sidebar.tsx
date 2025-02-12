import React from 'react'
import { useDynamicTab } from '@/app/state/dynamicTab'

export default function sidebar() {
    const { setActiveTab } = useDynamicTab()

    return (
        <div className='bg-gray-800 h-full w-24 text-black'>
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='w-12 h-12 bg-white rounded-full' onClick={()=> setActiveTab('home')}>Ideas</div>
                <div className='w-12 h-12 bg-white rounded-full mt-4' onClick={()=> setActiveTab('how')}>How</div>
                <div className='w-12 h-12 bg-white rounded-full mt-4' onClick={()=> setActiveTab('compiler')}></div>
                <div className='w-12 h-12 bg-white rounded-full mt-4' onClick={()=> setActiveTab('assistant')}></div> 
            </div>
        </div>
    )
}
