import './App.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'
import Message from './components/Message';

function App() {
  const [appMatchs, setAppMatchs] = useState([])
  const [getRequest, setGetRequest] = useState('')
  const [apiMessage, setApiMessage] = useState('')

  const userLS = localStorage.getItem('userId')
  const user = { id: Number(userLS) }

  const showAllMatchs = async () => {
    await matchService
      .getAllMatchs()
      .then(res => {
        setGetRequest(undefined)
        setAppMatchs(res)
      })
  }

  const showOpenMatchs = async () => {
    await matchService
      .getOpenMatchs(user.id)
      .then(res => {
        setGetRequest('showOpenMatchs')
        if (typeof res === 'object') {
          setAppMatchs(res)
        } else {
          setApiMessage(res)
        }
      })
  }

  const showMyMatchs = async () => {
    await matchService
      .getMyMatchs(user.id)
      .then(res => {
        setAppMatchs(res)
        setGetRequest('showMyMatchs')
      })
  }

  const create = async () => {
    const matchInfo = {
      date: '2021-09-29 03:03:00',
      location: 'Casa',
      players_field: 14
    }
    await matchService
      .createMatch(matchInfo, user.id)
      .then(async res => {
        setApiMessage(await res)
      })
    showMyMatchs()
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
    showOpenMatchs()
  }

  const closeMessage = () => {
    setTimeout(() => {
      setApiMessage('')
    }, 3000);
  }

  return (
    <div>
      <Message msg={apiMessage} action={closeMessage()} />

      <button onClick={() => showAllMatchs()}>Show All Matchs</button>
      <button onClick={() => showOpenMatchs()}>Show Open Matchs</button>
      <button onClick={() => showMyMatchs()}>Show My Matchs</button>
      <button onClick={() => create()}>Create Match</button>

      <div>
        {appMatchs.map((match, index) =>
          <Match
            key={index}
            match={match}
            user={user.id}
            source={getRequest}
            join={() => join(match.id_match)}
            left={() => left(match.id_match)}
            deleteMatch={() => deleteMatch(match.id_match)}
          />)}
      </div>

    </div>
  );
}

export default App;
