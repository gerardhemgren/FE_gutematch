import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import matchService from '../services/matchs';
import constants from '../constants/index';

const dayjs = require('dayjs');

function MatchForm({ props }) {
    const user = props;

    const [inputMatch, setInputMatch] = useState({ date: dayjs().format('YYYY-MM-DD'), time: '20:00', location: '', players_field: 10, name: '' });
    const handleInputCreateForm = (event) => {
        setInputMatch({ ...inputMatch, [event.target.name]: event.target.value });
    }
    const resetForm = () => {
        setInputMatch({ ...inputMatch, date: '', time: '', location: '', players_field: 10, name: '' });
    }

    let history = useHistory()
    const handleForm = () => history.push(constants.MY_MATCHS.path);
    const title = constants.CREATE_MATCH.title;

    const addMatch = async (event) => {
        event.preventDefault()
        if (user !== 0) {
            const matchInfo = {
                date: `${inputMatch.date} ${inputMatch.time}`,
                location: inputMatch.location,
                players_field: Number(inputMatch.players_field),
                name: inputMatch.name
            }
            await matchService
                .createMatch(matchInfo, user)
                .then(async res => {
                    //   setApiMessage(await res)
                    if (res === 'Match created') {
                        handleForm()
                        // setApiMessage(res)
                    }
                })
        } else {
            //   setApiMessage('You must be logged to create a match')
        }
    }

    return (
        <div id='match-form'>
            <div className='title-container'>
                {title}
            </div>
            <form onSubmit={addMatch} onReset={resetForm} className='create-match-form'>
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
                <div className='name-field'>
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
                            maxLength='10'
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
                <div className='action-match-form'>
                    <button type='reset' value='Reset'>
                        Reset
                    </button>
                    <button type='submit'>
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MatchForm