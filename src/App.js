import './App.css';
import React, { useState } from 'react'
import matchService from './services/matchs'
import Match from './components/Match'

function App() {
  const [matchs, setMatchs] = useState([])
  const [myOpenMatchs, setMyOpenMatchs] = useState([])
  const [trigger, setTrigger] = useState([])

  const user = { id: 3 }

  const showAllMatchs = async () => {
    await matchService.getAll().then(res => setMatchs(res))
    setTrigger(matchs)
  }

  const showMyOpenMatchs = async () => {
    await matchService.getMyOpenMatchs(user.id).then(res => setMyOpenMatchs(res))
    setTrigger(myOpenMatchs)
  }

  return (
    <div /* className="App" */ >
      <button onClick={() => showAllMatchs()}>Show All</button>
      <button onClick={() => showMyOpenMatchs()}>Show Mines</button>
      <div>
        { trigger.map((match, index) => <Match key={index} match={match} />) }
      </div>
    </div>
  );
}

export default App;
