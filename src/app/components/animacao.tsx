'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
export default function Carregar() {
    const [mens, setmens] = useState('')
    const [index, setIndex] = useState(0)

    const frases = [
        "Sincronizando rede neural",
        "Otimizando interface",
        "Carregando assetes"
    ]

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % frases.length)
        },3000)

        return () => clearInterval(intervalo)
    }, [])
    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col justify-center items-center gap-6">
            {/* Ícone com um brilho neon de fundo */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-blue-500 rounded-full blur transition-all opacity-25 group-hover:opacity-50 duration-1000"></div>
                <Image 
                    src='/icone.png' 
                    alt="icone bot" 
                    width={100} 
                    height={100} 
                    className="relative animate-bounce transition-all delay-1000"
                />
            </div>

            {/* Barra de Progresso */}
            <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden border border-white/10">
                <div className="bg-blue-400 h-full animate-carregar shadow-[0_0_10px_#60a5fa]"></div>
            </div>

            {/* Texto Dinâmico */}
            <div className="h-6">
                <p className="text-blue-300 font-mono text-md tracking-widest ">
                    {frases[index]}
                </p>
            </div>
        </div>
    )
}