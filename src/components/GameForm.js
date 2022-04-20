import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../auth/UserId';
import matchService from '../services/matches';
import Modal from 'react-modal';
import Match from './Match';
import icons from '../icons/icons';
import '../css/Styles.css';

const dayjs = require('dayjs');
const clientDate = { clientDate: dayjs().format('YYYY-MM-DD HH:mm:ss') };

function GameForm({ props, afterClick, toggleSwitch }) {
    const { actions, matchInfo } = props
    const user = useContext(User);
    const [input, setInput] = useState({
        date: matchInfo.date,
        time: matchInfo.time,
        location: matchInfo.location,
        players_field: matchInfo.players_field,
        name: matchInfo.name
    });
    const handleInputCreateForm = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
        toggleAlert(false);
    }
    const resetForm = () => {
        setInput({
            ...input,
            date: matchInfo.date,
            time: matchInfo.time,
            location: matchInfo.location,
            players_field: matchInfo.players_field,
            name: matchInfo.name
        });
    }
    const navigate = useNavigate()

    const message = () => {
        setModalIsOpenToTrue()
    }

    const [alert, setAlert] = useState(false);
    const toggleAlert = (condition) =>{
        setAlert(condition)
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
        navigate('../my_games')
    }
    const customStyles = {
        overlay: {
            background: '#74FF99',
        },
        content: {
            position: 'relative',
            background: '#74FF99',
            'maxWidth': '360',
            margin: '80px 0px 0%',
            padding: '24px 8px 0px',
            inset: '0px',
            border: 'solid 1px #74FF99'
        }
    };

    const newMatchInfo = {
        matchId: matchInfo.matchId,
        date: `${input.date} ${input.time}`,
        location: input.location,
        players_field: Number(input.players_field),
        name: input.name
    }
    const callService = async (e) => {
        e.preventDefault()
        if (clientDate.clientDate < (input.date + ' ' + input.time)) {
            switch (actions[0]) {
                case 'create':
                    await matchService.createGame(newMatchInfo, user).then(r => {
                        r === 'Match created' ?
                            message()
                            : console.log('error')
                    })
                    break;
                case 'edit':
                    await matchService.editGame(newMatchInfo).then(r => {
                        navigate('../my_games')
                        afterClick()
                        toggleSwitch()
                    })
                    break;
                default:
                    console.log('fail to call')
                    break;
            }
        } else {
            toggleAlert(true)
        }
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpenToFalse()}
                portalClassName={'ReactModal__Overlay ReactModal__Overlay--after-open modal'}
                style={customStyles}
                backdrop={true}
                ariaHideApp={false}
            >
                <div className='verified'>
                    <Match
                        closeTimeoutMS={200}
                        isOpen
                        contentLabel="modal"
                        onRequestClose={() => this.toggleModal()}
                        match={newMatchInfo}
                        user={null}
                        toggleSwitch={null}
                        joinGame={null}
                        leaveGame={null}
                        deleteGame={null}
                    />
                    <img src={icons.verifiedIcon}
                        alt={'verified'}
                        width="90" height="90"
                    />
                </div>
            </Modal>
            <form
                onSubmit={callService}
                onReset={resetForm}
                className='match-form'
            >
                <>
                    <div id='location-field'>
                        <fieldset>
                            <legend>Location</legend>
                            <input
                                className='input-adress'
                                required
                                placeholder='Address'
                                name='location'
                                value={input.location}
                                onChange={handleInputCreateForm}
                            />
                        </fieldset>
                    </div>
                    <div className='field-and-name-field'>
                        <fieldset>
                            <legend>Field</legend>
                            <select
                                className='drop-players-field'
                                name="players_field"
                                type='number'
                                value={input.players_field}
                                onChange={handleInputCreateForm}>
                                <option value="10">F — 5</option>
                                <option value="14">F — 7</option>
                                <option value="18">F — 9</option>
                                <option value="22">F — 11</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <legend>Name</legend>
                            <input
                                className='input-name'
                                required
                                placeholder='Game name'
                                maxLength='20'
                                name='name'
                                value={input.name}
                                onChange={handleInputCreateForm}
                            />
                        </fieldset>
                    </div>
                    <div className={`${alert ? 'date-invalid' : 'null'} date-field`} >
                        <fieldset>
                            <legend>Date</legend>
                            <input
                                required
                                className='input-date'
                                type="date"
                                name="date"
                                min={dayjs().format('YYYY-MM-DD')}
                                max={dayjs().add(3, 'M').format('YYYY-MM-DD')}
                                value={input.date}
                                onChange={handleInputCreateForm}>
                            </input>
                        </fieldset>
                        <fieldset>
                            <legend>Time</legend>
                            <input
                                required
                                className='input-time'
                                type="time"
                                name="time"
                                value={input.time}
                                onChange={handleInputCreateForm}>
                            </input>
                        </fieldset>
                    </div>
                </>
                <div className='action-match-form'>
                    {actions[1] === 'reset' ?
                        <button type='reset'>
                            {actions[1]}
                        </button> :
                        <button type='button' onClick={afterClick}>
                            {actions[1]}
                        </button>
                    }
                    <button type='submit'>
                        {actions[0]}
                    </button>
                </div>
            </form >
        </>
    )
}

export default GameForm