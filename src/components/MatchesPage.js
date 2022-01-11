import React, { useState, useEffect, useContext } from 'react';
import { User } from '../auth/UserId';
import { useHistory } from 'react-router-dom';
import Match from './Match';
import matchService from '../services/matches';
import constants from '../constants/index'

function MatchesPage({ handleFocusIcon }) {
    const user = useContext(User);

    let history = useHistory();
    const path = history.location.pathname;
    const handleAction = () => history.push(constants.MY_MATCHES.path);

    const [matches, setMatches] = useState(null)
    const [title, setTitle] = useState('')
    const [renderSwitch, setRenderSwitch] = useState(false)

    useEffect(() => {
        if (user !== 'no user' && (path === constants.OPEN_MATCHES.path || path === '/')) {
            setTitle(constants.OPEN_MATCHES.title);
            matchService
                .getOpenMatches(user)
                .then(res => { typeof res === 'object' ? setMatches(res) : setMatches([]) })
        } else {
            setTitle(constants.MY_MATCHES.title);
            matchService
                .getMyMatches(user)
                .then(res => { typeof res === 'object' ? setMatches(res) : setMatches([]) })
        }
        return null
    }, [user, path, renderSwitch, history])

    const ConditionalSpinner = () => {
        if (matches === null) {
            return (
                <div className="lds-ripple"><div></div><div></div></div>
            )
        } else {
            return (
                matches.length > 0
                    ?
                    matches.map((match, index) =>
                        <Match
                            key={index}
                            match={match}
                            title={title}
                            joinMatch={() => joinMatch(match.id_match)}
                            leaveMatch={() => leaveMatch(match.id_match)}
                            deleteMatch={() => deleteMatch(match.id_match)}
                        />
                    )
                    : <ConditionalMessage />
            )
        }
    }

    const ConditionalMessage = () => {
        return path === constants.MY_MATCHES.path
            ? <div className='match-error'>Pick a match from the open matches tab.</div>
            : <div className='match-error'>There are no games available, create one!</div>;
    }

    const joinMatch = async (matchId) => {
        await matchService
            .joinMatch(matchId, user)
            .then(async res => {
                handleAction()
                handleFocusIcon()
                setRenderSwitch(!renderSwitch);
                // setApiMessage(await res)
            })
    }

    const leaveMatch = async (matchId) => {
        await matchService
            .leaveMatch(matchId, user)
            .then(async res => {
                setRenderSwitch(!renderSwitch);
                handleAction()
                // setApiMessage(await res)
            })
    }

    const deleteMatch = async (matchId) => {
        await matchService
            .deleteMatch(matchId, user)
            .then(async res => {
                setRenderSwitch(!renderSwitch);
                handleAction()
                // setApiMessage(await res)
            })
    }

    return (
        <div id='match-page'>
            <div className='title-container'>
                {title}
            </div>
            <ConditionalSpinner />
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchesPage