import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../auth/UserId';
import matchService from '../services/matches';
import constants from '../constants/index'
import Match from './Match';
const dayjs = require('dayjs');
const clientDate = { clientDate: dayjs().format('YYYY-MM-DD HH:mm:ss') };
function MatchesPage() {
    const user = useContext(User);
    const [matches, setMatches] = useState(null)
    const [title, setTitle] = useState('')

    const routeLocation = useLocation().pathname
    const [path, setPath] = useState(routeLocation)
    useEffect(() => {
        setPath(routeLocation)
    }, [routeLocation])

    const navigate = useNavigate()
    const [renderSwitch, setRenderSwitch] = useState(false)

    const mounted = useRef(null)
    useEffect(() => {
        mounted.current = true
        if (mounted) {
            if (user !== 'no user' && (path === constants.OPEN_GAMES.path || path === '/')) {
                setTitle(constants.OPEN_GAMES.title);
                matchService
                    .getOpenGames(user, clientDate)
                    .then(res => { typeof res === 'object' ? setMatches(res) : setMatches([]) })
            } else {
                setTitle(constants.MY_GAMES.title);
                matchService
                    .getMyGames(user, clientDate)
                    .then(res => { typeof res === 'object' ? setMatches(res) : setMatches([]) })
            }
        }
        return () => {
            setMatches([])
            mounted.current = false
        }
    }, [user, path, renderSwitch])

    function toggleSwitch() {
        setRenderSwitch(!renderSwitch);
    }

    const Spinner = () => {
        return (
            <div className="lds-ripple"><div></div><div></div></div>
        )
    }

    const EmptyGamesMessage = () => {
        return path === constants.MY_GAMES.path
            ? <div className='match-error'>Pick a game from the open games tab.</div>
            : <div className='match-error'>There are no games available, create one!</div>;
    }

    const Games = () => {
        if (matches === null) {
            return <Spinner />
        } else {
            return (
                matches.length > 0
                    ?
                    matches.map((match, index) =>
                        <Match
                            key={index}
                            match={match}
                            title={title}
                            user={user}
                            toggleSwitch={() => toggleSwitch()}
                            joinGame={() => joinGame(match.id_match)}
                            leaveGame={() => leaveGame(match.id_match)}
                            deleteGame={() => deleteGame(match.id_match)}
                        />
                    )
                    : <EmptyGamesMessage />
            )
        }
    }

    const joinGame = async (matchId) => {
        await matchService
            .joinGame(matchId, user)
            .then(async res => {
                navigate('../my_games')
                toggleSwitch()
            })
    }

    const leaveGame = async (matchId) => {
        await matchService
            .leaveGame(matchId, user)
            .then(async res => {
                setRenderSwitch(!renderSwitch);
                navigate('../my_games')
            })
    }

    const deleteGame = async (matchId) => {
        await matchService
            .deleteGame(matchId, user)
            .then(async res => {
                setRenderSwitch(!renderSwitch);
                navigate('../my_games')
            })
    }

    return (
        <div className='match-page'>
            <div className='title-container'>
                {title}
            </div>
            <Games />
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchesPage