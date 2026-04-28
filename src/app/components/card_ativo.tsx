'use client'
import React, { Children } from "react"
import Image from "next/image"

interface divPros extends React.HTMLAttributes<HTMLDivElement> {}

export default function Ativo({children, className, ...props}: divPros) {
    return (
        <div {...props} className={`${className} bg-green-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute overflow-hidden object-cover p-5 rounded-3xl font-sans font-semibold text-black z-50 flex items-center gap-4 w-70 `}>
            <div>
                <Image src='/confirme.png' width={40} priority height={20} alt="icone-confirmação"></Image>
            </div>
            <p>Função áudio Habilitada</p>
        </div>
    )
}