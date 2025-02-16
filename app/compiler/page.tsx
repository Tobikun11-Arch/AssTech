import React, { useState } from 'react'

export default function Page() {
    const [ language, setLanguage ] = useState<string>("python3")

    return (
        <main className='w-full h-full p-4 lg:p-10 cursor-default flex flex-col lg:flex-row gap-3'>
            <div className='shadow-md rounded-md p-4 bg-white w-full lg:w-2/5 h-full'>
                <h1 className='text-xl font-semibold'>AssTech Online Compiler</h1>

                <p className='text-blue-600 mt-10'>Need help?</p>
                <input type="text" placeholder='Search function...' className='outline-none p-2 h-10 border w-full rounded-md'/>
                <div className='w-full h-72 border p-2 mt-5'>
                    <h2>Data</h2>
                </div>
            </div>

            {/**Another dim */}
            <div className='w-full lg:w-3/5 h-full bg-white shadow-md rounded-md p-4'>
                <div className='w-full flex justify-between items-center'>
                    <select onChange={(e) => setLanguage(e.target.value)} value={language} className='py-1 px-2 rounded-md'>
                        <option value="python3">Python 3</option>
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="java">Java</option>
                        <option value="rust">Rust</option>
                        <option value="csharp">C#</option>
                    </select>
                    <button className='bg-green-600 text-white font-semibold py-1 px-4 rounded-md'>Run</button>
                </div>
                <div className='mt-5 w-full h-full'>
                    <textarea name="" id="" className='w-full outline-none border p-2 h-72 resize-none' placeholder='//Write code here'></textarea>
                    <div className='w-full p-2 border mt-4 h-40'>
                        <pre>Output</pre>
                    </div>
                </div>
            </div>  
        </main>
    )
}
