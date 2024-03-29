import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../auth/UserId';
import matchService from '../services/matches';
import constants from '../constants/index';
import Match from './Match';
import Title from './layout/Title';
import icons from '../icons/icons';

const dayjs = require('dayjs');
const clientDate = { clientDate: dayjs().format('YYYY-MM-DD HH:mmZ') };

function MatchesPage() {
    const user = useContext(User);
    const [matches, setMatches] = useState(null);
    const [title, setTitle] = useState('');

    const routeLocation = useLocation().pathname;
    const [path, setPath] = useState(routeLocation);
    useEffect(() => {
        setPath(routeLocation)
    }, [routeLocation]);

    const navigate = useNavigate();
    const [renderAgain, setRenderAgain] = useState(false);
    function toggleRenderAgain() {
        setRenderAgain(!renderAgain);
    };

    const mounted = useRef(null);
    useEffect(() => {
        mounted.current = true;
            if (mounted) {
                if (user !== 'no user' && (path === constants.OPEN_GAMES.path || path === '/')) {
                    setTitle(constants.OPEN_GAMES.title);
                    matchService
                        .getOpenGames(user, clientDate)
                        .then(res => { typeof res === 'object' ? setMatches(res) : setMatches([]) });
                } else {
                    setTitle(constants.MY_GAMES.title);
                    matchService
                        .getMyGames(user, clientDate)
                        .then(res => { typeof res === 'object' ? setMatches(res) : setMatches([]) });
                }
            }
        return () => {
            setMatches(null);
            mounted.current = false;
        }
    }, [user, path, renderAgain]);

    const Spinner = () => {
        return (
            <div className="lds-ripple"><div></div><div></div></div>
        )
    };

    const EmptyGamesMessage = () => {
        return path === constants.MY_GAMES.path
            ?
            <div className='match-error'>
                <img src={icons.emptyBookmark} alt='Empty bookmarks'></img>
                <p>Pick a game from open games</p>
            </div>
            :
            <div className='match-error'>
                <img src={icons.emptyGames} alt='Empty bookmarks'></img>
                <p>There are no games available, create one!</p></div>;
    };

    const Games = () => {
        if (matches === null) {
            return <Spinner />
        } else {
            if (matches.length > 0) {
                return (
                    matches.map((match, index) =>
                        <Match
                            key={index}
                            match={match}
                            title={title}
                            user={user}
                            toggleRenderAgain={() => toggleRenderAgain()}
                            joinGame={() => joinGame(match.id_match)}
                            leaveGame={() => leaveGame(match.id_match)}
                            deleteGame={() => deleteGame(match.id_match)}
                        />
                    )
                )
            } else if (matches.length === 0) {
                return <EmptyGamesMessage />;
            } else { return null };
        }
    };

    const joinGame = async (matchId) => {
        await matchService
            .joinGame(matchId, user)
            .then(async res => {
                navigate('../my_games');
                toggleRenderAgain();
            })
    };

    const leaveGame = async (matchId) => {
        await matchService
            .leaveGame(matchId, user)
            .then(async res => {
                toggleRenderAgain();
                navigate('../my_games');
            })
    };

    const deleteGame = async (matchId) => {
        await matchService
            .deleteGame(matchId, user)
            .then(async res => {
                toggleRenderAgain();
                navigate('../my_games');
            })
    };

    return (
        <div className='match-page'>
            <Title title={title}/>
            <Games />
            <div className='bottom-space'></div>
        </div>
    )
}

export default MatchesPage;