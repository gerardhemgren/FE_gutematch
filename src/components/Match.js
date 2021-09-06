import React from 'react';
import constants from '../constants/index';

const dayjs = require('dayjs');
// require('dayjs/locale/es')
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const Match = ({ path, user, match, joinMatch, leaveMatch, deleteMatch }) => {
  const { name, date, location, players, players_field, id_admin } = match

  let actionMatchButton;
  if (path === constants.OPEN_MATCHS.path) {
    actionMatchButton = <button onClick={joinMatch}>Join</button>
  } else if (path === constants.MY_MATCHS.path) {
    actionMatchButton = <button onClick={leaveMatch}>Leave</button>
  } else {
    actionMatchButton = undefined
  }
  let deleteButton
  if (id_admin === Number(user)) {
    deleteButton = <button onClick={deleteMatch}>Del</button>
  }
  return (
    <div id={`${path}`} className='match-container'>
      <div className='date'>
        <div className='day'>
          {dayjs(date).utc().format('DD — dddd')}
        </div>
        <div className='month-year'>
          {dayjs(date).utc().format(', MMMM. YYYY')}
        </div>
      </div>
      <div className='match'>
        <div className='time'>
          {dayjs(date).utc().format('HH:mm')}
        </div>
        <div className='players'>
          <div className='field'>F{players_field / 2}</div>
          <div className='joined'>{players}</div>
          <div className='missed'>{`/ ${players_field}`}</div>
        </div>
        <div className='action-match'>
          {deleteButton} {actionMatchButton}
        </div>
      </div>
      <div className='info'>
        <div className='name'>{name}</div>
        <div className='location'>{location}</div>
      </div>
    </div>
  )
}

export default Match