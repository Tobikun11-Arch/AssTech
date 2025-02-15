"use client"
import React, { useState } from 'react'
import IndustrySelector from './IndustrySelector'
import IdeasSelector from './IdeasSelector'
import ProjectType from './ProjectType'
import { ideasType, Industry, projectType } from '@/app/Interface/Select'
import DifLevel from '../common/level'
import { Lightbulb, Download } from 'lucide-react'
import { useGenerator } from '@/app/state/generator_select'
import Image from 'next/image'
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

export default function project_capstone() {
    const { setLevelType, level_type, industry, ideas, project_type, add_details, setAddDetails } = useGenerator()
    const [ parsedData, setParsedData ] = useState<{ idea_name: string; technologies: string[]; summary: string } | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false)

    async function handleGenerate() {
        setLoading(true);
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
        }`;
    
        try {
            const res = await fetch('http://localhost:5000/add/data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
    
            const rawResponse = await res.text();
    
            // Check if the response is valid JSON
            let response;
            try {
                response = JSON.parse(rawResponse);
            } catch (e) {
                throw new Error("Invalid JSON response from the server");
            }
    
            // Check if the response contains the expected field
            if (!response.message) {
                throw new Error("Missing 'message' field in response");
            }
    
            // Parse the message field
            const parsed = JSON.parse(response.message);
            setParsedData(parsed);
            setAddDetails('');
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleExportPDF() {
        const element = document.getElementById("export-section");
        if (!element) return;
      
        // Hide non-PDF elements before capture
        const excludedElements = document.querySelectorAll(".exclude-from-pdf");
        excludedElements.forEach(el => el.classList.add("hidden"));
      
        try {
            const scale = 2;
            const imgData = await domtoimage.toPng(element, {
                width: element.offsetWidth * scale,
                height: element.offsetHeight * scale,
                style: {
                transform: `scale(${scale})`,
                transformOrigin: "top left"
                }
            });
        
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = 190;
        
            pdf.addImage(imgData, "PNG", 10, 10, pageWidth, 0);
            pdf.save(`${parsedData?.idea_name}`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            excludedElements.forEach(el => el.classList.remove("hidden"));
        }
    }
    

    return (
        <main className='w-[320px] min-[380px]:w-full h-full lg:w-4/5 lg:h-4/5 flex flex-col lg:flex-row gap-5 p-4 lg:p-0 cursor-default'>
            <section className='w-full  lg:w-2/5 flex min-w-0 flex-col gap-2 lg:gap-2'>
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
            <section className='w-full lg:w-3/5 h-full lg:h-auto py-4 px-6 lg:mt-9 lg:overflow-y-auto bg-white rounded-lg shadow-lg'>
                {loading ? (
                    <div className='w-full h-64 lg:h-full flex flex-col justify-center items-center'>
                        <img src="/run.gif" alt="Animated GIF" width={100} height={200} />
                        <h1 className='-mt-10'>On my wayyy...</h1>
                    </div>
                ) : parsedData ? (
                    <section id='export-section'>
                        <div className='flex items-center justify-between lg:mt-3'>
                            <h1 className='text-2xl font-semibold w-full'>📌 {parsedData.idea_name}</h1>
                            <div className="exclude-from-pdf">
                                <Download onClick={handleExportPDF} className="exclude-from-pdf"/>
                            </div> 
                        </div>
                       <div className='mt-5'>
                            <p className="text-lg font-medium text-black">🛠 Technologies:</p>
                            <p className='text-red-500'>{parsedData?.technologies.join(', ')}</p>
                       </div>
                        <h1 className='mt-10 text-lg text-gray-600'><span className='font-semibold text-xl text-black'>📖 Summary:</span> <br /> {parsedData.summary}</h1>
                    </section>
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
