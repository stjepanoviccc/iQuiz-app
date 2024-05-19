import RegisterForm from "../../components/forms/register"
import Logo from "../../components/UI/logo"

const Register: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
       <Logo />
      <div className="bg-white border-2 border-primary px-12 py-8 shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center gap-y-8">
          <h2 className="text-3xl font-bold">Register / Sign Up</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register
