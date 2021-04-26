import './App.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'

function App() {
  const [appMatchs, setAppMatchs] = useState([])
  const [getRequest, setGetRequest] = useState('')

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
        setAppMatchs(res)
        setGetRequest('showOpenMatchs')
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

  const join = async (matchId) => {
    await matchService
      .joinMatch(matchId, user.id)
      showOpenMatchs()
  }

  const left = async (matchId) => {
    await matchService
      .leftMatch(matchId, user.id)
      showOpenMatchs()
  }

  return (
    <div>
      <button onClick={() => showAllMatchs()}>Show All Matchs</button>
      <button onClick={() => showOpenMatchs()}>Show Open Matchs</button>
      <button onClick={() => showMyMatchs()}>Show My Matchs</button>
      <div>
        {appMatchs.map((match, index) =>
          <Match
            key={index}
            match={match}
            source={getRequest}
            join={() => join(match.id_match)}
            left={() => left(match.id_match)}
          />)}
      </div>
    </div>
  );
}

export default App;
