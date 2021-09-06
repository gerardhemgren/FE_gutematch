import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Match from './Match';
import matchService from '../services/matchs';
import constants from '../constants/index'

function MatchPage({ props }) {
    const user = props;

    let history = useHistory();
    const path = history.location.pathname;
    const handleAction = () => history.push(constants.MY_MATCHS.path);

    const [matchs, setMatchs] = useState([])
    const [title, setTitle] = useState('')
    const [renderSwitch, setRenderSwitch] = useState(false)


    useEffect(() => {
        if (path === constants.ALL_MATCHS.path) {
            setTitle(constants.ALL_MATCHS.title);
            const showAllMatchs = async () => {
                await matchService
                    .getAllMatchs()
                    .then(res => {
                        setMatchs(res)
                    })
            }
            showAllMatchs()
        } else if (path === constants.OPEN_MATCHS.path) {
            setTitle(constants.OPEN_MATCHS.title);
            const showOpenMatchs = async () => {
                if (user !== 0) {
                    await matchService
                        .getOpenMatchs(user)
                        .then(res => {
                            if (typeof res === 'object') {
                                setMatchs(res)
                            } else {
                                setMatchs([])
                                // setApiMessage(res)
                            }
                        })
                } else {
                    //   setApiMessage('You must be logged to see opened matchs')
                }
            }
            showOpenMatchs()
        } else if (path === constants.MY_MATCHS.path) {
            setTitle(constants.MY_MATCHS.title);
            const showMyMatchs = async () => {
                if (user !== 0) {
                    await matchService
                        .getMyMatchs(user)
                        .then(res => {
                            if (typeof res === 'object') {
                                setMatchs(res)
                            } else {
                                setMatchs([])
                                // setApiMessage(res)
                            }
                        })
                } else {
                    setMatchs([])
                    //   setApiMessage('You must be logged to join a match')
                }
            }
            showMyMatchs()
        }
    }, [user, path, renderSwitch])

    const joinMatch = async (matchId) => {
        await matchService
            .joinMatch(matchId, user)
            .then(async res => {
                setRenderSwitch(!renderSwitch);
                handleAction()
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
            {matchs.map((match, index) =>
                <Match
                    key={index}
                    match={match}
                    user={user}
                    path={path}
                    joinMatch={() => joinMatch(match.id_match)}
                    leaveMatch={() => leaveMatch(match.id_match)}
                    deleteMatch={() => deleteMatch(match.id_match)}
                />
            )}
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchPage