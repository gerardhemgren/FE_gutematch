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
        setGetRequest('showOpenMatchs')
        setAppMatchs(res)
      })
  }

  const showMyMatchs = async () => {
    await matchService
      .getMyMatchs(user.id)
      .then(res => {
        setGetRequest('showMyMatchs')
        setAppMatchs(res)
      })
  }

  const joinMatch = async (matchId) => {
    matchService
      .postMatch(matchId, user.id);
    await showOpenMatchs()
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
            action={() => joinMatch(match.id_match)}
          />)}
      </div>
    </div>
  );
}

export default App;
