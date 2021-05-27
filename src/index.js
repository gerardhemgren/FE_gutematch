import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import './index.css';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <div className='app'>
        <App />
      </div>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);