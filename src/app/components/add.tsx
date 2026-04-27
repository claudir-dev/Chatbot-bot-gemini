import { IoMdAdd } from "react-icons/io";

interface AddPros {
    aoClicar ?: (e:React.MouseEvent<SVGAElement>) => void
}

export default function Add ({aoClicar, ...pros} : AddPros) {
    return (
        <div className="hover:bg-gray-500/50 absolute w-20 h-7 left-7 transition-all duration-300 max-w-6 rounded-full flex justify-center items-center">
                <IoMdAdd className="text-black scale-130 cursor-pointer relative" onClick={aoClicar} ></IoMdAdd>
        </div>
    )
}