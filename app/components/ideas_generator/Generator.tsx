"use client"
import Sidebar from '../main-layout/sidebar'
import { useDynamicTab } from '@/app/state/dynamicTab'
import Start from '@/app/how/to/start/page'
import Compilter from '@/app/compiler/page'
import Assistant from '@/app/lost_programmer/Assistant'
import { useEffect, Suspense } from 'react'
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

function TabHandler() {
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
        <main className='min-h-screen flex flex-col sm:flex-row dark:text-black'>
            <div className='order-2 sm:order-1 sm:min-h-screen sticky bottom-0'>
                <Sidebar onTabChange={handleTabChange}/> 
            </div>
            <div className='min-h-screen sm:flex-grow bg-white dark:bg-[#D6DCE1] flex justify-center items-center order-1 sm:order-2'>
                {activeTab === 'how' && <Start/>}
                {activeTab === 'compiler' && <Compilter/>}
                {activeTab === 'assistant' && <Assistant/>}

                {/**Main dashboard */}
                {activeTab === 'home' && <Ideas/>}
            </div>
        </main>
    )
}

export default function Generator() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TabHandler />
        </Suspense>
    );
}
