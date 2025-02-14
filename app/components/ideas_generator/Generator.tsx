"use client"
import Sidebar from '../main-layout/sidebar'
import { useDynamicTab } from '@/app/state/dynamicTab'
import Start from '@/app/how/to/start/page'
import Compilter from '@/app/compiler/page'
import Assistant from '@/app/lost_programmer/Assistant'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Ideas from './project_capstone'

const tabIdMapping: Record<string, string> = {
    home: "4f7d8a9b2c3d5e6f7g8h9i",
    how: "abc123xyz789lmnop456qrst",
    compiler: "98765lkjh4321poiuy",
    assistant: "longidforassistant999999",
};

// Reverse mapping (ID → tab name)
const reverseTabMapping: Record<string, string> = Object.fromEntries(
    Object.entries(tabIdMapping).map(([key, value]) => [value, key])
);


export default function Generator() {
    const { activeTab, setActiveTab } = useDynamicTab()
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const tabFromUrl = searchParams.keys().next().value;
        if (tabFromUrl && reverseTabMapping[tabFromUrl]) {
            setActiveTab(reverseTabMapping[tabFromUrl]);
        }
    }, [searchParams, setActiveTab]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // Get long ID from tab
        const longId = tabIdMapping[tab] || "unknown";
        router.push(`?${longId}`, { scroll: false });
    };

    return (
       <main className='min-h-screen flex dark:text-black'>
            <Sidebar onTabChange={handleTabChange}/>
            <div className='flex-grow bg-[#D6DCE1] dark:bg-[#D6DCE1] flex justify-center items-center'>
                {activeTab === 'how' && <Start/>}
                {activeTab === 'compiler' && <Compilter/>}
                {activeTab === 'assistant' && <Assistant/>}

                {/**Main dashboard */}
                {activeTab === 'home' && <Ideas/>}
            </div>
       </main>
    )
}   