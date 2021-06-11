import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  // logout func must be placed on onClick
  const resetLs = () => {
    localStorage.setItem('i', 0)
    localStorage.setItem('s', 'undefined')
    logout({ returnTo: window.location.origin })
  }

  return (
    <button
      className='action-button logout-button secondary'
      onClick={() =>
        resetLs()
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;