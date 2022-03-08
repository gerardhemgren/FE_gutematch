import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../auth/UserId';
import matchService from '../services/matches';

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

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

    const callService = async (e) => {
        e.preventDefault()
        const newMatchInfo = {
            matchId: matchInfo.matchId,
            date: `${input.date} ${input.time}`,
            location: input.location,
            players_field: Number(input.players_field),
            name: input.name
        }
        switch (actions[0]) {
            case 'create':
                await matchService.createGame(newMatchInfo, user).then(r => {
                    navigate('../my_games')
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
    }

    return (
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
                    {/* <label>Adress 1234, City, Country</label> */}
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
            <div className='date-field'>
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
    )
}

export default GameForm