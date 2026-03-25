'use client'

interface cardroot extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardRoot({children, ...props}: cardroot) {
    return (
        <div className="flex justify-start">
            <div className="bg-slate-800/80 backdrop-blur-md max-w-[75%] break-all whitespace-pre-wrap rounded-2xl text-xl p-4 text-amber-50">
                {children}
            </div>
         </div>   
    )
}