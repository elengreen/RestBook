import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import './registration.css'
import { Link } from 'react-router-dom';
import rest from "../../shared/rest.svg";
import book from "../../shared/book.svg";

const Registration = ({ isAdmin = false }) => {
    const regHeader = isAdmin ? 'Регистрация заведения' : 'Регистрация';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordsMatch) {
            console.log(`Email: ${email}, Password: ${password}`);
        } else {
            alert('Повторите попытку');
        }
    };

    return (
        <Container>
            <Row>
                <Col className="restbook"><Image src={rest} /></Col>
                <Col>
                    <h1 className="registration">{regHeader}</h1>
                    <Form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="mail@mail.com" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='password-input'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="*******" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='password-confirm'>
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="*******" />
                            {!passwordsMatch && <p className='input-error'>Пароли не совпадают</p>}
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">Создать аккаунт</Button>
                        <Link to="/login">Войти в существующий аккаунт</Link>
                    </Form>

                </Col>
                <Col className="restbook"><Image src={book} /></Col>
            </Row>
        </Container>
    );
}

export default Registration;