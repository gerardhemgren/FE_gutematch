import React from 'react'
import './Config.css'

const Config = ({ source }) => {

  const setU = () => {
    localStorage.setItem('userId', 5)
  }

  if (source === 'config') {
    return (
      <div className='config'>
        <div>
          <button onClick={() => setU()}>Log In</button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Config