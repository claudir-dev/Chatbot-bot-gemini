'use client'
import Image from "next/image"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Adicionei essa prop para facilitar
}

export default function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      // O botão só escala se NÃO estiver desativado
      className={`
        max-w-20 flex-none transition-all duration-300
        ${props.disabled ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:scale-125 cursor-pointer active:scale-90'}
      `}
    >
      <div className="relative">
        <Image
          src="/enviar.png"
          alt="Ícone de enviar"
          width={30}
          height={50}
          // Se estiver carregando, a imagem fica pulsando
          className={props.disabled ? 'animate-pulse' : ''}
        />
        
        {/* Um pequeno brilho azul atrás quando estiver pronto */}
        {!props.disabled && (
          <div className="absolute inset-0 bg-blue-500/20 blur-xl -z-10 rounded-full"></div>
        )}
      </div>
      {children}
    </button>
  )
}