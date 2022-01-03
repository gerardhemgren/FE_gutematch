import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import matchService from '../services/matches';
import constants from '../constants/index';
import { User } from '../auth/UserId';

const dayjs = require('dayjs');

function MatchForm({handleFocusIcon}) {
    const user = useContext(User);

    const [inputMatch, setInputMatch] = useState({ date: dayjs().format('YYYY-MM-DD'), time: dayjs().format('HH:mm'), location: '', players_field: 10, name: '' });
    const handleInputCreateForm = (event) => {
        setInputMatch({ ...inputMatch, [event.target.name]: event.target.value });
        setApiMessage(null)
    }
    const resetForm = () => {
        setInputMatch({ ...inputMatch, date: '', time: '', location: '', players_field: 10, name: '' });
    }

    let history = useHistory()
    const handleForm = () => history.push(constants.MY_MATCHES.path);
    const title = constants.CREATE_MATCH.title;

    const [apiMessage, setApiMessage] = useState('')

    const ConditionalMessage = () => {
        return apiMessage === 'new row for relation "matches" violates check constraint "CHK_date::date"' 
        ? <div className='match-error'>Pick a future date</div> 
        : <div className='match-error'>{apiMessage}</div>;
    }

    const addMatch = async (event) => {
        event.preventDefault()
        const matchInfo = {
            date: `${inputMatch.date} ${inputMatch.time}`,
            location: inputMatch.location,
            players_field: Number(inputMatch.players_field),
            name: inputMatch.name
        }
        await matchService
            .createMatch(matchInfo, user)
            .then(async res => {
                setApiMessage(await res)
                if (res === 'Match created') {
                    handleForm()
                    handleFocusIcon()
                }
            })
    }

    return (
        <div id='match-form'>
            <div className='title-container'>
                {title}
            </div>
            <form
                onSubmit={addMatch}
                onReset={resetForm}
                className='create-match-form'
            >
                <div id='location-field'>
                    <fieldset>
                        <legend>Location</legend>
                        <input
                            className='input-adress'
                            required
                            placeholder='Adress'
                            name='location'
                            value={inputMatch.location}
                            onChange={handleInputCreateForm}
                        />
                        <label>Adress 1234, City, Country</label>
                    </fieldset>
                </div>
                <div className='field-and-name-field'>
                    <fieldset>
                        <legend>Field</legend>
                        <select
                            className='drop-players-field'
                            name="players_field"
                            type='number'
                            value={inputMatch.players_field}
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
                            placeholder='Match name'
                            maxLength='20'
                            name='name'
                            value={inputMatch.name}
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
                            value={inputMatch.date}
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
                            value={inputMatch.time}
                            onChange={handleInputCreateForm}>
                        </input>
                    </fieldset>
                </div>
                <ConditionalMessage />
                <div className='action-match-form'>
                    <button type='reset'>
                        Reset
                    </button>
                    {
                        user === false ?
                            <button
                                type='button'
                                className='disable-button'>
                                Create
                            </button> :
                            <button type='submit'>
                                Create
                            </button>
                    }
                </div>
            </form >
        </div >
    )
}

export default MatchForm