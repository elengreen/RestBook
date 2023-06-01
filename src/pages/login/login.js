import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import rest from "../../shared/rest.svg";
import book from "../../shared/book.svg";
import { useLoginMutation } from './loginApiSlice';
import { useDispatch } from 'react-redux';
import './login.css'
import { setCredentials } from './loginSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        const tokensInfo = await login({ email, password }).unwrap()
        dispatch(setCredentials({ ...tokensInfo }));
        navigate('/profile')
    };

    return (
        <Container>
            <Row>
                <Col className="restbook"><Image src={rest} /></Col>
                <Col className="centralcol">
                    <h1 className="registration">Вход</h1>
                    <Form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="mail@mail.com" value={email} onChange={handleEmailChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" value={password} onChange={handlePasswordChange} />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Войти
                        </Button>
                        <Link to="/registration" className="mb-3">Создать аккаунт</Link>
                        <Link to="/registration-restaurant">Создать аккаунт заведения</Link>
                    </Form>

                </Col>
                <Col className="restbook"><Image src={book} /></Col>
            </Row>
        </Container>
    );
}

export default Login;