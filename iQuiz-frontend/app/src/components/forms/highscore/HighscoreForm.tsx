import React from "react"
import { useAuth } from "../../../contexts/auth"
import { useNavigate } from "react-router-dom"
import { create } from "../../../services/highscore"
import Button from "../../UI/button"

const HighscoreForm: React.FC<{ points: number }> = ({ points }) => {
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    create(points, user)
    setTimeout(() => {navigate("/highscores")}, 1000)
  }

  return (
    isLoggedIn && (
      <form className="flex flex-col gap-y-2 text-white text-center font-bold" onSubmit={handleSubmit}>
        <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white mt-4" type="submit">
          Submit Score
        </Button>
      </form>
    )
  )
}

export default HighscoreForm