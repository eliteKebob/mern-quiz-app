const Member = ({ userData, setUserData, setIsLoggedIn }) => {
  const handleClick = () => {
    setUserData({})
    setIsLoggedIn(false)
  }
  return (
    <div className="member-data">
      <img src={userData?.photo} alt="user" />
      <p>{userData?.username}</p>
      <span onClick={() => handleClick()}>Çıkış Yap</span>
    </div>
  )
}
export default Member
