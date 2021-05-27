import React, { useState, useEffect } from 'react'
import matchService from './services/matchs'
import userService from './services/users'

import { useAuth0 } from '@auth0/auth0-react';

import Match from './components/Match'
import Message from './components/Message';
import Config from './components/Config';

import logo from './gute_match.png'
import './App.css';
import './Form.css';

const dayjs = require('dayjs')

function App() {
  const { isLoading, user } = useAuth0()

  let playerSub = user?.sub;
  const [playerId, setPlayerId] = useState(0)

  useEffect(() => {

    const getId = async () => {
      const fetch = await userService
        .logIn_signUp(playerSub)
        .then(async res => {
          setPlayerId(res[0].id)
          console.log('get pi', playerId)
          console.log('get ps', playerSub)
          console.log('get res', await res[0].id)
          console.log(isLoading)
        })
      return fetch
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
          }
        })
    }

    if (!isLoading) {
      getId()
      showOpenMatchs()
    }

  }, [playerId, isLoading, playerSub])

  const [clientRequest, setClientRequest] = useState('')
  const [title, setTitle] = useState('')

  const [appMatchs, setAppMatchs] = useState([])
  const [apiMessage, setApiMessage] = useState('')

  const [inputMatch, setInputMatch] = useState({ date: '', time: '', location: '', players_field: 10, name: '' })

  // NAVIGATION
  const showAllMatchs = async () => {
    await matchService
      .getAllMatchs()
      .then(res => {
        setClientRequest('showAllMatchs')
        setAppMatchs(res)
        setTitle('Open matchs')
        if (!user) setApiMessage('You must be logged to join a match')
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
          setApiMessage(res)
        }
      })
  }

  const createMatch = () => {
    setAppMatchs([])
    setClientRequest('createMatch')
    setTitle('Create a match')
    if (!user) setApiMessage('You must be logged to create a match')
  }

  const visitConfig = () => {
    setAppMatchs([])
    setClientRequest('config')
    setTitle('Config')
  }

  // FORM-ACTIONS
  const handleInputCreateForm = (event) => {
    setInputMatch({ ...inputMatch, [event.target.name]: event.target.value })
  }

  const resetForm = () => {
    setInputMatch({ ...inputMatch, date: '', time: '', location: '', players_field: 10, name: '' })
  }

  // MATCH-ACTIONS
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
          showMyMatchs()
        }
      })
  }

  const deleteMatch = async (matchId) => {
    await matchService
      .deleteMatch(matchId, playerId)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
  }

  const join = async (matchId) => {
    await matchService
      .joinMatch(matchId, playerId)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
  }

  const left = async (matchId) => {
    await matchService
      .leftMatch(matchId, playerId)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
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
    <div className='body'>

      <div className='header'>
        <div className='topvar'>
          <img src={logo} alt='logo'></img>
          <div className='config'>
            <button
              className={`${clientRequest === 'config' ? 'focus' : ''} config-button nav-button `}
              onClick={() => visitConfig()}>Config
            </button>
          </div>
        </div>
        <div className='message-layout'>
          <Message msg={apiMessage} action={closeMessage()} />
        </div>
        <div className='title'>
          {title} {(clientRequest === 'showOpenMatchs' && appMatchs.length > 0)
            || clientRequest === 'showMyMatchs'
            || clientRequest === 'showAllMatchs'
            ? `— ${appMatchs.length}` : ''}
        </div>
      </div>

      <div className='main'>
        <div>

          {clientRequest === 'createMatch' ?
            <form onSubmit={user ? addMatch : visitConfig} onReset={resetForm} className='form'>
              <fieldset>
                <legend>Date</legend>
                <div className='date-field'>
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
                  <input
                    required
                    className='input-time'
                    type="time"
                    name="time"
                    value={inputMatch.time}
                    onChange={handleInputCreateForm}>
                  </input>
                </div>
              </fieldset>


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
                    maxLength='12'
                    name='name'
                    value={inputMatch.name}
                    onChange={handleInputCreateForm}
                  />
                  <label>Max: 12 characteres</label>
                </fieldset>
              </div>

              <div className='action-box'>
                <button type='reset' value='Reset' className='reset-button'>
                  <p className='arrow'>↑</p>
                  Reset
                </button>
                <button type='submit' className='action-button primary'>Create →</button>
              </div>
            </form>
            : null
          }
        </div>
        <Config source={clientRequest} user={user} />
        <div>
          {appMatchs.map((match, index) =>
            <Match
              key={index}
              match={match}
              user={playerId}
              source={clientRequest}
              join={() => join(match.id_match)}
              left={() => left(match.id_match)}
              deleteMatch={() => deleteMatch(match.id_match)}
            />)}
        </div>
        <div className='bottom-space'></div>
      </div>

      <div className='navbar'>
        <button
          className={`${clientRequest === 'showOpenMatchs' ? 'focus' : ''} nav-button`}
          onClick={user ? () => showOpenMatchs() : () => showAllMatchs()} >Open Matchs
        </button>
        {/* <button onClick={() => showAllMatchs()}>All Matchs</button> */}
        <button
          className={`${clientRequest === 'createMatch' ? 'focus' : ''} nav-button`}
          onClick={() => createMatch()}>Add Match
        </button>
        <button
          className={`${clientRequest === 'showMyMatchs' ? 'focus' : ''} nav-button`}
          onClick={() => showMyMatchs()}>My Matchs
        </button>
      </div>
    </div>
  )
}

export default App;
