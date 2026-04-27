'use client'

import { useEffect, useState } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CardAudio({children, className, ...pros}: ButtonProps) {
    return (
        <div className={`flex w-full h-screen justify-center mx-auto z-50 absolute items-center ${className}`}>
            <div className=" rounded-2xl max-w-[340px] shadow-md shadow-black p-10 bg-gradient-to-r from-blue-500 to-cyan-400 ">
                <h1 className="text-xl text-black text-center font-sans font-semibold">Deseja que eu responda <br /> com audio?😊</h1>
                <div className="flex justify-center items-center gap-9 mt-4">
                    <button className="p-1 w-20 font-sans font-semibold rounded-2xl bg-gradient-to-tr cursor-pointer hover:scale-110 transition-all duration-300 from-green-400 to-cyan-400">Sim</button>
                    <button className="bg-gradient-to-r from-rose-600 to-red-500 p-1 w-20 font-sans cursor-pointer hover:scale-110 transition-all duration-300 font-semibold rounded-2xl">Não</button>
                </div>
            </div>
        </div>
    )
}