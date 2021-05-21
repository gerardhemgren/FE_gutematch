import React from 'react'
import AuthenticationButton from "./authentication-button";

import './Config.css'

const Config = ({ source, user }) => {

  const Profile = () => {
    if (user) {
      const { name, picture } = user
      return (
        <div>
          {name}
          <img src={picture} alt='profile-pic'></img>
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
          <AuthenticationButton />
          <Profile />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Config