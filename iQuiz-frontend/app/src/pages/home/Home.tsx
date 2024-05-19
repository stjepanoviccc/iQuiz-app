import { useAuth } from "../../contexts/auth"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"
import Logo from "../../components/UI/logo"
import Wrap from "../../components/UI/wrap"
import Button from "../../components/UI/button"

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div>
      {isLoggedIn && (
        <Wrap extendClass="flex flex-col justify-center items-center gap-y-4">
          <Logo />
          <Link to="/game">
            <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button">START GAME</Button>
          </Link>
          <Link to="/highscores">
            <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button">HIGHSCORE</Button>
          </Link>
          <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button" onClick={handleLogout}>LOG OUT</Button>
        </Wrap>
      )}
    </div>
  )
}

export default Home
