import React from 'react'
import AuthenticationButton from "./authentication-button";

// import './Config.css'

const Config = ({ source, user }) => {
  const Profile = () => {
    if (user) {
      const { lsName } = user
      return (
        <div>
          {lsName}
        </div>
      )
    } else {
      return null
    }
  }

  if (source === 'config') {
    return (
      <div className='config'>
        <div className='profile'>
          <Profile />
          <AuthenticationButton />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Config