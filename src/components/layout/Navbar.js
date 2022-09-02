import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import constants from '../../constants/index';
import icons from '../../icons/icons';
import '../../css/Styles.css';

function Navbar() {
    const path = useLocation().pathname; 

    return (
        <nav className='navbar'>
            <NavLink to={constants.OPEN_GAMES.path} className={path === '/' ? 'active' : 'nav-icon'}>
                <img src={icons.openMatchesIcon}
                    alt={constants.OPEN_GAMES.title}
                    width="20" height="20"
                />
            </NavLink>
            <NavLink to={constants.CREATE_GAME.path} className={'nav-icon'}>
                <img src={icons.createMatchIcon}
                    alt={constants.CREATE_GAME.title}
                    width="22" height="22"
                />
            </NavLink>
            <NavLink to={constants.MY_GAMES.path} className={'nav-icon'}>
                <img src={icons.myMatchesIcon}
                    alt={constants.MY_GAMES.title}
                    width="22" height="22"
                />
            </NavLink>
        </nav>
    )
};

export default Navbar;
