import React from 'react';

import { Button, Nav, Navbar, Image } from 'react-bootstrap'
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, logOut } from '../../pages/login/loginSlice.js';


import './header.css';

import profileIcon from '../../shared/profileicon.svg'
import logOutIcon from '../../shared/logout.svg'
import { useGetUserQuery } from '../../pages/profile/profileApiSlice.js';

const Header = () => {
    const { data: profile = null } = useGetUserQuery();
    const location = useLocation();
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exit = () =>{
        dispatch(logOut());
        navigate('/');

    }

    const Buttons = () => {
        return (
            <>
                <Button className='login' variant="light" href="/login">Войти</Button>
                <Button variant="primary" href="/registration">Зарегистрироваться</Button>
            </>
        )
    }

    const ProfileIcon = () => {
        return (
            <>
                <Image src={profileIcon} className='me-2'></Image>
                <span>{profile.name}</span>
                <Button className='ms-3' variant="light" onClick={exit}><Image src={logOutIcon}></Image>
                </Button>
            </>
        )
    }

    if (!profile)
        return (<></>);

    return (
        <>

            <Navbar>
                <Navbar.Brand href="/"><span className='cards-results'>Rest</span>Book</Navbar.Brand>
                <Nav activeKey={location.pathname}>

                    <NavLink className='nav-link' to="/">Рестораны</NavLink>
                    {token &&
                        <>
                            <NavLink className='nav-link' to="/favourites">Избранное</NavLink>
                            <NavLink className='nav-link' to="/booking">Заявки на бронирование</NavLink>
                            <NavLink className='nav-link' to="/profile">Профиль</NavLink>
                        </>
                    }
                </Nav>

                <Navbar.Collapse className="justify-content-end">
                    {token ? ProfileIcon() : Buttons()}
                </Navbar.Collapse>

            </Navbar>

        </>
    );
}

export default Header;