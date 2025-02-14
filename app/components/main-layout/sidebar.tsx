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
                <div className="tooltip sm:tooltip-right" data-tip="Capstone ideas & Mini projects">
                    <div className='relative w-12 h-12 bg-white rounded-full overflow-hidden tooltip' onClick={()=> onTabChange('home')} >
                        <Image
                            fill
                            alt='Capstone'
                            src={'/capstone_logo.png'}
                            loading='lazy'
                            className='object-cover p-1'
                        />
                    </div>
                </div>
                <div className="tooltip sm:tooltip-right" data-tip="How to start learning">
                    <div className='relative w-12 h-12 bg-white rounded-full overflow-hidden' onClick={()=> onTabChange('how')}>
                        <Image
                            fill
                            alt='how to start'
                            src={'/how-to-start.png'}
                            loading='lazy'
                            className='object-cover p-1'
                        />
                    </div>
                </div>
                <div className="tooltip sm:tooltip-right" data-tip="Online compiler">
                    <div className='relative w-12 h-12 bg-white rounded-full overflow-hidden' onClick={()=> onTabChange('compiler')}>
                        <Image
                            fill
                            alt='Online compiler'
                            src={'/online-compiler.webp'}
                            loading='lazy'
                            className='object-cover'
                        />
                    </div>
                </div>
                <div className="tooltip sm:tooltip-right" data-tip="Need assistance?">
                    <div className='relative w-12 h-12 bg-white rounded-full overflow-hidden' onClick={()=> onTabChange('assistant')}>
                        <Image
                            fill
                            alt='Assistant ai'
                            src={'/assistant.jpg'}
                            loading='lazy'
                            className='object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
