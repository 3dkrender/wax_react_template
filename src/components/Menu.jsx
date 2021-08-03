import { css } from 'glamor';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LogoIcon from '../images/3DK_LOGO_ICON_1300.png';
import EnterIcon from '../images/enter.png';
import ExitIcon from '../images/exit.png';
import { UserService } from '../UserService';

export const Menu = (props) => {

    const UserState = useSelector((store) => store.user);
    
    const disabledStyle = css({
        opacity: 0.5
    })

    const onHandleLogout = () => {
        UserService.logout();
    }

    return (
        <nav id="menu" className="d-flex justify-content-between align-items-center px-5">
            {
                (UserState.isLogged) ?
                <Redirect to="/home" /> : 
                <></>
            }
            <div className="d-flex align-items-center">
                <img src={LogoIcon} alt="LogoIcon" width="42" />
                <div className="ms-4 text-white">
{                (UserState.isLogged) ?
                    `${UserState.name} - Wallet: ${UserState.balance}` : ''
                    
}                </div>
            </div>
            <div className="d-flex">
                <Link to="/" className="btn-item">Main</Link>
                <Link to="/home" className={`${(UserState.isLogged) ? '' : disabledStyle} btn-item`}>Home</Link>
                <Link to="/page2" className={`${(UserState.isLogged) ? '' : disabledStyle} btn-item`}>Page2</Link>
                {
                    !UserState.isLogged &&
                    <Link to="/login" className="btn-item"><img src={EnterIcon} alt="Loggin" width="24" /> Login</Link>
                }
                {
                    UserState.isLogged &&
                    <Link to="/logout" className="btn-item"  onClick={onHandleLogout}>Logout <img src={ExitIcon} alt="Exit" width="24"/></Link>
                }
            </div>
        </nav>
    );
}