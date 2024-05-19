import { ReactNode } from "react"

interface Props {
  children: ReactNode,
  extendClass?: string
}

const Wrap: React.FC<Props> = ({children, extendClass}) => {
  return <div className={`mx-auto px-3 ${extendClass}`}>{children}</div>
};

export default Wrap
