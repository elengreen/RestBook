import React from 'react';

import { Button, Nav, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
    const location = useLocation();
    return (
        <>
            <Navbar>
                <Navbar.Brand href="/"><span className='cards-results'>Rest</span>Book</Navbar.Brand>
                <Nav activeKey={location.pathname}>
                    <Nav.Link href="/">Рестораны</Nav.Link>
                    <Nav.Link href="/favourites">Избранное</Nav.Link>
                    <Nav.Link href="/booking">Заявки на бронирование</Nav.Link>
                    <Nav.Link href="/profile">Профиль</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button className='login' variant="light" href="/login">Войти</Button>                      
                    <Button variant="primary" href="/registration">Зарегистрироваться</Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;