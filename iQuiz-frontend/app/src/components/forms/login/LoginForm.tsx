import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/auth"
import Button from "../../UI/button"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userData = { username, password }
      await login(userData)
      setUsername("")
      setPassword("")
      navigate("/home")
    } catch (error) {
      setErrorMsg("Login failed.")
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-y-6">
      <input
        className="input"
        placeholder="Username"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg != "" && <p className="err">{errorMsg}</p>}

      <div className="flex flex-row justify-between items-center">
        <Button
          extendClass="bg-primary hover:bg-white border-primary text-white hover:text-primary"
          type="submit"
        >
          Sign In
        </Button>
        <div className="flex flex-col items-center">
          <p>No account?</p>
          <Link to="/auth/register" className="underline">
            Sign Up!
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
