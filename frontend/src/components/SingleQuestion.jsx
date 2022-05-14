import { useState, useEffect } from "react"

const SingleQuestion = ({ questions, setQuizStart }) => {
  const [currentQ, setCurrentQ] = useState("")
  const [pickedQuestions, setPickedQuestions] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [showRestart, setShowRestart] = useState(false)

  const pickQs = () => {
    const shuffledQs = [...questions].sort(() => 0.5 - Math.random())
    const sliceto5 = shuffledQs.slice(0, 5)
    setPickedQuestions(sliceto5)
  }

  const compareAnswers = () => {
    if (userAnswer === correctAnswer) {
      alert("Doğru Cevap")
    } else {
      alert(`Yanlış Cevap`)
    }
  }

  const findAnswer = () => {
    let arr = []
    arr.push(pickedQuestions[currentQ])
    if (arr[0]?.answer1.isCorrect === true) {
      setCorrectAnswer("answer1")
    }
    if (arr[0]?.answer2.isCorrect === true) {
      setCorrectAnswer("answer2")
    }
    if (arr[0]?.answer3.isCorrect === true) {
      setCorrectAnswer("answer3")
    }
    if (arr[0]?.answer4.isCorrect === true) {
      setCorrectAnswer("answer4")
    }
  }

  useEffect(() => {
    if (currentQ < 5) {
      findAnswer()
      setUserAnswer("")
    }
    if (currentQ === 4) {
      setShowRestart(true)
    }
    // eslint-disable-next-line
  }, [currentQ])

  useEffect(() => {
    findAnswer()
    // eslint-disable-next-line
  }, [userAnswer])

  useEffect(() => {
    pickQs()
    setCurrentQ(0)
    setUserAnswer("")
    // eslint-disable-next-line
  }, [questions])

  return (
    <div className="sq-wrapper">
      <div className="sq-question">
        <img src={pickedQuestions[currentQ]?.photo} alt="" />
        <p>{pickedQuestions[currentQ]?.question}</p>
      </div>
      <div className="sq-answers-wrapper">
        <div className="sq-answers">
          <p
            onClick={() => setUserAnswer("answer1")}
            className={userAnswer === "answer1" ? "active-user-answer" : ""}
          >
            A&#41; {pickedQuestions[currentQ]?.answer1?.text}
          </p>
          <p
            onClick={() => setUserAnswer("answer2")}
            className={userAnswer === "answer2" ? "active-user-answer" : ""}
          >
            B&#41; {pickedQuestions[currentQ]?.answer2?.text}
          </p>
        </div>
        <div className="sq-answers">
          <p
            onClick={() => setUserAnswer("answer3")}
            className={userAnswer === "answer3" ? "active-user-answer" : ""}
          >
            C&#41; {pickedQuestions[currentQ]?.answer3?.text}
          </p>
          <p
            onClick={() => setUserAnswer("answer4")}
            className={userAnswer === "answer4" ? "active-user-answer" : ""}
          >
            D&#41; {pickedQuestions[currentQ]?.answer4?.text}
          </p>
        </div>
      </div>
      {userAnswer !== "" ? (
        <button className="func-btn" onClick={() => compareAnswers()}>
          Cevapları Karşılaştır
        </button>
      ) : (
        ""
      )}
      {currentQ < 4 ? (
        <button className="func-btn" onClick={() => setCurrentQ(currentQ + 1)}>
          Sıradaki Soru
        </button>
      ) : (
        ""
      )}
      {showRestart ? (
        <button className="func-btn" onClick={() => setQuizStart(false)}>
          Yeniden Başlat
        </button>
      ) : (
        ""
      )}
    </div>
  )
}
export default SingleQuestion
