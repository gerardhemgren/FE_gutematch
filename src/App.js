import React, { useState, useEffect } from 'react'
import matchService from './services/matchs'
import userService from './services/users'

import { useAuth0 } from '@auth0/auth0-react';

import Match from './components/Match'
import Message from './components/Message';
import Config from './components/Config';

import './Form.css';

const dayjs = require('dayjs')

function App() {
  const lsId = localStorage.getItem('lid')
  const lsName = localStorage.getItem('ln')

  const { user, isLoading } = useAuth0()
  const lsSub = user ? user.sub : undefined
  const [uAuth, setuAuth] = useState(lsId || 0)

  
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
            setApiMessage(res)
          }
        })
    }
    const nav = () => {
      if (uAuth !== 0) {
        showOpenMatchs()
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
            nav()
            // console.log('------------')
          })
      } else {
        // console.log('user.sub false')
        nav()
      }
    } else {
      // console.log('isLoading true')
    }

  }, [isLoading, uAuth, user, lsSub])

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
        setTitle('All matchs')
        if (!lsId) setApiMessage('You must be logged to join a match')
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
          setApiMessage(res)
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
          showMyMatchs()
        }
      })
  }

  // MATCH-ACTIONS
  const deleteMatch = async (matchId) => {
    await matchService
      .deleteMatch(matchId, uAuth)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
  }

  const join = async (matchId) => {
    await matchService
      .joinMatch(matchId, uAuth)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
  }

  const left = async (matchId) => {
    await matchService
      .leftMatch(matchId, uAuth)
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
    <div className='bodyApp'>

      <div className='bg'></div>

      <div className='header'>
        <div className='topbar'>
          <div className='logo'>
            gute
            <span>match</span>
          </div>
          <div className='config'>
            <button
              className={`${clientRequest === 'config' ? 'none' : 'config-button'}`}
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

        <Config source={clientRequest} user={{ lsName }} />

        <div>
          {appMatchs.map((match, index) =>
            <Match
              key={index}
              match={match}
              user={uAuth}
              source={clientRequest}
              join={() => join(match.id_match)}
              left={() => left(match.id_match)}
              deleteMatch={() => deleteMatch(match.id_match)}
            />
          )}
          <div className='bottom-space'></div>
        </div>


      </div>

      <div className='navbar'>
        <button
          className={`${clientRequest === 'showOpenMatchs' || clientRequest === 'showAllMatchs' ? 'focus' : ''} nav-button`}
          onClick={lsId ? () => showOpenMatchs() : () => showAllMatchs()} >Open Matchs
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
