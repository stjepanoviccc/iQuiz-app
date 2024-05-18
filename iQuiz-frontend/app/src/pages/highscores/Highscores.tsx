import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"
import { Link } from 'react-router-dom'
import { findAll } from '../../services/highscore'
import { Highscore } from '../../models/Highscore'
import Wrap from '../../components/UI/wrap'
import Logo from '../../components/UI/logo'
import Button from '../../components/UI/button'

const Highscores: React.FC = () => {
    const [highscores, setHighscores] = useState<Highscore[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHighscores = async () => {
            try {
                const highscoresData = await findAll()
                setHighscores(highscoresData)
            } catch (error) {
                console.error('Error fetching highscores:', error)
            }
        }

        fetchHighscores()
    }, [])

    const handleLogout = () => {
        logout()
        navigate("/")
      }

    return (
        <Wrap extendClass='flex flex-col gap-y-4 text-white text-center'>
            <Logo />
            <h2 className='text-4xl font-bold'>BEST 5</h2>
            <ul>
                {highscores.map((highscore, index) => (
                    <li key={index} className="text-xl font-bold">
                        {highscore.username}: {highscore.score} pts
                    </li>
                ))}
            </ul>
            <Link to="/game">
                <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white mt-4" type="button">START GAME</Button>
          </Link>
          <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button" onClick={handleLogout}>LOG OUT</Button>
        </Wrap>
    )
}

export default Highscores
