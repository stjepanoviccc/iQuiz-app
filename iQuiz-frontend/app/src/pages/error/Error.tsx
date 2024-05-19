import Wrap from "../../components/UI/wrap"
import Error from "../../components/UI/error"
import Logo from "../../components/UI/logo"

const ErrorPage: React.FC = () => {

  // i will logout user here on entering this page.
  
  return (
    <Wrap extendClass="bg-primary w-full h-[100vh] flex flex-col justify-center items-center gap-y-4">
      <Logo />
      <Error />
    </Wrap>
  )
}

export default ErrorPage
