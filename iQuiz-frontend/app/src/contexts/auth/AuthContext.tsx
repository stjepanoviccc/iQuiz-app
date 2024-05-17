import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { User } from "../../models/User"
import { login, logout } from "../../services/auth"

interface AuthContextType {
  user: string
  isLoggedIn: boolean
  login: (userData: User) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface Props {
  children: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<string>("")

  useEffect(() => {
    if(localStorage.getItem("user") != null) {
      setUser(localStorage.getItem("user") || "")
    }
  }, [user])

  const handleLogin = async (userData: User) => {
    try {
      const { user } = await login(userData)
      setUser(user.username)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleLogout = () => {
    logout()
    setUser("")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user != "" ? true : false,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
