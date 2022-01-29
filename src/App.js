import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MatchPage from './components/MatchesPage'
import CreateGame from './components/CreateGame'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Account from './components/auth/Account';
import NoMatch from './components/NoMatch';

import constants from './constants/index'
import './css/Styles.css';
import { User } from './auth/UserId';

function App() {

  const user = useContext(User)

  const Main = () => {
    if (user === 'no user') {
      return (
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path={'*'} element={<NoMatch />}></Route>
        </Routes >
      )
    } else {
      return (
        <Routes>
          <Route exact path="/" element={<MatchPage />} />
          <Route path={constants.OPEN_GAMES.path} element={<MatchPage />} />
          <Route path={constants.MY_GAMES.path} element={<MatchPage />} />
          <Route path={constants.CREATE_GAME.path} element={<CreateGame />} />
          <Route path={constants.ACCOUNT.path} element={<Account />} />
          <Route path={'*'} element={<NoMatch />}></Route>
        </Routes>
      )
    }
  }

  return (
    <Router>
      <div className='app'>
        <div className='fixed-background' />
        {user !== 'no user' ? <Header></Header> : null}
        <div className='main'>
          {user === null ? null : <Main />}
        </div>
        {user !== 'no user' ? <Navbar></Navbar> : null}
      </div>
    </Router >
  )
}

export default App;