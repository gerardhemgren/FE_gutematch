import React from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  // global condition must be deleted 
  if (localStorage.getItem('s') === 'undefined') {
    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  } else {
    return <LogoutButton />
  }

};

export default AuthenticationButton;