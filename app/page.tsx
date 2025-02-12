import React from 'react'
import Home from './components/Homepage/Home'

export default async function Page() {
    const response = await fetch('https://api.github.com/repos/Tobikun11-Arch/AssTech/stargazers')
    const data = await response.json()

    return <Home count={data.length}/>
}
