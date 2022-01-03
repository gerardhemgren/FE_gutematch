import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import userService from '../services/users';

function UserId({ children }) {
    const [playerId, setPlayerId] = useState(localStorage.getItem('player_id'));
    const { isLoading, user } = useAuth0();

    useEffect(() => {
        if (playerId) {
            return null
        } else {
            if (!isLoading) {
                if (user) {
                    const userInfo = {
                        sub: user.sub,
                        name: user.name,
                        picture: user.picture
                    }
                    userService
                        .logIn_signUp(userInfo)
                        .then(async res => {
                            setPlayerId(await res[0].id)
                            localStorage.setItem('player_id', await res[0].id)
                            localStorage.setItem('player_name', await res[0].name)
                            localStorage.setItem('player_picture', userInfo.picture)
                        })
                } else {
                    setPlayerId('no user')
                }
            }
        }
    }, [playerId, isLoading, user])

    return (
        <User.Provider value={playerId}>
            {children}
        </User.Provider>
    )
}

export const User = React.createContext()
export default UserId;