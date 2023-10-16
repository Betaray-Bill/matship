import React from 'react'
import { useNavigate } from 'react-router-dom'

function Pagenotfound() {
  const navigate = useNavigate()
  const goBack = async() => {
    navigate("/")
  }
  return (
    <div>
      Page not found

      <h2 onClick={goBack}>Back to home</h2>
    </div>
  )
}

export default Pagenotfound
