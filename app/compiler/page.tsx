"use client"
import React, { useState } from 'react'
import PythonJson from './python.json'
import JSJson from './javascript.json'
import CppJson from './c++.json'
import CJson from './C.json'
import JavaJson from './java.json'
import RustJson from './rust.json'
import CsharpJson from './c#.json'
import { useDynamicTab } from '../state/dynamicTab'

export default function Page() {
    const [ language, setLanguage ] = useState("python3")
    const [ code, setCode ] = useState(getDefaultCode("python3"));
    const [ output, setOutput ] = useState("");
    const [ run, setRun ] = useState<boolean>(false)
    const [ languageData, setLanguageData ] = useState(PythonJson);
    const { setActiveTab } = useDynamicTab()

    async function handleRun() {    
        setRun(true)
        try {
            const pistonApi = process.env.NEXT_PUBLIC_PISTON
            const response = await fetch(`${pistonApi}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    language: language,
                    version: "*",
                    files: [{ name: "main", content: code }], 
                    stdin: "",
                    args: []
                })
            })

            const result = await response.json()
            setOutput(result.run.output)
        } catch (error) {
            console.error("Error: ", error)
        } finally {
            setRun(false)
        }
    }

    function getDefaultCode(lang: string) {
        switch (lang) {
            case "python3":
                return 'print("Hello, World!")';
            case "javascript":
                return 'console.log("Hello, World!");';
            case "cpp":
                return '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}';
            case "c":
                return '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}';
            case "java":
                return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
            case "rust":
                return 'fn main() {\n    println!("Hello, World!");\n}';
            case "csharp":
                return 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}';
            default:
                return "";
        }
    }

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        setCode(getDefaultCode(newLanguage)); // Update code when language changes
        switch (newLanguage) {
            case "python3":
                setLanguageData(PythonJson)
                break;

            case "javascript":  
                setLanguageData(JSJson)
                break;
            
            case "cpp":  
                setLanguageData(CppJson)
                break;

            case "c":  
                setLanguageData(CJson)
                break;

            case "java":  
                setLanguageData(JavaJson)
                break;    

            case "rust":  
                setLanguageData(RustJson)
                break; 

            case "csharp":  
                setLanguageData(CsharpJson)
                break;

            default:
                break;
        }
    };

    return (
        <main className='w-full h- p-4 lg:p-10 cursor-default flex flex-col lg:flex-row gap-3 text-white dark:text-white'>
            <div className='shadow-lg rounded-md p-4 bg-white w-full lg:w-2/5 h-full'>
                <h1 className='text-xl font-semibold'>AssTech Online Compiler</h1>

                <p className='text-blue-600 text-xs' onClick={()=> setActiveTab('assistant')}>Need help?</p>
                <div className='w-full h-72 border p-2 mt-5 overflow-y-auto'>
                    <h2 className='font-semibold text-xl'>{languageData.language}</h2>
                    <p>{languageData.description}</p>
                    <h3 className='mt-2'><span className='font-semibold'>Why Use?</span> {languageData.whyUse}?</h3>
                </div>
            </div>

            {/**Another dim */}
            <div className='w-full lg:w-3/5 h-full bg-white shadow-lg rounded-md p-4'>
                <div className='w-full flex justify-between items-center'>
                    <select onChange={handleLanguageChange} value={language} className='py-1 px-2 rounded-md text-black dark:text-black dark:bg-white border'>
                        <option value="python3">Python 3</option>
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="java">Java</option>
                        <option value="rust">Rust</option>
                        <option value="csharp">C#</option>
                    </select>
                    <button className={`bg-green-600 text-white font-semibold py-1 px-4 rounded-md ${run && 'bg-white border'}`} onClick={handleRun}>
                        {run ? (
                           <div>    
                                <img src="/generating.gif" alt="Animated GIF" width={40} height={40} />
                           </div>
                        ) : "Run"}
                    </button>
                </div>
                <div className='mt-5 w-full h-full'>
                    <textarea name="" id="" className='w-full outline-none border p-2 h-72 resize-none bg-black text-white'
                    value={code} onChange={(e)=> setCode(e.target.value)} placeholder='//Write code here...'></textarea>
                    <div className='w-full p-2 border-2 mt-4 h-80 overflow-y-auto'>
                        <pre>{output ? output : "Output"}</pre>
                    </div>
                </div>
            </div>  
        </main>
    )
}