import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  // fake-logout
  const addUserLocalStorage = () => {
    localStorage.setItem('player_id', 0)
    localStorage.setItem('player_name', 'Guest User')
    localStorage.setItem('player_picture', '/gutematch.png')
    logout({ returnTo: window.location.origin })
  }
  return (
    <div>
      <button
        className='login-button'
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
      <button
        className='guest-login-button'
        onClick={() => addUserLocalStorage()}
      >
        Guest log in
      </button>
    </div>
  );
};

export default LoginButton;