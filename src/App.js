import './App.css';
import './Form.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'
import Message from './components/Message';
import Config from './components/Config';
import logo from './gute_match.png'
const dayjs = require('dayjs')

function App() {
  const [clientRequest, setClientRequest] = useState('')
  const [title, setTitle] = useState('')
  const [appMatchs, setAppMatchs] = useState([])
  const [apiMessage, setApiMessage] = useState('')

  const [inputMatch, setInputMatch] = useState({ date: '', time: '', location: '', players_field: 10, name: '' })

  const userLS = localStorage.getItem('userId')
  const user = { id: Number(userLS) }

  // NAVIGATION
  /*   const showAllMatchs = async () => {
      await matchService
        .getAllMatchs()
        .then(res => {
          setClientRequest(undefined)
          setAppMatchs(res)
        })
    } */

  const showOpenMatchs = async () => {
    await matchService
      .getOpenMatchs(user.id)
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
      .getMyMatchs(user.id)
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
  }

  const config = () => {
    setAppMatchs([])
    setClientRequest('config')
    setTitle('Config')
  }

  // ACTIONS
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
      .createMatch(matchInfo, user.id)
      .then(async res => {
        setApiMessage(await res)
        if (res === 'Match created') {
          showMyMatchs()
        }
      })
  }

  const deleteMatch = async (matchId) => {
    await matchService
      .deleteMatch(matchId, user.id)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
  }

  const join = async (matchId) => {
    await matchService
      .joinMatch(matchId, user.id)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
  }

  const left = async (matchId) => {
    await matchService
      .leftMatch(matchId, user.id)
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
      }, 6000);
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
              onClick={() => config()}>Config
            </button>
          </div>
        </div>
        <div className='message-layout'>
          <Message msg={apiMessage} action={closeMessage()} />
        </div>
        <div className='title'>
          {title}
        </div>
      </div>

      <div className='main'>
        <div>
          {clientRequest === 'createMatch' ?
            <form onSubmit={addMatch} onReset={resetForm} className='form'>

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
                    maxLength='10'
                    name='name'
                    value={inputMatch.name}
                    onChange={handleInputCreateForm}
                  />
                  <label>Max: 10 characteres</label>
                </fieldset>
              </div>

              <div className='action-box'>
                <button type='reset' value='Reset' className='reset-button'>
                  <p className='arrow'>↑</p>
                  Reset
                </button>
                <button type='submit' className='action-button'>Create →</button>
              </div>
            </form>
            : null
          }
        </div>
        <Config source={clientRequest} />
        <div>
          {appMatchs.map((match, index) =>
            <Match
              key={index}
              match={match}
              user={user.id}
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
          onClick={() => showOpenMatchs()}>Open Matchs
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
