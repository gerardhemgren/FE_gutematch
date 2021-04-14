import './App.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'

function App() {
  const [matchs, setMatchs] = useState([])

  useState(async () => {
    await matchService.getAll().then(res => setMatchs(res))
  })

  return (
    <div className="App" >
      {matchs.map(match => <Match key={match.id} match={match} />)}
    </div>
  );
}

export default App;
