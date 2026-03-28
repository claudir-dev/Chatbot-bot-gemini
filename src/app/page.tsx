'use client'
import Image from "next/image";
import Navbar from "./components/navabar";
import Button from "./components/button"
import Input from "./components/input";
import CardErro from "./components/card_error";
import Carregar from "./components/animacao";
import { useEffect, useRef, useState } from "react";
export default function Home() {

  const [texto, settexto] = useState('')
  const [messagens, setmessagens] = useState('')
  const [desabilita, setdesabilita] = useState(false)
  const [invalido, setinvalido] = useState(false)
  const [rootMsg, setrootMsg] = useState('')
  const [animacao, setanimacao] = useState(false)
  const [img, setimg] = useState(false)
  const [carregando, setcarregando] = useState(true)
  const [user, setuser] = useState<Mensagem[]>([])
  const chatref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {setcarregando(false)},9000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    chatref.current?.scrollTo({
      top: chatref.current.scrollHeight,
      behavior: 'smooth'
    })
  },[user])

  if(carregando) {
    return <Carregar/>
  }

    type Mensagem = {
      texto:string, tipo: 'user' | 'bot' | 'loading',
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
        "ver projetos",
        "portifolio "
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
    console.log(exist)

    if(exist) {
      
    } else {
      try {
        setimg(true)
        setuser((prev) => [
          ...prev, {
            texto: '', tipo: 'loading', 
          }
        ])
        setdesabilita(true)
        const req = await fetch('https://chat-bot-api-544x.onrender.com/api/google', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({texto})
        })

        const response = await req.json()
        console.log(response)

        if(!req.ok) {
          console.log(response.error)
          setuser((prev) => [
            ...prev, {
              texto: '', tipo: 'bot'
            }
          ])
          setmessagens('Erro interno no servidor! Estamos verificando...')
          setinvalido(true)
          setTimeout(() => {setinvalido(false)},6000)
          return
        }

          setuser((prev) => [
          ...prev.filter(msg => msg.tipo !== 'loading'), {texto: response.text, tipo: 'bot'}
        ])


      } catch (error) {
        console.log('Erro ao chama a API do gemini', error)

        setuser((prev)=> [
          ...prev.filter(msg => msg.tipo !== 'loading')
        ])

        setTimeout(() => {
          setmessagens('Erro interno na requisição para api.')
          setinvalido(true)
        },6000)
        setinvalido(false)

      } finally {
        setdesabilita(false)
      }  
    }

  }
  return (
   <div className="h-svh flex flex-col">
    <Navbar></Navbar>
    {invalido && (
      <CardErro>{messagens}</CardErro>
    )}
    <div className=" flex justify-center items-center lg:mt-90 mt-72 md:mt-60 ">
        <p className="text-white text-center sm:text-5xl text-4xl font-semibold mx-2">Seja bem vindo!! <span className=" block mt-2 text-blue-400 sm: text-4xl">pequeno gafanhoto</span></p>
    </div>
    <div ref={chatref}  className="flex flex-col space-y-8 m-2 p-4 pb-24 overflow-y-auto scroll-hidden">
      {user.map((msg, index) => (
        <div key={index} className={`${msg.tipo == 'user'? 'flex justify-end': 'flex justify-start'}`}>


          {msg.tipo === 'loading' && (
                  
              <div className="flex items-center justify-center space-x-2 ">
                <span className="h-3 w-3 animate-bounce duration-700 rounded-full bg-blue-50 [animation-delay:-0.3s]"></span>
                <span className="h-3 w-3 animate-bounce duration-700 rounded-full bg-blue-50 [animation-delay:-0.15s]"></span>
                <span className="h-3 w-3 animate-bounce duration-700 rounded-full bg-blue-50"></span>
              </div>
                
          )}

          {msg.tipo === 'user' && (
            <div className="bg-blue-500 ml-auto max-w-[75%] p-4 rounded-2xl text-xl break-all whitespace-pre-wrap text-amber-50">
              {msg.texto}
            </div>
          )}

          {msg.tipo === 'bot' && (
            <div className="flex -ml-3">
              <div>
                <Image src='/icone.png' alt="icone bot" width={70} height={30}></Image>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl max-w-[75%] text-xl break-all whitespace-pre-wrap text-amber-50">
                {msg.texto}
              </div>
            </div>

          )}
        </div>   
      ))}
      
    </div> 
      <div className="max-w-4xl lg:gap-14 lg:mb-14 mx-auto fixed mb-1 flex self-center gap-7 items-center p-4 bottom-0 ">
        <Input value={texto} onChange={(e) => settexto(e.target.value)}></Input>
        <Button disabled={desabilita} onClick={server} ></Button>
      </div>
      <div className="hidden fixed self-center items-center lg:block bottom-0">
          <p className="">© {new Date().getFullYear()} Claudir Dev — Todos os direitos reservados </p>
      </div>
   </div>
  )
}
