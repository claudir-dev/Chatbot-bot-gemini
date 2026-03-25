'use client'
import { Children } from "react";

interface Diprops extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardErro({children, ...props}: Diprops) {
    return (
        <div className=" absolute self-center mt-39 z-50">
            <div className="bg-red-600 text-black text-xl font-bold animate-flutuar flex rounded-2xl justify-center items-center  r h-30 w-60">
                <p>{children}</p>
            </div>
        </div>
    )
}