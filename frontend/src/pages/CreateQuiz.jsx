import { useState, useEffect } from "react"
import axios from "axios"
import mark from "../assets/qmark.png"
import { useNavigate } from "react-router-dom"

const CreateQuiz = ({ userData }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer1: {
      text: "",
      isCorrect: false,
    },
    answer2: {
      text: "",
      isCorrect: false,
    },
    answer3: {
      text: "",
      isCorrect: false,
    },
    answer4: {
      text: "",
      isCorrect: false,
    },
  })
  const [answerSelected, setAnswerSelected] = useState(false)
  const [answer, setAnswer] = useState("")

  const navigate = useNavigate()
  const API_URL = "/api/quiz"
  const token = userData?.token

  const handleChange = (e) => {
    if (e.target.name === "question") {
      setFormData((prevState) => ({ ...prevState, question: e.target.value }))
    }
    if (e.target.type === "text") {
      let formDataCopy = { ...formData }
      formDataCopy[e.target.name].text = e.target.value
      setFormData(formDataCopy)
    }
    if (e.target.tagName === "SPAN") {
      if (!answerSelected) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: {
            isCorrect: true,
            text: prevState[e.target.id].text,
          },
        }))
        setAnswerSelected(true)
        setAnswer(`${e.target.id}`)
      }
      if (answerSelected) {
        let formDataCopy = { ...formData }
        formDataCopy.answer1.isCorrect = false
        formDataCopy.answer2.isCorrect = false
        formDataCopy.answer3.isCorrect = false
        formDataCopy.answer4.isCorrect = false
        setFormData(formDataCopy)
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: {
            isCorrect: true,
            text: prevState[e.target.id].text,
          },
        }))
        setAnswer(`${e.target.id}`)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let config = {
        method: "post",
        url: `${API_URL}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      }
      const response = await axios(config)
      if (response.data) {
        console.log(response.data)
        setFormData({
          question: "",
          answer1: {
            text: "",
            isCorrect: false,
          },
          answer2: {
            text: "",
            isCorrect: false,
          },
          answer3: {
            text: "",
            isCorrect: false,
          },
          answer4: {
            text: "",
            isCorrect: false,
          },
        })
        setAnswerSelected(false)
        setAnswer("")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userData === "") {
      navigate("/")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="cq-wrapper">
      <img src={mark} alt="questionmark" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>SORU</h2>
        <input
          type="text"
          value={formData.question}
          onChange={(e) => handleChange(e)}
          name="question"
          placeholder="Sorunuzu buraya yazın..."
        />
        <h2>CEVAPLAR</h2>
        <div className="cq-answers">
          <label htmlFor="answer1">A&#41;</label>
          <input
            type="text"
            value={formData.answer1.text}
            onChange={(e) => handleChange(e)}
            name="answer1"
          />
          <label htmlFor="answer2">B&#41;</label>
          <input
            type="text"
            value={formData.answer2.text}
            onChange={(e) => handleChange(e)}
            name="answer2"
          />
          <label htmlFor="answer3">C&#41;</label>
          <input
            type="text"
            value={formData.answer3.text}
            onChange={(e) => handleChange(e)}
            name="answer3"
          />
          <label htmlFor="answer4">D&#41;</label>
          <input
            type="text"
            value={formData.answer4.text}
            onChange={(e) => handleChange(e)}
            name="answer4"
          />
        </div>
        <h3>Doğru Seçeneği İşaretle</h3>
        <div className="cq-correct-answer">
          <span
            onClick={(e) => handleChange(e)}
            id="answer1"
            className={answer === "answer1" ? "selected-span" : ""}
          >
            A
          </span>
          <span
            onClick={(e) => handleChange(e)}
            id="answer2"
            className={answer === "answer2" ? "selected-span" : ""}
          >
            B
          </span>
          <span
            onClick={(e) => handleChange(e)}
            id="answer3"
            className={answer === "answer3" ? "selected-span" : ""}
          >
            C
          </span>
          <span
            onClick={(e) => handleChange(e)}
            id="answer4"
            className={answer === "answer4" ? "selected-span" : ""}
          >
            D
          </span>
        </div>
        <button type="submit" id="btn">
          Soruyu Yayınla
        </button>
      </form>
    </div>
  )
}
export default CreateQuiz
