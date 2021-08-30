import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import matchService from './services/matchs';
import userService from './services/users';

import { useAuth0 } from '@auth0/auth0-react';

import MatchPage from './components/MatchPage'
import Message from './components/Message';
import Config from './components/Config';

import icons from './icons/icons';
import './Form.css';

const dayjs = require('dayjs');

function App() {
  // USER
  const playerIdFromLocalStorage = localStorage.getItem('player_id');
  const playerNameFromLocalStorage = localStorage.getItem('player_name');

  const { user, isLoading } = useAuth0();
  const userSub = user ? user.sub : undefined;
  const [playerId, setPlayerId] = useState(Number(playerIdFromLocalStorage) || 0);

  // USER-MATCHS
  const [appMatchs, setAppMatchs] = useState([]);
  const [apiMessage, setApiMessage] = useState('');

  // LIFE CYCLE
  useEffect(() => {
    const showAllMatchs = async () => {
      await matchService
        .getAllMatchs()
        .then(res => {
          setClientRequest('showAllMatchs')
          setAppMatchs(res)
          setTitle('All matchs')
        })
    }

    const showOpenMatchs = async () => {
      await matchService
        .getOpenMatchs(playerId)
        .then(async res => {
          setClientRequest('showOpenMatchs')
          setTitle('Open matchs')
          if (typeof await res === 'object') {
            setAppMatchs(res)
          } else {
            setAppMatchs([])
          }
        })
    }
    const nav = (playerId) => {
      if (playerId !== 0) {
        if (window.location.pathname === '/' || window.location.pathname === '/open_matchs') {
          showOpenMatchs()
          console.log('player',playerId)
        } else if (window.location.pathname === '/my_matchs') {
          showMyMatchs()
        } else if (window.location.pathname === '/add_match') {
          showCreateMatchForm()
        } else {
          showConfig()
        }
      } else {
        console.log('default player',playerId)
        showAllMatchs()
      }
    }

    if (!isLoading) {
      console.log('isLoading false')
      console.log('playerId', playerId)
      console.log('user.sub', user?.sub)
      if (user) {
        console.log('user true')
        console.log(user.sub)
        console.log(user.name)
        console.log('------------')
        userService
          .logIn_signUp(userSub, user.name)
          .then(async res => {
            console.log('response ready')
            console.log('user.name',user.name)
            console.log('res id', await res[0].id)
            console.log('res name', await res[0].name)
            console.log('------------')
            setPlayerId(await res[0].id)
            localStorage.setItem('player_id', await res[0].id)
            localStorage.setItem('player_name', await res[0].name)
            nav(await res[0].id)
          })
      } else {
        console.log('user false')
        nav(playerId)
      }
    } else {
      console.log('isLoading true')
    }

  }, [isLoading, user, userSub, playerId])

  // NAVIGATION
  const [clientRequest, setClientRequest] = useState('');
  const [title, setTitle] = useState('');

  const showAllMatchs = async () => {
    await matchService
      .getAllMatchs()
      .then(res => {
        setClientRequest('showAllMatchs')
        setAppMatchs(res)
        setTitle('All matchs')
      })
  }

  const showOpenMatchs = async () => {
    await matchService
      .getOpenMatchs(playerId)
      .then(res => {
        setClientRequest('showOpenMatchs')
        setTitle('Open matchs')
        if (typeof res === 'object') {
          setAppMatchs(res)
        } else {
          setAppMatchs([])
          setApiMessage(res)
        }
      })
  }

  const showMyMatchs = async () => {
    await matchService
      .getMyMatchs(playerId)
      .then(res => {
        setClientRequest('showMyMatchs')
        setTitle('My matchs')
        if (typeof res === 'object') {
          setAppMatchs(res)
        } else {
          setAppMatchs([])
          playerIdFromLocalStorage ? setApiMessage(res) : setApiMessage('You must be loged to join a match')
        }
      })
  }

  const showCreateMatchForm = () => {
    setAppMatchs([])
    setClientRequest('showCreateMatchForm')
    setTitle('Create a match')
    playerIdFromLocalStorage ? setApiMessage('') : setApiMessage('You must be loged to create a match')
  }

  const showConfig = () => {
    setClientRequest('config')
    setTitle('Config')
  }

  // FORM-ACTIONS
  const [inputMatch, setInputMatch] = useState({ date: '', time: '', location: '', players_field: 10, name: '' });

  const handleInputCreateForm = (event) => {
    setInputMatch({ ...inputMatch, [event.target.name]: event.target.value });
  }

  const resetForm = () => {
    setInputMatch({ ...inputMatch, date: '', time: '', location: '', players_field: 10, name: '' });
  }

  const addMatch = async (event) => {
    event.preventDefault()
    const matchInfo = {
      date: `${inputMatch.date} ${inputMatch.time}`,
      location: inputMatch.location,
      players_field: Number(inputMatch.players_field),
      name: inputMatch.name
    }

    await matchService
      .createMatch(matchInfo, playerId)
      .then(async res => {
        setApiMessage(await res)
        if (res === 'Match created') {
          setApiMessage(res)
        }
      })
  }

  // MATCH PROPS
  const MatchProps = {
    matchs: appMatchs,
    user: playerId,
    source: clientRequest,
    action: () => showMyMatchs()
  }

  // MESSAGES
  const closeMessage = () => {
    const res = apiMessage
    if (res) {
      setTimeout(() => {
        setApiMessage('')
      }, 8000);
    }
  }

  return (
    <Router>
      <div className='body-app'>
        <div className='body-app-background'></div>

        <div className='header'>
          <div className='topbar'>
            <div className='logo'>
              gute<span>match</span>
            </div>
            <Link to='/config'
              className={`${clientRequest === 'config' ? 'none' : 'config-button'}`}
              onClick={() => showConfig()}>
              <img src={icons.settingsIcon} alt='settings' className='settings-icon' width="20" height="20" />
            </Link>
          </div>
          <div className='title'>
            {title}
            {(clientRequest === 'showOpenMatchs' && appMatchs.length > 0)
              || clientRequest === 'showMyMatchs'
              || clientRequest === 'showAllMatchs'
              ? ` — ${appMatchs.length}` : ''}
          </div>
          <div className='message-container'>
            <Message msg={apiMessage} action={closeMessage()} />
          </div>
        </div>

        <div className='main'>
          <Switch>
            <Route exact path="/">
              <MatchPage props={MatchProps} />
            </Route>
            <Route path="/all_matchs">
              <MatchPage props={MatchProps} />
            </Route>
            <Route path="/open_matchs">
              <MatchPage props={MatchProps} />
            </Route>
            <Route exact path="/my_matchs/">
              <MatchPage props={MatchProps} />
            </Route>
            <Route path="/add_match">
              <div>

                {clientRequest === 'showCreateMatchForm' ?
                  <form onSubmit={addMatch} onReset={resetForm} className='create-match-form'>

                    <fieldset>
                      <legend>Location</legend>
                      <input
                        className='input-adress'
                        required
                        placeholder='Adress'
                        name='location'
                        value={inputMatch.location}
                        onChange={handleInputCreateForm}
                      />
                      <label>Adress 1234, City, Country</label>
                    </fieldset>

                    <div className='name-field'>
                      <fieldset>
                        <legend>Field</legend>
                        <div>
                          <select
                            className='drop-players-field'
                            name="players_field"
                            type='number'
                            value={inputMatch.players_field}
                            onChange={handleInputCreateForm}>
                            <option value="10">F — 5</option>
                            <option value="14">F — 7</option>
                            <option value="18">F — 9</option>
                            <option value="22">F — 11</option>
                          </select>
                        </div>
                      </fieldset>

                      <fieldset>
                        <legend>Name</legend>
                        <input
                          className='input-name'
                          required
                          placeholder='Match name'
                          maxLength='10'
                          name='name'
                          value={inputMatch.name}
                          onChange={handleInputCreateForm}
                        />
                      </fieldset>
                    </div>

                    <div className='date-field'>
                      <fieldset>
                        <legend>Date</legend>
                        <input
                          required
                          className='input-date'
                          type="date"
                          name="date"
                          min={dayjs().format('YYYY-MM-DD')}
                          max={dayjs().add(3, 'M').format('YYYY-MM-DD')}
                          value={inputMatch.date}
                          onChange={handleInputCreateForm}>
                        </input>
                      </fieldset>

                      <fieldset>
                        <legend>Time</legend>
                        <input
                          required
                          className='input-time'
                          type="time"
                          name="time"
                          value={inputMatch.time}
                          onChange={handleInputCreateForm}>
                        </input>
                      </fieldset>
                    </div>

                    <div className='action'>
                      <button type='reset' value='Reset'>
                        Reset
                      </button>
                      <button type='submit'>
                        Create
                      </button>
                    </div>
                  </form>
                  : null
                }

              </div>
            </Route>
            <Route path="/config">
              <Config playerName={playerNameFromLocalStorage} />
            </Route>
          </Switch>
        </div>

        <div className='navbar'>

          {playerId === 0 ?
            <Link to="/all_matchs"
              onClick={() => showAllMatchs()}>
              <img src={icons.openMatchsIcon}
                alt='All Matchs'
                className={`${clientRequest === 'showAllMatchs' ? 'focus' : 'nav-icon'}`}
                width="16" height="16"
              />
            </Link>
            :
            <Link to="/open_matchs"
              onClick={() => showOpenMatchs()}>
              <img src={icons.openMatchsIcon}
                alt='Open Matchs'
                className={`${clientRequest === 'showOpenMatchs' ? 'focus' : 'nav-icon'}`}
                width="16" height="16"
              />
            </Link>
          }

          <Link to='/add_match'
            onClick={() => showCreateMatchForm()}>
            <img src={icons.createMatchIcon}
              alt='Create Match'
              className={`${clientRequest === 'showCreateMatchForm' ? 'focus' : 'nav-icon'}`}
              width="16" height="16"
            />
          </Link>
          <Link to='/my_matchs'
            onClick={() => showMyMatchs()}>
            <img src={icons.myMatchsIcon}
              alt='My Matchs'
              className={`${clientRequest === 'showMyMatchs' ? 'focus' : 'nav-icon'}`}
              width="16" height="16"
            />
          </Link>
        </div>

      </div>
    </Router>
  )
}


export default App;
