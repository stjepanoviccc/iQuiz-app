import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { register } from "../../../services/auth"
import Button from "../../UI/button"

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const userData = { username, password }
        await register(userData)
        setUsername('')
        setPassword('')
        navigate("/auth/login")
    }  catch (error) {
        setErrorMsg("Registration failed.")
    }
};

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-y-6">
      <input className="input" placeholder="Username" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="input" placeholder="Password" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      { errorMsg != "" && <p className="err">{errorMsg}</p> }
      
      <div className="flex flex-row justify-between items-center">
        <Button extendClass="bg-primary hover:bg-white border-primary text-white hover:text-primary" type="submit">
          Register
        </Button>
        <div className="flex flex-col items-center">
          <p>Have account?</p>
          <Link to="/auth/login" className="underline">
            Sign In!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm