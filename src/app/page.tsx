'use client'
import Image from "next/image";
import Navbar from "./components/navabar";
import Button from "./components/button"
import Input from "./components/input";
import CardErro from "./components/card_error";
import Carregar from "./components/animacao";
import Add from "./components/add";
import Ativo from "./components/card_ativo";
import Desativado from "./components/card_desativo";
import { use, useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import { constants } from "buffer";

export default function Home() {

  const [texto, settexto] = useState('')
  const [messagens, setmessagens] = useState('')
  const [desabilita, setdesabilita] = useState(false)
  const [invalido, setinvalido] = useState(false)
  const [rootMsg, setrootMsg] = useState('')
  const [animacao, setanimacao] = useState(false)
  const [carregando, setcarregando] = useState(true)
  const [saldacao, setsaldacao] = useState(true)
  const [render, setrender] = useState(true)
  const [rolagem, setrolagem] = useState(false)
  const [transion, settransion] = useState(false)
  const [audio, setaudio] = useState(false)
  const [ativoVisible, setAtivoVisible] = useState(false)
  const [desativadoVisible, setDesativadoVisible] = useState(false)
  const [Cardativo, setCardativo] = useState(false)
  const [desativado, setdesativado] = useState(false)
  const [card, setcard] = useState(false)
  const [user, setuser] = useState<Mensagem[]>([])
  const chatref = useRef<HTMLDivElement>(null)
  const timerSumir = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  useEffect(() => {
    if(!saldacao) {
      const timer = setTimeout(() => {
        setrender(false)
        setrolagem(true)
      }, 700)
      return () => (clearTimeout(timer))
    } 
  },[saldacao])

  const FecharCard = () => {
    settransion(false)
    setTimeout(() => {
      setcard(false)
    },300)
  }

  useEffect(() => {
    if(card) {
      settransion(false)
      const interval = setTimeout(() => {
        settransion(true)
      },300)

      return () => clearTimeout(interval)
    }
  }, [card])

useEffect(() => {
  let aparecer: ReturnType<typeof setTimeout>;
  let sumir: ReturnType<typeof setTimeout>;
  let remover: ReturnType<typeof setTimeout>;

  // --- REGRA DE OURO: LIMPEZA TOTAL NO INÍCIO DO EFEITO ---
  if (timerSumir.current) clearTimeout(timerSumir.current);

  if (audio) {
    // 1. Mata o card "desativado" imediatamente para não sobrepor
    setdesativado(false);
    setDesativadoVisible(false);

    // 2. Inicia o card "ativo"
    setCardativo(true);
    setAtivoVisible(false);

    aparecer = setTimeout(() => {
      setAtivoVisible(true);
    }, 10);

    timerSumir.current = setTimeout(() => {
      setAtivoVisible(false);
      remover = setTimeout(() => {
        setCardativo(false);
      }, 700);
    }, 3000);

  } else {
    // 1. Mata o card "ativo" imediatamente
    setCardativo(false);
    setAtivoVisible(false);

    // 2. Inicia o card "desativado"
    setdesativado(true);
    setDesativadoVisible(false);

    aparecer = setTimeout(() => {
      setDesativadoVisible(true);
    }, 10);

    sumir = setTimeout(() => {
      setDesativadoVisible(false);
      remover = setTimeout(() => {
        setdesativado(false);
      }, 700);
    }, 3000);
  }

  return () => {
    clearTimeout(aparecer);
    clearTimeout(sumir);
    clearTimeout(remover);
    if (timerSumir.current) clearTimeout(timerSumir.current);
  };
}, [audio]);


  if(carregando) {
    return <Carregar/>
  }

    type Mensagem = {
      texto:string, tipo: 'user' | 'bot' | 'loading' | 'error',
    }

  

  const ReproduzirTexto = (textoAudio: string) => {
   if(audio) {
      const mensagem = textoAudio.replace(/\*\*/g, '').replace(/\p{Extended_Pictographic}/gu, '').trim()
      const vozes = speechSynthesis.getVoices()
      const utterance  = new SpeechSynthesisUtterance(mensagem)
      utterance.rate = 2
      utterance.pitch = 1
      utterance.voice = vozes.find(voz => voz.lang.includes("pt-BR")) ?? null
      speechSynthesis.speak(utterance)

      return utterance
    }
    else {
      return
    }
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

      if(user.length === 0) {
        setsaldacao(false)
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
        const textoAudio = response.text

        ReproduzirTexto(textoAudio)

        if(!req.ok) {
          setuser((prev) => [
            ...prev.filter(msg => msg.tipo !== 'loading')
          ])
          console.log(response.error)
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
        setmessagens('Erro interno na requisição para api.')
        setinvalido(true)
        setTimeout(() => {  
          setinvalido(false)
        },6000)
        

      } finally {
        setdesabilita(false)
      }  
    }

  }

  return (
   <div ref={chatref} className={`h-svh flex flex-col ${rolagem? 'overflow-y-auto scroll-hidden' : ''}`}>
    <Navbar></Navbar>
    {invalido && (
      <CardErro>{messagens}</CardErro>
    )}

    {Cardativo && (
      <Ativo className={` transition-all will-change-transform duration-700 ease-out ${ativoVisible? 'opacity-100 scale-100 translate-y-0':'opacity-0 scale-80 translate-y-5'}`}></Ativo>
    )}
    {desativado && (
      <Desativado className={` transition-all will-change-transform duration-700 ease-out ${desativadoVisible? 'opacity-100 scale-100 translate-y-0':'opacity-0 scale-80 translate-y-5'}`}></Desativado>
    )}

    {card && (
      <div className={`fixed font-sans lg:left-83 lg:bottom-10 bg-slate-900 rounded-2xl left-3 bottom-10 w-70 transition-all duration-300 ease-out p-8 z-50 ${transion? 'opacity-100 scale-100 translate-y-0': 'opacity-0 scale-90 translate-y-10'}`}>
        <div className="relative left-53  -top-4">
          <FaX className="cursor-pointer hover:scale-115 transition-all duration-300" onClick={FecharCard}></FaX>
        </div>
        <div >
          <div className="flex justify-center rounded-2xl bg-indigo-950 p-5 gap-2.5 mb-4 items-center">
            <label className="font-semibold">Habilitar audio</label>
              <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={audio} onChange={(e) => setaudio(e.target.checked)} className="sr-only peer" />

              <div className="w-12 h-7 bg-gray-500 rounded-full transition-colors duration-300 peer-checked:bg-green-500"></div>

              <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
            </label>
          </div>
          <div className="text-center">
            <p>Habilitando essa função, a IA responderá com áudio</p>
          </div>
        </div>
      </div>
    )}

      {render && (
        <div className={`transition-opacity z-0 duration-700 flex justify-center items-center lg:mt-70 mt-72 md:mt-60 ${saldacao ? 'opacity-100': 'opacity-0'}`}>
          <p className="text-white text-center sm:text-5xl text-4xl font-semibold mx-2">Seja bem vindo!! <span className=" block mt-2 text-blue-400 sm: text-4xl">pequeno gafanhoto</span></p>
        </div>
      )}
      <div  className=" flex-1 flex-col space-y-8 lg:mb-20 mb-10 m-2 mt-90 p-4 pb-24 ">
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
              <div className="bg-blue-500 ml-auto max-w-[75%] p-4 rounded-2xl text-xl break-all sm:text-wrap whitespace-pre-wrap text-amber-50">
                {msg.texto}
              </div>
            )}

            {msg.tipo === 'bot' && (
              <div className="flex -ml-3">
                <div>
                  <Image src='/icone.png' alt="icone bot" width={70} height={30}></Image>
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl max-w-[75%] text-xl break-all sm:text-wrap whitespace-pre-wrap text-amber-50">
                  {msg.texto}
                </div>
              </div>

            )}
          </div>   
        ))}
 
      
    </div> 
      <div className=" max-w-4xl lg:gap-14 lg:mb-14 mx-auto fixed z-0 mb-1 flex self-center gap-7 items-center p-4 bottom-0 ">
        <Add aoClicar={MostraCard => (setcard(true))}></Add>
        <Input value={texto} onChange={(e) => settexto(e.target.value)}></Input>
        <Button className="lg:b-7" disabled={desabilita} onClick={server} ></Button>
      </div>
      <div className="hidden fixed self-center items-center lg:block bottom-0">
          <p className="">© {new Date().getFullYear()} Claudir Dev — Todos os direitos reservados </p>
      </div>
   </div>
  )
}
