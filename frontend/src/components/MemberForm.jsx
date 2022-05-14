import { useState } from "react"
import axios from "axios"

const MemberForm = ({ setIsLoggedIn, setUserData }) => {
  const [isMember, setIsMember] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const API_URL = "/api/users"

  const handleChange = (e) => {
    if (e.target.type === "text") {
      setFormData({
        ...formData,
        username: e.target.value,
      })
    } else {
      setFormData({
        ...formData,
        password: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isMember) {
      try {
        const response = await axios.post(API_URL + "/login", formData)
        if (response.data) {
          setIsLoggedIn(true)
          setUserData(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await axios.post(API_URL, formData)
        if (response.data) {
          setIsMember(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="member-form-wrapper">
      <div className="member-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">{isMember ? "Giriş Yap" : "Kayıt Ol"}</button>
        </form>
        <span onClick={() => setIsMember(!isMember)}>
          {isMember ? "Hesabınız yok mu?" : "Zaten hesabınız varsa giriş yapın"}
        </span>
      </div>
    </div>
  )
}
export default MemberForm
