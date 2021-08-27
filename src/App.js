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
  const lsId = localStorage.getItem('lid');
  const lsName = localStorage.getItem('ln');

  const { user, isLoading } = useAuth0();
  const lsSub = user ? user.sub : undefined;
  const [uAuth, setuAuth] = useState(lsId || 0);

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
        .getOpenMatchs(uAuth)
        .then(res => {
          setClientRequest('showOpenMatchs')
          setTitle('Open matchs')
          if (typeof res === 'object') {
            setAppMatchs(res)
          } else {
            setAppMatchs([])
            // setApiMessage(res)
          }
        })
    }
    const nav = (isLogged) => {
      if (uAuth !== isLogged) {
        if (window.location.pathname === '/open_matchs' || window.location.pathname === '/') {
          showOpenMatchs()
        } else if (window.location.pathname === '/my_matchs') {
          showMyMatchs()
        } else if (window.location.pathname === '/add_match') {
          createMatch()
        } else {
          visitConfig()
        }
      } else {
        showAllMatchs()
      }
    }

    if (!isLoading) {
      // console.log('isLoading false')
      // console.log('useE uA', uAuth)
      // console.log('useE sub', user?.sub)
      if (user) {
        // console.log('user.sub true')
        // console.log(user.sub)
        // console.log(user.name)
        userService
          .logIn_signUp(lsSub, user.name)
          .then(async res => {
            // console.log('response ready')
            // console.log(user.name)
            // console.log('res id', await res[0].id)
            // console.log('res name', await res[0].name)
            setuAuth(await res[0].id)
            localStorage.setItem('lid', await res[0].id)
            localStorage.setItem('ln', await res[0].name)
            // console.log('res useE uA', uAuth)
            nav(1)
            // console.log('------------')
          })
      } else {
        // console.log('user.sub false')
        nav(0)
      }
    } else {
      // console.log('isLoading true')
    }

  }, [isLoading, uAuth, user, lsSub])

  // NAVIGATION
  const [clientRequest, setClientRequest] = useState('');
  const [title, setTitle] = useState('');

  const showOpenMatchs = async () => {
    await matchService
      .getOpenMatchs(uAuth)
      .then(res => {
        setClientRequest('showOpenMatchs')
        setTitle('Open matchs')
        if (typeof res === 'object') {
          setAppMatchs(res)
        } else {
          setAppMatchs([])
          // setApiMessage(res)
        }
      })
  }

  const showMyMatchs = async () => {
    await matchService
      .getMyMatchs(uAuth)
      .then(res => {
        setClientRequest('showMyMatchs')
        setTitle('My matchs')
        if (typeof res === 'object') {
          setAppMatchs(res)
        } else {
          setAppMatchs([])
          lsId ? setApiMessage(res) : setApiMessage('You must be logged to join a match')
        }
      })
  }

  const createMatch = () => {
    setAppMatchs([])
    setClientRequest('createMatch')
    setTitle('Create a match')
    lsId ? setApiMessage('') : setApiMessage('You must be logged to create a match')
  }

  const visitConfig = () => {
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
      .createMatch(matchInfo, uAuth)
      .then(async res => {
        setApiMessage(await res)
        if (res === 'Match created') {
          window.location.pathname = '/my_matchs'
        }
      })
  }

  // MATCH PROPS
  const MatchProps = {
    matchs: appMatchs,
    user: uAuth,
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
      <div className='bodyApp'>

        <div className='header'>
          <div className='topbar'>
            <div className='logo'>
              gute<span>match</span>
            </div>
            <Link to='/config'
              className={`${clientRequest === 'config' ? 'none' : 'config-button'}`}
              onClick={() => visitConfig()}>
              <img src={icons.settingsIcon} alt='settings' className='settings-icon' width="20" height="20" />
            </Link>
          </div>
          <div className='title'>
            {title} {(clientRequest === 'showOpenMatchs' && appMatchs.length > 0)
              || clientRequest === 'showMyMatchs'
              || clientRequest === 'showAllMatchs'
              ? `— ${appMatchs.length}` : ''}
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
            <Route path="/open_matchs">
              <MatchPage props={MatchProps} />
            </Route>
            <Route exact path="/my_matchs/">
              <MatchPage props={MatchProps} />
            </Route>
            <Route path="/add_match">
              <div>

                {clientRequest === 'createMatch' ?
                  <form onSubmit={addMatch} onReset={resetForm} className='form'>

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
                        <label>Max: 10 characteres</label>
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
                      <button type='submit'>Create</button>
                    </div>
                  </form>
                  : null
                }

              </div>
            </Route>
            <Route path="/config">
              <Config user={{ lsName }} />
            </Route>
          </Switch>
        </div>

        <div className='navbar'>
          <Link to="/open_matchs"
            onClick={() => showOpenMatchs()}>
            <img src={icons.openMatchsIcon}
              alt='Open Matchs'
              className={`${clientRequest === 'showOpenMatchs' || clientRequest === 'showAllMatchs' ? 'focus' : 'nav-icon'}`}
              width="16" height="16"
            />
          </Link>
          <Link to='/add_match'
            onClick={() => createMatch()}>
            <img src={icons.createMatchsIcon}
              alt='Create Match'
              className={`${clientRequest === 'createMatch' ? 'focus' : 'nav-icon'}`}
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
