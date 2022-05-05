import React from 'react';
import AuthenticationButton from "./authentication-button";
import constants from '../../constants/index';

const Account = () => {
  const title = constants.ACCOUNT.title;
  const playerName = localStorage.getItem('player_name');
  const playerPicture = localStorage.getItem('player_picture');

  const Profile = () => {
    if (playerName) {
      return (
        <div>
          <img src={playerPicture} alt='profile' />
          <p>{playerName}</p>
        </div>
      )
    } else {
      return null
    }
  };

  return (
      <div className='account'>
        <div className='title-container'>
          {title}
        </div>
        <div className='profile'>
          <Profile />
          <AuthenticationButton />
        </div>
      </div>
  )
};

export default Account;