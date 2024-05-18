import axios from "axios"
import { Question } from "../../models/Question"

const triviaApi = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'

export const fetchQuestions = async (): Promise<Question[]> => {
    try {
      const response = await axios.get(triviaApi)
      const data = response.data
  
      if (!data.results) {
        throw new Error('Invalid API response')
      }
  
      const questions: Question[] = data.results.map((item: Question) => ({
        type: item.type,
        difficulty: item.difficulty,
        category: item.category,
        question: item.question,
        correct_answer: item.correct_answer,
        incorrect_answers: item.incorrect_answers
      }))
  
      return questions
    } catch (error) {
      console.error('Error fetching trivia questions:', error)
      throw error
    }
  }