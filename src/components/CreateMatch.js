import React from 'react';
import constants from '../constants/index';
import MatchForm from './MatchForm';

const dayjs = require('dayjs');

function CreateMatch({ handleFocusIcon }) {
    const title = constants.CREATE_MATCH.title;
    const props = {
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
                <MatchForm
                    handleFocusIcon={handleFocusIcon}
                    props={props}
                />
            </div>
        </>
    )
}

export default CreateMatch