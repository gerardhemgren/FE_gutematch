import React from 'react'
import AuthenticationButton from "./authentication-button";
import constants from '../constants/index';

const Config = ({ playerName, playerPicture }) => {
  const title = constants.CONFIG.title;

  const Profile = () => {
    if (playerName) {
      return (
        <div>
          <img src={playerPicture} alt='profile'/>
          <p>{playerName}</p>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className='config'>
      <div className='title-container'>
        {title}
      </div>
      <div className='profile'>
        <Profile />
        <AuthenticationButton />
      </div>
    </div>
  )
}

export default Config