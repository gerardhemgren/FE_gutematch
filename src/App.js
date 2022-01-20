import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MatchPage from './components/MatchesPage'
import CreateMatch from './components/CreateMatch'
import Message from './components/Message';
import Config from './components/Config';

import constants from './constants/index'
import icons from './icons/icons';
import './css/Styles.css';
import { User } from './auth/UserId';

function App() {
  // MESSAGES
  const [apiMessage, setApiMessage] = useState('');
  const closeMessage = () => {
    const res = apiMessage
    if (res) {
      setTimeout(() => {
        setApiMessage('')
      }, 8000);
    }
  }

  // NAVIGATION
  const [path, setPath] = useState();
  const [renderSwitch, setRenderSwitch] = useState(false)

  useEffect(() => {
    setPath(window.location.pathname)
  }, [renderSwitch])

  const handleFocusIcon = () => {
    setPath(window.location.pathname)
  }

  const user = useContext(User)

  const ConditionalSwitch = () => { 
    if (user === 'no user') {
      return (
        <Switch>
          <Route exact path={"/" || constants.CONFIG.path}>
            <Config />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route exact path="/">
            <MatchPage />
          </Route>
          <Route path={constants.OPEN_MATCHES.path}>
            <MatchPage handleFocusIcon={() => handleFocusIcon()} />
          </Route>
          <Route path={constants.MY_MATCHES.path}>
            <MatchPage />
          </Route>
          <Route path={constants.CREATE_MATCH.path}>
            <CreateMatch handleFocusIcon={() => handleFocusIcon()} />
          </Route>
          <Route path={constants.CONFIG.path}>
            <Config />
          </Route>
        </Switch>
      )
    }
  }

  return (
    <Router>
      <div className='app'>
        <div className='fixed-background' />
        <div className='header'>
          <div className='topbar-container'>
            <div className='logo'>
              gute<span>match</span>
            </div>
            <Link to={constants.CONFIG.path}
              onClick={() => setRenderSwitch(!renderSwitch)}
              className={`${path === constants.CONFIG.path ? 'account-button focus' : 'account-icon'}`}              >
              <img src={icons.settingsIcon} alt={constants.CONFIG.title} className='settings-icon' width="22" height="22" />
            </Link>
          </div>
          <div className='message-container'>
            <Message msg={apiMessage} action={closeMessage()} />
          </div>
        </div>

        <div className='main'>
          {user === null ? null : <ConditionalSwitch />}
        </div>

        {user !== 'no user'
          ? <div className='navbar'>
            <Link to={constants.OPEN_MATCHES.path}
              onClick={() => setRenderSwitch(!renderSwitch)}>
              <img src={icons.openMatchesIcon}
                alt={constants.OPEN_MATCHES.title}
                className={`${path === constants.OPEN_MATCHES.path || path === '/' ? 'focus' : 'nav-icon'}`}
                width="20" height="20"
              />
            </Link>
            <Link to={constants.CREATE_MATCH.path}
              onClick={() => setRenderSwitch(!renderSwitch)}>
              <img src={icons.createMatchIcon}
                alt={constants.CREATE_MATCH.title}
                className={`${path === constants.CREATE_MATCH.path ? 'focus' : 'nav-icon'}`}
                width="22" height="22"
              />
            </Link>
            <Link to={constants.MY_MATCHES.path}
              onClick={() => setRenderSwitch(!renderSwitch)}>
              <img src={icons.myMatchesIcon}
                alt={constants.MY_MATCHES.title}
                className={`${path === constants.MY_MATCHES.path ? 'focus' : 'nav-icon'}`}
                width="22" height="22"
              />
            </Link>
          </div>
          : null}
      </div>
    </Router >
  )
}

export default App;