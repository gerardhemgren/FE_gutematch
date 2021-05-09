import React from 'react'
import './Match.css'

const dayjs = require('dayjs')
require('dayjs/locale/es')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)


const Match = ({ user, match, source, join, left, deleteMatch }) => {
  const { /* id_match, */ name, date, location, /* is_full, */ players, players_field, id_admin } = match

  let actionButton;
  if (source === 'showOpenMatchs') {
    actionButton = <button onClick={join}>Join</button>
  } else if (source === 'showMyMatchs') {
    actionButton = <button onClick={left}>Left</button>
  } else {
    actionButton = undefined
  }

  let deleteButton
  if (id_admin === user) {
    deleteButton = <button onClick={deleteMatch}>Del</button>
  }
  return (
    <div id={`${source}`} >
      <div className='date'>
        {dayjs(date).utc().format('DD — dddd, MMMM')}
      </div>
      <div className='match'>
        <div className='time'>
          {dayjs(date).utc().format('HH:mm')}
        </div>

        <div className='players'>
          <div className='field'>F{players_field / 2}</div>
          <div className='joined'>{players}</div>
          <div className='missed'>{players_field - players}</div>
        </div>

        <div className='info'>
          <div className='name'>{name}</div>
          <div className='location'>{location}</div>
        </div>

        <div className='action'>
          {actionButton} {deleteButton}
        </div>
      </div>
    </div>
  )
}

export default Match