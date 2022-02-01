import React, { useState } from 'react';
import constants from '../constants/index';
import GameForm from './GameForm';
import Modal from 'react-modal'

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const Match = ({ user, title, match, joinGame, leaveGame, deleteGame, toggleSwitch }) => {
  const { id_match, name, date, location, players, players_field, id_admin } = match
  const props = {
    actions: ['edit', 'cancel'],
    matchInfo: {
      matchId: id_match,
      date: dayjs(date).utc().format('YYYY-MM-DD'),
      time: dayjs(date).utc().format('HH:mm'),
      location: location,
      players_field: players_field,
      name: name
    }
  };

  let actionMatchButton;
  switch (title) {
    case constants.OPEN_GAMES.title:
      actionMatchButton = <button className='join-btn' onClick={joinGame}>Join</button>
      break;
    case constants.MY_GAMES.title:
      actionMatchButton = <button className='leave-btn' onClick={leaveGame}>Leave</button>
      break;
    default:
      actionMatchButton = undefined
  }

  let deleteButton
  if (id_admin === Number(user)) {
    deleteButton = <button className='del-btn' onClick={deleteGame}>Del</button>
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }
  const customStyles = {
    content: {
      color: 'rgba(255, 255, 255, 0.5)',
      width: '340px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '0px',
      overflow: 'hidden',
      transform: 'translate(-50%, -50%)',
      background: '#242a2b'
    }
  };

  let editButton
  if (id_admin === Number(user)) {
    editButton = <button className='edit-btn' onClick={setModalIsOpenToTrue}>Edit</button>
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        portalClassName={'ReactModal__Overlay ReactModal__Overlay--after-open modal'}
        style={customStyles}
        >
        <GameForm props={props} afterClick={setModalIsOpenToFalse} toggleSwitch={toggleSwitch} />
      </Modal>

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
          <div className='joined'>{players} joined <span className='absents'>— {`${players_field - players} absents`}</span> </div>

        </div>

        <div className='match'>
          <div className='time'>
            {dayjs(date).utc().format('HH:mm')}
          </div>
          <div className='location'>{location}</div>
        </div>

        <div className='action-match'>
          {deleteButton} {editButton} {actionMatchButton}
        </div>
      </div>
    </>
  )
}

export default Match