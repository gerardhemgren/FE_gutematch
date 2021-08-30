import React from 'react'
import AuthenticationButton from "./authentication-button";

const Config = ( {playerName} ) => {

  const Profile = () => {
    if (playerName) {
      return (
        <div>
          {playerName}
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className='config'>
      <div className='profile'>
        <Profile />
        <AuthenticationButton />
      </div>
    </div>
  )
}

export default Config