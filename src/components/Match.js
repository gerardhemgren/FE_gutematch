import React, { useContext } from 'react';
import constants from '../constants/index';
import { User } from '../auth/UserId';

const dayjs = require('dayjs');
// require('dayjs/locale/es')
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const Match = ({ title, match, joinMatch, leaveMatch, deleteMatch }) => {
  const { name, date, location, players, players_field, id_admin } = match
  const user = useContext(User);

  let actionMatchButton;
  switch (title) {
    case constants.OPEN_MATCHES.title:
      actionMatchButton = <button className='join-btn' onClick={joinMatch}>Join</button>
      break;
    case constants.MY_MATCHES.title:
      actionMatchButton = <button className='leave-btn' onClick={leaveMatch}>Leave</button>
      break;
    default:
      actionMatchButton = undefined
  }

  let deleteButton
  if (id_admin === Number(user)) {
    deleteButton = <button className='del-btn' onClick={deleteMatch}>Del</button>
  }

  return (
      <div id={`${title}`} className='match-container'>

        <div className='title'>
          <div className='name'>{name}</div>
        </div>

        <div className='date'>
          <div className='day'>
            {dayjs(date).utc().format('dddd')}
          </div>
          <div className='date-month'>
            {dayjs(date).utc().format('DD — MMM')}
          </div>
        </div>

        <div className='players'>
          <div className='field'>F{players_field / 2}</div>
          <div className='joined'>{players} joined <span className='missing'>— {`${players_field - players} missing`}</span> </div>

        </div>

        <div className='match'>
          <div className='time'>
            {dayjs(date).utc().format('HH:mm')}
          </div>
          <div className='location'>{location}</div>
        </div>

        <div className='action-match'>
          {deleteButton} {actionMatchButton}
        </div>

      </div>
  )
}

export default Match