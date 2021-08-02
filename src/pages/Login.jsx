import { css } from 'glamor';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPlayerData, setPlayerLogout } from '../GlobalState/UserReducer';

import { UserService } from '../UserService';

export const Login = () => {

    const dispatch = useDispatch();
    const locationHistory = useHistory();

    const buttonStyle = css({
        width: '100%',
        height: '100vh',
        marginTop: '160px'
    });

    const handleLogin = () => {
        UserService.login(() => {
            if(UserService.isLogged()) {
                locationHistory.push('/home');
            } else {
                dispatch(setPlayerLogout());
            }
        });
    }

    return (
        <div className={`${buttonStyle} d-flex justify-content-center`}>
            <div>
                <button onClick={handleLogin} className="btn btn-success btn-lg">LOGIN</button>
            </div>
        </div>
    );
}