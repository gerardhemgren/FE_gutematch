import React from 'react';
import constants from '../constants/index';
import GameForm from './GameForm';

const dayjs = require('dayjs');

function CreateGame() {
    const title = constants.CREATE_GAME.title;
    const gameObject = {
        actions: ['create', 'reset'],
        matchInfo: {
            date: dayjs().format('YYYY-MM-DD'),
            time: dayjs().add(1, 'h').format('HH:00'),
            location: '',
            players_field: 10,
            name: ''
        }
    };

    return (
        <>
            <div id='match-form'>
                <div className='title-container'>
                    {title}
                </div>
                <GameForm gameObject={gameObject} />
            </div>
        </>
    )
}

export default CreateGame;