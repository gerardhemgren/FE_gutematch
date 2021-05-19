import React from 'react'
import AuthenticationButton from "./authentication-button";

import './Config.css'

const Config = ({ source }) => {

  const setU = () => {
    localStorage.setItem('userId', 5)
  }

  if (source === 'config') {
    return (
      <div className='config'>
        <div className="navbar-nav ml-auto">
          <AuthenticationButton />
        </div>
        <div>
          <button onClick={() => setU()}>Log In with 'Test User'</button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Config