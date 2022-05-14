import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Header from "./components/Header"
import Quiz from "./pages/Quiz"
import CreateQuiz from "./pages/CreateQuiz"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState("")
  return (
    <>
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route
            path="/create-quiz"
            element={<CreateQuiz userData={userData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
