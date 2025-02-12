"use client"
import Sidebar from '../main-layout/sidebar'
import { useDynamicTab } from '@/app/state/dynamicTab'
import Start from '@/app/how/to/start/page'
import Compilter from '@/app/compiler/page'
import Assistant from '@/app/lost_programmer/Assistant'

export default function Generator() {
    const { activeTab } = useDynamicTab()

    return (
       <main className='h-screen flex'>
            <Sidebar/>
            <div className='flex-grow bg-white flex justify-center items-center'>
                {activeTab === 'how' && <Start/>}
                {activeTab === 'compiler' && <Compilter/>}
                {activeTab === 'assistant' && <Assistant/>}
                {activeTab === 'home' && 
                    <div>Home</div>
                }
            </div>
       </main>
    )
}   