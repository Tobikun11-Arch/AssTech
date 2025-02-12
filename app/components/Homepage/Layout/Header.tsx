import React from 'react'
import Image from 'next/image'
import { HomeProps } from '@/app/Interface/Homepage'
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Header({ count }: HomeProps) {
    return (
        <header className="flex justify-between">
            {/**AssTech Logo */}
            <div className="flex items-center">
                <div className="relative h-10 w-10">
                    <Image
                        fill
                        loading="lazy"
                        src={'/ass-tech-logo.png'}
                        alt="ass-tech-logo"
                    />
                </div>
                <h4 className="font-semibold">AssTech</h4>
            </div>

            {/**Github contribution */}
            <Link href={`https://github.com/Tobikun11-Arch/AssTech`} target="_blank" className='z-50'>
                <div className="flex items-center">
                    <Github/>
                    <h4 className="font-medium">{count} Stars</h4>
                </div>
            </Link>
        </header>
    )
}
