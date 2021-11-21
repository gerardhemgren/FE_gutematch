import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Match from './Match';
import matchService from '../services/matches';
import constants from '../constants/index'


function MatchesPage({ props, handleFocusIcon }) {
    const user = props;

    let history = useHistory();
    const path = history.location.pathname;
    const handleAction = () => history.push(constants.MY_MATCHES.path);

    const [matches, setMatches] = useState([0])
    const [title, setTitle] = useState('')
    const [renderSwitch, setRenderSwitch] = useState(false)

    const ConditionalSpinner = () => {
        if (matches[0] === 0) {
            return (
                <div className="lds-ripple"><div></div><div></div></div>
            )
        } else {
            return (
                matches.map((match, index) =>
                    <Match
                        key={index}
                        match={match}
                        user={user}
                        title={title}
                        joinMatch={() => joinMatch(match.id_match)}
                        leaveMatch={() => leaveMatch(match.id_match)}
                        deleteMatch={() => deleteMatch(match.id_match)}
                    />
                )
            )
        }
    }

    const ConditionalMessage = () => {
        if (!user && (path === constants.MY_MATCHES.path)) {
            return (
                <div className='match-error'>You must login to see your matches.</div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    useEffect(() => {
        if (user === false && (path === constants.ALL_MATCHES.path || path === '/')) {
            setTitle(constants.ALL_MATCHES.title);
            const showAllMatches = async () => {
                await matchService
                    .getAllMatches()
                    .then(res => {
                        setMatches(res)
                    })
            }
            showAllMatches()
        } else if (user !== false && (path === constants.OPEN_MATCHES.path || path === '/')) {
            setTitle(constants.OPEN_MATCHES.title);
            const showOpenMatches = async () => {
                if (user !== false) {
                    await matchService
                        .getOpenMatches(user)
                        .then(res => {
                            if (typeof res === 'object') {
                                setMatches(res)
                            } else {
                                setMatches([])
                                // setApiMessage(res)
                            }
                        })
                } else {
                    //   setApiMessage('You must be logged to see opened matches')
                }
            }
            showOpenMatches()
        } else if (path === constants.MY_MATCHES.path) {
            setTitle(constants.MY_MATCHES.title);
            const showMyMatches = async () => {
                if (user !== false) {
                    await matchService
                        .getMyMatches(user)
                        .then(res => {
                            if (typeof res === 'object') {
                                setMatches(res)
                            } else {
                                setMatches([])
                                // setApiMessage(res)
                            }
                        })
                } else {
                    setMatches([])
                    //   setApiMessage('You must be logged to join a match')
                }
            }
            showMyMatches()
        }
    }, [user, path, renderSwitch, history])

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
            <ConditionalMessage />
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchesPage