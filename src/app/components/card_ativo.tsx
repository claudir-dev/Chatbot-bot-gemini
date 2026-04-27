'use client'
import React, { Children } from "react"
import Image from "next/image"

interface divPros extends React.HTMLAttributes<HTMLDivElement> {}

export default function Ativo({children, ...props}: divPros) {
    return (
        <div className=" bg-green-500 top-1/2 left-1/2 p-5 rounded-3xl font-sans font-semibold text-black overflow-hidden object-cover -translate-x-1/2 -translate-y-1/2 w-70 gap-4 absolute z-50 flex place-items-center">
            <div>
                <Image src='/confirme.png' width={40} priority height={20} alt="icone-confirmação"></Image>
            </div>
            <p>Função áudio Habilitada</p>
        </div>
    )
}