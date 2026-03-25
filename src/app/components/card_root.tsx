'use client'

interface cardroot extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardRoot({children, ...props}: cardroot) {
    return (
        <div className="flex justify-end">
            <div className="bg-blue-500 backdrop-blur-md max-w- h-40 rounded-2xl text-xl p-4 text-amber-50">
                {children}
            </div>
         </div>   
    )
}