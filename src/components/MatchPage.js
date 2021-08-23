import React from 'react'
import Match from './Match'
import matchService from '../services/matchs'


function MatchPage({ props }) {
    const uAuth = props.user
    const clientRequest = props.source
    const appMatchs = props.matchs

    const deleteMatch = async (matchId) => {
        await matchService
            .deleteMatch(matchId, uAuth)
            .then(async res => {
                // setApiMessage(await res)
            })
            window.location.pathname = 'my_matchs'
    }

    const join = async (matchId) => {
        await matchService
            .joinMatch(matchId, uAuth)
            .then(async res => {
                // setApiMessage(await res)
            })
            window.location.pathname = 'my_matchs'
    }

    const leave = async (matchId) => {
        await matchService
            .leaveMatch(matchId, uAuth)
            .then(async res => {
                // setApiMessage(await res)
            })
            window.location.pathname = 'my_matchs'
    }

    return (
        <div>
            {appMatchs.map((match, index) =>
                <Match
                    key={index}
                    match={match}
                    user={uAuth}
                    source={clientRequest}
                    join={() => {return (join(match.id_match))}}
                    leave={() => leave(match.id_match)}
                    deleteMatch={() => deleteMatch(match.id_match)}
                />
            )}
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchPage
