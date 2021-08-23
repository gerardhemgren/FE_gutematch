import React from 'react'

const dayjs = require('dayjs')
// require('dayjs/locale/es')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

const Match = ({ user, match, source, join, leave, deleteMatch}) => {
  const { name, date, location, players, players_field, id_admin } = match

  let actionButton;
  if (source === 'showOpenMatchs') {
    actionButton = <button onClick={join}>Join</button>
  } else if (source === 'showMyMatchs') {
    actionButton = <button onClick={leave}>Leave</button>
  } else {
    actionButton = undefined
  }
  let deleteButton
  if (id_admin === Number(user)) {
    deleteButton = <button onClick={deleteMatch}>Del</button>
  }
  return (
      <div id={`${source}`} className='match-container'>
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
          <div className='action'>
            {deleteButton} {actionButton}
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