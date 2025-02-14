import Image from 'next/image';
import React from 'react'

interface SidebarProps {
    onTabChange: (tab: string) => void;
}

export default function sidebar({ onTabChange }: SidebarProps) {

    return ( 
        <div className='bg-gray-800 h-full text-black cursor-default p-2 flex flex-row sm:flex-col items-center justify-center sm:justify-start'>
            <div className='relative w-10 h-10 overflow-hidden hidden sm:block'>
                <Image
                    fill
                    alt='Ass tech logo'
                    src={'/ass-tech-logo.png'}
                    loading='lazy'
                    className='object-cover'
                />
            </div>
            <div className='flex flex-row sm:flex-col items-center sm:pt-56 gap-3'>
                <div className='w-12 h-12 bg-white rounded-full' onClick={()=> onTabChange('home')}>Ideas</div>
                <div className='w-12 h-12 bg-white rounded-full' onClick={()=> onTabChange('how')}>How</div>
                <div className='w-12 h-12 bg-white rounded-full' onClick={()=> onTabChange('compiler')}></div>
                <div className='w-12 h-12 bg-white rounded-full' onClick={()=> onTabChange('assistant')}></div> 
            </div>
        </div>
    )
}
