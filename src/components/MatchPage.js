import React from 'react';
import Match from './Match';
import matchService from '../services/matchs';

function MatchPage({ props }) {
    const { user, source, matchs, action } = props;

    const join = async (matchId) => {
        await matchService
            .joinMatch(matchId, user)
            .then(async res => {
                action()
                // setApiMessage(await res)
            })
    }

    const leave = async (matchId) => {
        await matchService
            .leaveMatch(matchId, user)
            .then(async res => {
                action()
                // setApiMessage(await res)
            })
    }

    const deleteMatch = async (matchId) => {
        await matchService
            .deleteMatch(matchId, user)
            .then(async res => {
                action()
                // setApiMessage(await res)
            })
    }

    return (
        <div>
            {matchs.map((match, index) =>
                <Match
                    key={index}
                    match={match}
                    user={user}
                    source={source}
                    join={() => join(match.id_match)}
                    leave={() => leave(match.id_match)}
                    deleteMatch={() => deleteMatch(match.id_match)}
                />
            )}
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchPage
