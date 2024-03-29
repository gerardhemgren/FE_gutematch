import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import constants from '../constants/index';
import GameForm from './GameForm';
import Modal from 'react-modal';

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const Match = ({ user, title, match, joinGame, leaveGame, deleteGame, toggleRenderAgain }) => {
  const { id_match, name, date, location, players, players_field, id_admin, is_full } = match;

  const gameObject = {
    actions: ['edit', 'cancel'],
    matchInfo: {
      matchId: id_match,
      date: process.env === 'prod' ? dayjs(date).utc().format('YYYY-MM-DD') : dayjs(date).format('YYYY-MM-DD'),
      time: process.env === 'prod' ? dayjs(date).utc().format('HH:mm') : dayjs(date).format('HH:mm'),
      zone: dayjs(date).format('Z'),
      location: location,
      players_field: players_field,
      name: name
    }
  };

  const routeLocation = useLocation().pathname;
  const [path, setPath] = useState(routeLocation);
  useEffect(() => {
    setPath(routeLocation);
    return () => {
      setPath(null);
    }
  }, [routeLocation]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    overlay: {
      background: 'rgba(255, 255, 255, 0.5)',
      'backdropFilter': 'blur(5px)'
    },
    content: {
      color: 'rgba(255, 255, 255, 1)',
      width: '340px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '12px 0px 0px 0px',
      overflow: 'hidden',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 255, 255, 0.5)',
      'backdropFilter': 'blur(50px)',
      'borderRadius': '8px',
    }
  };

  let actionMatchButton;
  switch (title) {
    case constants.OPEN_GAMES.title:
      actionMatchButton = <button className='join-btn' onClick={joinGame}>Join</button>;
      break;
    case constants.MY_GAMES.title:
      actionMatchButton = <button className='leave-btn' onClick={leaveGame}>Leave</button>;
      break;
    default:
      actionMatchButton = undefined;
  };

  let editButton;
  if (id_admin === Number(user)) {
    editButton = <button className='edit-btn' onClick={setModalIsOpenToTrue}>Edit</button>
  };

  let deleteButton;
  if (id_admin === Number(user)) {
    deleteButton = <button className='del-btn' onClick={deleteGame}>Delete</button>
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        portalClassName={'ReactModal__Overlay ReactModal__Overlay--after-open modal'}
        style={customStyles}
      >
        <GameForm gameObject={gameObject} afterClick={setModalIsOpenToFalse} toggleRenderAgain={toggleRenderAgain} />
      </Modal>

      <div className='match-container'>
        <div className='title'>
          <div className='name'>{name}</div>
        </div>

        <div className='date'>
          <div className='day'>
            {dayjs(date).format('dddd')}
          </div>
          <div className='date-month'>
            {dayjs(date).format('DD — MMM — YY')}
          </div>
        </div>

        <div className='players'>
          <div className='field'>F{players_field / 2}</div>
          {players ?
            <div className='joined'>
              {players} joined
              {is_full ? <span className='is-full'>full </span> : <span className='absents'> — {`${players_field - players} absents`}</span>}
            </div>
            : null}
        </div>

        <div className='match'>
          <div className='time'>
            {
              path === constants.CREATE_GAME.path ?
                dayjs(date).format('HH:mm')
                :
                process.env === 'prod' ?
                  dayjs(date).utc().format('HH:mm')
                  :
                  dayjs(date).format('HH:mm')
            }
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

export default Match;