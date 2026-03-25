'use client'
interface carduser extends React.HTMLAttributes<HTMLDivElement> {}
export default function CardUser({children, ...props}: carduser) {
    return (
        <div className="w-60 h-40 bg-slate-800/80 backdrop-blur-md rounded-2xl text-xl p-4 text-amber-50">
            {children}
        </div>
    )
}