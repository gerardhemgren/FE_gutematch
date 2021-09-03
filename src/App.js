import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import matchService from './services/matchs';
import userService from './services/users';

import { useAuth0 } from '@auth0/auth0-react';

import MatchPage from './components/MatchsPage'
import MatchForm from './components/MatchForm'
import Message from './components/Message';
import Config from './components/Config';

import constants from './constants/index'
import icons from './icons/icons';
import './css/Styles.css';
import './Form.css';

function App() {
  // USER
  const playerIdFromLocalStorage = localStorage.getItem('player_id');
  const playerNameFromLocalStorage = localStorage.getItem('player_name');

  const { user } = useAuth0();
  const userSub = user ? user.sub : undefined;
  const [playerId, setPlayerId] = useState(Number(playerIdFromLocalStorage) || 0);

  // USER CYCLE
  useEffect(() => {
    if (user) {
      userService
        .logIn_signUp(userSub, user.name)
        .then(async res => {
          setPlayerId(await res[0].id)
          localStorage.setItem('player_id', await res[0].id)
          localStorage.setItem('player_name', await res[0].name)
        })
    }
  }, [user, userSub, playerId])

  // MATCHS
  const [appMatchs, setAppMatchs] = useState([]);
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
  const [clientRequest, setClientRequest] = useState('');
  /* let history = useHistory()
  // const handleForm = useCallback(() => history.replace(`/my_matchs/${playerId}`), [history, playerId]);
  const handleForm = () => history.push(`/my_matchs/${playerId}`); */

  // const handleForm = () => window.location = `/my_matchs/${playerId}`

  // NAVIGATION-FLOW
  const showAllMatchs = async () => {
    await matchService
      .getAllMatchs()
      .then(res => {
        setClientRequest(constants.TITLES.ALL_MATCHS)
        setAppMatchs(res)
      })
  }
  const showOpenMatchs = async () => {
    setClientRequest(constants.TITLES.OPEN_MATCHS)
    if (playerId !== 0) {
      await matchService
        .getOpenMatchs(playerId)
        .then(res => {
          if (typeof res === 'object') {
            setAppMatchs(res)
          } else {
            setAppMatchs([])
            setApiMessage(res)
          }
        })
    } else {
      setApiMessage('You must be logged to see opened matchs')
    }
  }
  const showMyMatchs = async () => {
    setClientRequest(constants.TITLES.MY_MATCHS)
    if (playerId !== 0) {
      await matchService
        .getMyMatchs(playerId)
        .then(res => {
          if (typeof res === 'object') {
            setAppMatchs(res)
          } else {
            setAppMatchs([])
            setApiMessage(res)
          }
        })
    } else {
      setAppMatchs([])
      setApiMessage('You must be logged to join a match')
    }
  }
  const showCreateMatchForm = () => {
    setAppMatchs([])
    setClientRequest(constants.TITLES.CREATE_MATCH)
    playerId !== 0 ? setApiMessage('') : setApiMessage('You must be logged to create a match')
  }
  const showConfig = () => {
    setAppMatchs([])
    setClientRequest(constants.TITLES.CONFIG)
  }

  // FORM PROPS
  const formProps = {
    user: playerId,
    source: clientRequest,
    // handle: () => handleForm(),
    action: () => showMyMatchs()
  }

  // MATCH PROPS
  const matchProps = {
    matchs: appMatchs,
    user: playerId,
    source: clientRequest,
    action: () => showMyMatchs()
  }

  return (
    <Router>
      <div className='app'>
        <div className='app-background' />
        <div className='header'>
          <div className='topbar-container'>
            <div className='logo'>
              gute<span>match</span>
            </div>
            <Link to={`/config`}
              className={`${clientRequest === constants.TITLES.CONFIG ? 'display-none' : 'config-button'}`}
              onClick={() => showConfig()}>
              <img src={icons.settingsIcon} alt='settings' className='settings-icon' width="20" height="20" />
            </Link>
          </div>
          <div className='title-container'>
            {clientRequest}
            {(clientRequest === constants.TITLES.OPEN_MATCHS ||
              clientRequest === constants.TITLES.MY_MATCHS ||
              clientRequest === constants.TITLES.ALL_MATCHS
            ) && appMatchs.length > 0
              ? ` — ${appMatchs.length}` : ''}
          </div>
          <div className='message-container'>
            <Message msg={apiMessage} action={closeMessage()} />
          </div>
        </div>
        <div className='main'>
          <Switch>
            <Route exact path="/">
              <MatchPage props={matchProps} />
            </Route>
            <Route path={`/all_matchs/${playerId}`}>
              <MatchPage props={matchProps} />
            </Route>
            <Route path={`/open_matchs/${playerId}`}>
              <MatchPage props={matchProps} />
            </Route>
            <Route path={`/my_matchs/${playerId}`}>
              <MatchPage props={matchProps} />
            </Route>
            <Route path={`/add_match/${playerId}`}>
              <MatchForm props={formProps} />
            </Route>
            <Route path={`/config`}>
              <Config playerName={playerNameFromLocalStorage} />
            </Route>
          </Switch>
        </div>
        <div className='navbar'>
          {playerId !== 0 ?
            <Link to={`/open_matchs/${playerId}`}
              onClick={() => showOpenMatchs()}>
              <img src={icons.openMatchsIcon}
                alt='Open Matchs'
                className={`${clientRequest === constants.TITLES.OPEN_MATCHS ? 'focus' : 'nav-icon'}`}
                width="16" height="16"
              />
            </Link>
            :
            <Link to={`/all_matchs/${playerId}`}
              onClick={() => showAllMatchs()}>
              <img src={icons.openMatchsIcon}
                alt='All Matchs'
                className={`${clientRequest === constants.TITLES.ALL_MATCHS ? 'focus' : 'nav-icon'}`}
                width="16" height="16"
              />
            </Link>
          }
          <Link to={`/add_match/${playerId}`}
            onClick={() => showCreateMatchForm()}>
            <img src={icons.createMatchIcon}
              alt='Create Match'
              className={`${clientRequest === constants.TITLES.CREATE_MATCH ? 'focus' : 'nav-icon'}`}
              width="16" height="16"
            />
          </Link>
          <Link to={`/my_matchs/${playerId}`}
            onClick={() => showMyMatchs()}>
            <img src={icons.myMatchsIcon}
              alt='My Matchs'
              className={`${clientRequest === constants.TITLES.MY_MATCHS ? 'focus' : 'nav-icon'}`}
              width="16" height="16"
            />
          </Link>
        </div>
      </div>
    </Router>
  )
}

export default App;