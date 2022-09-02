import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MatchPage from './components/MatchesPage'
import CreateGame from './components/CreateGame'
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Account from './components/auth/Account';
import PageNotFound from './components/PageNotFound';

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
          <Route path={'*'} element={<PageNotFound />}></Route>
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
          <Route path={'*'} element={<PageNotFound />}></Route>
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
          {user !== null ? <Main /> : null}
        </div>
        {user !== 'no user' ? <Navbar></Navbar> : null}
      </div>
    </Router >
  )
}

export default App;