import React from 'react'
import AuthenticationButton from "./authentication-button";

const Config = ({ user }) => {
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