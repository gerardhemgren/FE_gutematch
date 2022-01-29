import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  
  // logout func must be placed on onClick
  const { logout } = useAuth0();

  const deleteLocalStorage = () => {
    localStorage.removeItem('player_id')
    localStorage.removeItem('player_name')
    localStorage.removeItem('player_picture') 
    localStorage.setItem('player', false)
    logout({ returnTo: window.location.origin })
  }

  return (
    <button
      className='logout-button'
      onClick={() => deleteLocalStorage()}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;