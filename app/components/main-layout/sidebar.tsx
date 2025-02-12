import React from 'react'

interface SidebarProps {
    onTabChange: (tab: string) => void;
}

export default function sidebar({ onTabChange }: SidebarProps) {

    return (
        <div className='bg-gray-800 h-full w-24 text-black'>
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='w-12 h-12 bg-white rounded-full' onClick={()=> onTabChange('home')}>Ideas</div>
                <div className='w-12 h-12 bg-white rounded-full mt-4' onClick={()=> onTabChange('how')}>How</div>
                <div className='w-12 h-12 bg-white rounded-full mt-4' onClick={()=> onTabChange('compiler')}></div>
                <div className='w-12 h-12 bg-white rounded-full mt-4' onClick={()=> onTabChange('assistant')}></div> 
            </div>
        </div>
    )
}
