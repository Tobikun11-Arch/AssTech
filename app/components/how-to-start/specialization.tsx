import { Listbox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { optionsProps } from '@/app/Interface/Select'
import { useHowToStart } from '@/app/state/howSelector';
import { ChevronDown } from "lucide-react"; 

interface optionsTypes {
    options: optionsProps[]
}

export default function SpecializationSelector({ options }: optionsTypes) {
    const [selected, setSelected] = useState(options[0])
    const { setSpecialization } = useHowToStart()

    useEffect(()=> {
        setSpecialization(selected.name)
    }, [selected])

    return (
        <div className="w-full">
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
            {/* Button */}
            <Listbox.Button className="w-full border outline-none border-gray-300 rounded-lg bg-white py-2 px-4 text-left shadow-md cursor-pointer focus:ring-2 flex justify-between items-center">
                <span>{selected.name}</span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
            </Listbox.Button>

            {/* Options */}
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md">
                {options.map((option) => (
                <Listbox.Option
                    key={option.id}
                    value={option}
                    className={({ active }) =>
                    `cursor-pointer select-none p-2 ${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    }`
                    }
                >
                    {option.name}
                </Listbox.Option>
                ))}
            </Listbox.Options>
            </div>
        </Listbox>
        </div>
    )
}
