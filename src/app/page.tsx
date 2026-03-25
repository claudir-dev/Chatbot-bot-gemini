'use client'
import Image from "next/image";
import Navbar from "./components/navabar";
import Button from "./components/button"
import Input from "./components/input";
import CardErro from "./components/card_error";
import CardUser from "./components/card_user";
import CardRoot from "./components/card_root";
import { useEffect, useState } from "react";
export default function Home() {

  const [texto, settexto] = useState('')
  const [messagens, setmessagens] = useState('')
  const [desabilita, setdesabilita] = useState(false)
  const [invalido, setinvalido] = useState(false)
  const [rootMsg, setrootMsg] = useState('')
  const [user, setuser] = useState<Mensagem[]>([])

    type Mensagem = {
      texto:string, tipo: 'user' | 'rot'
    }
  
  const server = async (e? : React.BaseSyntheticEvent) => {
    if(e) {
      e.preventDefault()
    }

    if(!texto.trim()) {
      setmessagens('Dado invalido')
      setinvalido(true)
      setTimeout(() => {setinvalido(false)}, 6000)
      return
    }

    setuser((prev) => [
      ...prev, {
        texto: texto, tipo: 'user'

      }
    ])

    settexto('')

    const intents = {
      portfolio: [
        "portfólio",
        "portfolio",
        "projetos",
        "trabalhos",
        "github",
        "ver projetos"
      ],
      contato: [
        "contato",
        "falar com você",
        "email",
        "whatsapp"
      ]
    }

    function DetectarIntent(texto: string) {
      const normaliza = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      for (const intent in intents) {
        const key = intent as keyof typeof intents
        for (const palavra of intents[key]) {
          if(normaliza.includes(palavra)) {
            return intent
          }
        }
      }
      return null
    }
    
    const exist = DetectarIntent(texto)

    if(exist) {
      alert()
    } else {
      setdesabilita(true)
      try {
        const req = await fetch('http://localhost:3002/api/google', {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({})
        })

        const response = await req.json()
        console.log(response)
        setrootMsg(response.text)

        setuser((prev) => [
          ...prev, {
            texto: rootMsg, tipo: 'rot'
          }
        ])
      } catch (error) {
        console.log('Erro ao chama a API do gemini')

        setTimeout(() => {
          setmessagens('Erro interno no servidor')
          setinvalido(true)
        },6000)
        setinvalido(false)

      } finally {
        setdesabilita(false)
      }  
    } 
  }
  return (
   <div className="h-screen flex flex-col">
      <Navbar></Navbar>
      {invalido && (
        <CardErro>{messagens}</CardErro>
      )}
      <div className=" flex flex-1 justify-center items-center sm:mt-80 mt-60 md:mt-60 z-0 relative ">
          <p className="text-white text-center sm:text-5xl text-4xl font-semibold mx-2">Seja bem vindo!! <span className=" block mt-2 text-blue-400 sm: text-4xl">pequeno gafanhoto</span></p>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hidden z-0 space-y-8 m-2 p-4 pb-24">
        {user.map((msg, index) => (
          <div key={index} className={`${msg.tipo === 'user'? 'max-w-[75%] bg-blue-500 flex backdrop-blur-md justify-end rounded-2xl text-xl text-amber-50 break-all whitespace-pre-wrap p-4 ': 'bg-slate-800/80 max-w-[75%] break-all whitespace-pre-wrap rounded-2xl text-xl  text-amber-50 p-4 flex justify-start'} `}>
            {msg.texto}
          </div>
        ))}
        
      </div>
      <div className="sm:-space-x-10 -space-x-4 lg:-space-x-160 fixed sm:mb-15 mb-5 flex justify-around items-center bottom-0 w-full ">
        <Input value={texto} onChange={(e) => settexto(e.target.value)}></Input>
        <Button disabled={desabilita} onClick={server} ></Button>
      </div>
   </div>
  )
}
