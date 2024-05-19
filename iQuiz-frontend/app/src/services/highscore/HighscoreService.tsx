import axios from "../../config/axios"
import { Highscore } from "../../models/Highscore"

const baseUrl = '/api/v1/highscores'

export const create = async (score: number, username: string): Promise<Highscore> => {
  return (await axios.post(`${baseUrl}`, {score, username})).data
}

export const findAll = async (): Promise<Highscore[]> => {
  return (await axios.get(`${baseUrl}`)).data
}

