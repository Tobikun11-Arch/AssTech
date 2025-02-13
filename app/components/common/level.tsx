import React from 'react'
import { useGenerator } from '@/app/state/generator_select'

interface levelProps {
    label: string
    onclick: React.MouseEventHandler<HTMLHeadingElement> | undefined
}

export default function level({ label, onclick }: levelProps) {
    const { level_type } = useGenerator()

    return (
        <div className={`px-7 w-full flex items-center justify-center rounded-md py-2 border ${level_type === label && 'bg-green-600 text-white'}`} onClick={onclick}>{label}</div>
    )
}
