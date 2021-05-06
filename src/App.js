import './App.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'
import Message from './components/Message';

function App() {
  const [inputMatch, setInputMatch] = useState({ date: undefined, location: undefined, players_field: undefined })
  const [appMatchs, setAppMatchs] = useState([])
  const [getClientRequest, setGetClientRequest] = useState('')
  const [apiMessage, setApiMessage] = useState('')

  const userLS = localStorage.getItem('userId')
  const user = { id: Number(userLS) }

  // NAVIGATION
  const showAllMatchs = async () => {
    await matchService
      .getAllMatchs()
      .then(res => {
        setGetClientRequest(undefined)
        setAppMatchs(res)
      })
  }

  const showOpenMatchs = async () => {
    await matchService
      .getOpenMatchs(user.id)
      .then(res => {
        setGetClientRequest('showOpenMatchs')
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
        setGetClientRequest('showMyMatchs')
      })
  }

  // ACTIONS
  const handleInputCreateForm = (event) => {
    setInputMatch({ ...inputMatch, [event.target.name]: event.target.value })
  }

  const create = async (event) => {
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
    <div>
      <div className='message'>
        <Message msg={apiMessage} action={closeMessage()} />
      </div>

      <button onClick={() => showAllMatchs()}>Show All Matchs</button>
      <button onClick={() => showOpenMatchs()}>Show Open Matchs</button>
      <button onClick={() => showMyMatchs()}>Show My Matchs</button>

      <div className='main'>
        <div>
          <form onSubmit={create} className='form'>
            <input
              placeholder='date'
              name='date'
              onChange={handleInputCreateForm}
            />
            <input
              placeholder='location'
              name='location'
              onChange={handleInputCreateForm}
            />
            <input
              placeholder='field'
              type='number'
              name='players_field'
              onChange={handleInputCreateForm}
            />
            <button type='submit'>Create Match</button>
          </form>
        </div>

        <div>
          {appMatchs.map((match, index) =>
            <Match
              key={index}
              match={match}
              user={user.id}
              source={getClientRequest}
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
