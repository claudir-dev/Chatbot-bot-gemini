'use client'
import React, { Children } from "react"
import Image from "next/image"

interface divPros extends React.HTMLAttributes<HTMLDivElement> {}

export default function Desativado({children, className, ...props}: divPros) {
    return (
        <div  {...props} className={`${className} bg-yellow-300 top-1/2 left-1/2 p-5 rounded-3xl font-sans font-semibold text-black overflow-hidden object-cover -translate-x-1/2 -translate-y-1/2 w-75 gap-4 absolute z-50 flex place-items-center `}>
            <div>
                <Image src='/aviso.png' width={40} priority height={20} alt="icone-confirmação"></Image>
            </div>
            <p>Função áudio Desativada</p>
        </div>
    )
}