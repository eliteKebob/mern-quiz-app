import { useState } from "react"
import axios from "axios"
import SingleQuestion from "../components/SingleQuestion"

const Quiz = () => {
  const [questions, setQuestions] = useState("")
  const [quizStart, setQuizStart] = useState(false)

  const API_URL = "/api/quiz"

  const fetchQuiz = async () => {
    setQuizStart(true)
    try {
      const response = await axios.get(API_URL)
      if (response.data) {
        setQuestions(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="quiz-wrapper">
      {quizStart ? (
        <SingleQuestion questions={questions} setQuizStart={setQuizStart} />
      ) : (
        <button className="func-btn" onClick={fetchQuiz}>
          Başlat
        </button>
      )}
    </div>
  )
}
export default Quiz
