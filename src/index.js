import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import UserId from './auth/UserId';

ReactDOM.render(
  <React.StrictMode>
      <Auth0ProviderWithHistory>
        <UserId>
          <App />
        </UserId>
      </Auth0ProviderWithHistory>
  </React.StrictMode>,
  document.getElementById("root")
);