'use client'

import Image from "next/image"
interface carduser extends React.HTMLAttributes<HTMLDivElement> {}
export default function CardUser({children, ...props}: carduser) {
    return (
        <div className="flex justify-end space-x-2">
            <div className=" bg-blue-500 backdrop-blur-md max-w-[75%] break-all whitespace-pre-wrap rounded-2xl text-xl p-4 text-amber-50">
                {children}
            </div>
            <Image src='/icon-user.png' className="" height={15} width={40} alt="icon-user"></Image>
        </div>    
    )
}