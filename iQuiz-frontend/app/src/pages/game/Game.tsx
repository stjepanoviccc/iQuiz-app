import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { fetchQuestions } from "../../services/triviaApi"
import HighscoreForm from "../../components/forms/highscore"
import Wrap from "../../components/UI/wrap"
import Button from "../../components/UI/button"
import Logo from "../../components/UI/logo"
import { Question } from "../../models/Question"

const Game: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)
  const [failed, setFailed] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getQuestions()
  }, [])

  const getQuestions = async () => {
    try {
      const fetchedQuestions = await fetchQuestions()
      setQuestions(fetchedQuestions)
      setCurrentQuestionIndex(0)
    } catch (error) {
      setError("Failed to fetch questions")
    }
  }

  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex]

    if (selectedAnswer === currentQuestion.correct_answer) {
      incrementPoints()
      handleNextQuestion()
    } else {
      setFailed(true)
    }
  }

  const incrementPoints = () => {
    setPoints((prev) => prev + 1)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      getQuestions()
    }
  }

  if (error || !isLoggedIn) {
    navigate("/error")
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div>
      {(isLoggedIn && !failed) && (
        <Wrap extendClass="flex flex-col justify-center items-center gap-y-4 text-white text-center">
          <div>
            <p className="font-bold">PTS: {points}</p>
            <p className="font-bold">USER: {user}</p>
          </div>
          <Logo />
          <div>
            <p className="font-bold" dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}/>
          </div>
          <div>
            {currentQuestion?.incorrect_answers
              .concat(currentQuestion.correct_answer)
              .sort()
              .map((answer, index) => (
                <Button key={index} extendClass="hover:bg-white hover:text-primary m-2" type="button" onClick={() => handleAnswerClick(answer)}>
                  <p dangerouslySetInnerHTML={{ __html: answer }} />
                </Button>
              ))}
          </div>
        </Wrap>
      )}
      {failed && (
          <div className="flex flex-col gap-y-2 text-white text-center font-bold">
            <Logo />
            <p className="text-xl">Your answer isn't correct.</p>
            <p className="text-xl">You have {points} points.</p>
            <HighscoreForm points={points} />
            <Link to="/home">
              <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button">
                Home
              </Button>
            </Link>
          </div>
      )}
    </div>
  )
}

export default Game
