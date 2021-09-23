import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import userService from './services/users';

import { useAuth0 } from '@auth0/auth0-react';

import MatchPage from './components/MatchesPage'
import MatchForm from './components/MatchForm'
import Message from './components/Message';
import Config from './components/Config';

import constants from './constants/index'
import icons from './icons/icons';
import './css/Styles.css';

function App() {
  // USER
  const playerIdFromLocalStorage = localStorage.getItem('player_id');
  const playerNameFromLocalStorage = localStorage.getItem('player_name');

  const { user } = useAuth0();
  const [playerId, setPlayerId] = useState(Number(playerIdFromLocalStorage) || 0);

  // USER CYCLE
  useEffect(() => {
    if (user) {
      const userInfo = {
        sub: user.sub,
        name: user.name
      }
      userService
        .logIn_signUp(userInfo)
        .then(async res => {
          setPlayerId(await res[0].id)
          localStorage.setItem('player_id', await res[0].id)
          localStorage.setItem('player_name', await res[0].name)
        })
    }
  }, [user, playerId])

  // MATCHES
  const [apiMessage, setApiMessage] = useState('');

  // MESSAGES
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
              className={`${path === constants.CONFIG.path ? 'display-none' : 'config-button'}`}>
              <img src={icons.settingsIcon} alt={constants.CONFIG.title} className='settings-icon' width="20" height="20" />
            </Link>
          </div>
          <div className='message-container'>
            <Message msg={apiMessage} action={closeMessage()} />
          </div>
        </div>
        <div className='main'>
          <Switch>{
            <Route exact path="/">
              <MatchPage props={playerId} />
            </Route>}
            <Route path={constants.ALL_MATCHES.path}>
              <MatchPage props={playerId} />
            </Route>
            <Route path={constants.OPEN_MATCHES.path}>
              <MatchPage props={playerId} />
            </Route>
            <Route path={constants.MY_MATCHES.path}>
              <MatchPage props={playerId} />
            </Route>
            <Route path={constants.CREATE_MATCH.path}>
              <MatchForm props={playerId} />
            </Route>
            <Route path={constants.CONFIG.path}>
              <Config playerName={playerNameFromLocalStorage} />
            </Route>
          </Switch>
        </div>
        <div className='navbar'>
          {playerId !== 0 ?
            <Link to={constants.OPEN_MATCHES.path}
              onClick={() => setRenderSwitch(!renderSwitch)}>
              <img src={icons.openMatchesIcon}
                alt={constants.OPEN_MATCHES.title}
                className={`${path === constants.OPEN_MATCHES.path ? 'focus' : 'nav-icon'}`}
                width="20" height="20"
              />
            </Link>
            :
            <Link to={constants.ALL_MATCHES.path}
              onClick={() => setRenderSwitch(!renderSwitch)}>
              <img src={icons.openMatchesIcon}
                alt={constants.ALL_MATCHES.title}
                className={`${path === constants.ALL_MATCHES.path ? 'focus' : 'nav-icon'}`}
                width="20" height="20"
              />
            </Link>
          }
          <Link to={constants.CREATE_MATCH.path}
            onClick={() => setRenderSwitch(!renderSwitch)}>
            <img src={icons.createMatchIcon}
              alt={constants.CREATE_MATCH.title}
              className={`${path === constants.CREATE_MATCH.path ? 'focus' : 'nav-icon'}`}
              width="20" height="20"
            />
          </Link>
          <Link to={constants.MY_MATCHES.path}
            onClick={() => setRenderSwitch(!renderSwitch)}>
            <img src={icons.myMatchesIcon}
              alt={constants.MY_MATCHES.title}
              className={`${path === constants.MY_MATCHES.path ? 'focus' : 'nav-icon'}`}
              width="20" height="20"
            />
          </Link>
        </div>
      </div>
    </Router >
  )
}

export default App;