import React from 'react';
import { NavLink } from 'react-router-dom'
import constants from '../constants/index'
import icons from '../icons/icons';
import '../css/Styles.css';

function Header() {
    return (
        <div className='header'>
            <div className='topbar-container'>
                <div className='logo'>
                    gute<span>match</span>
                </div>
                <NavLink to={constants.ACCOUNT.path}
                    className={'account-icon'}>
                    <img src={icons.settingsIcon} alt={constants.ACCOUNT.title} width="22" height="22" />
                </NavLink>
            </div>
        </div>
    )
}

export default Header;
