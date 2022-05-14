import Logo from "../assets/logo.png"
import User from "../assets/user.png"
import { useState } from "react"
import MemberForm from "./MemberForm"
import Member from "./Member"
import { useNavigate } from "react-router-dom"

const Header = ({ isLoggedIn, setIsLoggedIn, userData, setUserData }) => {
  const [showForm, setShowForm] = useState(false)

  const navigate = useNavigate()

  return (
    <>
      <div className="header-mid">
        <img src={Logo} alt="brand" id="brand" onClick={() => navigate("/")} />
        <div className="header-user-section">
          {isLoggedIn ? (
            <>
              <div className="nav-links">
                <p onClick={() => navigate("/")}>Quiz</p>
                <p onClick={() => navigate("/create-quiz")}>Soru Gönder</p>
              </div>
              <Member
                userData={userData}
                setUserData={setUserData}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          ) : (
            <>
              <img
                src={User}
                alt="user"
                onClick={() => setShowForm(!showForm)}
                id="hus-img"
              />
              {showForm ? (
                <MemberForm
                  setIsLoggedIn={setIsLoggedIn}
                  setUserData={setUserData}
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default Header
