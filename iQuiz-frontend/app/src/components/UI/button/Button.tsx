import { ReactNode } from "react"

interface ButtonProps {
    extendClass?: string 
    onClick?: () => void 
    type: "button" | "submit" | "reset" | undefined
    children: ReactNode
}

const Button:React.FC<ButtonProps> = ({ extendClass, onClick, type, children }) => {
    return (
        <button className={`px-4 py-2 border-2 font-bold transition duration-300 rounded-lg hover:cursor-pointer ${extendClass}`} 
                onClick={onClick} type={type}>
            {children}
        </button>
    )
}

export default Button