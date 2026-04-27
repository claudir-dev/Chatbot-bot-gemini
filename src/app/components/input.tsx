'use client'

interface inputProps {
    aoClicar ?: (e:React.MouseEvent<SVGAElement>) => void
    value: string
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({value, aoClicar, onChange}: inputProps) {
    return (
        <div className="object-cover">
            <input className=" text-black pl-11 outline-0 xl:w-200 sm:w-200 bg-gray-400 p-3 rounded-xl flex-1 w-70" type="text" value={value} onChange={onChange} placeholder="Em que posso ajudar?" />
        </div>
    )
}