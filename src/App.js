import './App.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'
import Message from './components/Message';

function App() {
  const [inputMatch, setInputMatch] = useState({ date: undefined, location: undefined, players_field: undefined })
  const [appMatchs, setAppMatchs] = useState([])
  const [clientRequest, setClientRequest] = useState('')
  const [apiMessage, setApiMessage] = useState('')

  const userLS = localStorage.getItem('userId')
  const user = { id: Number(userLS) }

  // NAVIGATION
  const showAllMatchs = async () => {
    await matchService
      .getAllMatchs()
      .then(res => {
        setClientRequest(undefined)
        setAppMatchs(res)
      })
  }

  const showOpenMatchs = async () => {
    await matchService
      .getOpenMatchs(user.id)
      .then(res => {
        setClientRequest('showOpenMatchs')
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
        setAppMatchs(res)
        setClientRequest('showMyMatchs')
      })
  }

  const createMatch = () => {
    setAppMatchs([])
    setClientRequest('createMatch')
  }

  // ACTIONS
  const handleInputCreateForm = (event) => {
    setInputMatch({ ...inputMatch, [event.target.name]: event.target.value })
  }

  const add = async (event) => {
    event.preventDefault()
    const matchInfo = {
      date: inputMatch.date,
      location: inputMatch.location,
      players_field: Number(inputMatch.players_field)
    }

    await matchService
      .createMatch(matchInfo, user.id)
      .then(async res => {
        setApiMessage(await res)
      })
    // showMyMatchs()
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
      console.log(res)
      setTimeout(() => {
        setApiMessage('')
      }, 3000);
    }
  }

  return (
    <div className='body'>
      <div className='message'>
        <Message msg={apiMessage} action={closeMessage()} />
      </div>

      <div className='navbar'>
        <button onClick={() => showAllMatchs()}>All Matchs</button>
        <button onClick={() => showOpenMatchs()}>Open Matchs</button>
        <button onClick={() => showMyMatchs()}>My Matchs</button>
        <button onClick={() => createMatch()}>Add Match</button>
      </div>

      <div className='main'>

        <div>
          {clientRequest === 'createMatch' ?
            <form onSubmit={add} className='form'>
              <input
                placeholder='date'
                name='date'
                value={inputMatch.date}
                onChange={handleInputCreateForm}
              />
              <input
                placeholder='location'
                name='location'
                value={inputMatch.location}
                onChange={handleInputCreateForm}
              />
              <input
                placeholder='field'
                type='number'
                name='players_field'
                value={inputMatch.players_field}
                onChange={handleInputCreateForm}
              />
              <button type='submit'>Create Match</button>
            </form>
           : null
          }
        </div>

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
      </div>

    </div>
  );
}

export default App;
