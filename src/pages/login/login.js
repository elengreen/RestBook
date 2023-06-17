import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import rest from "../../shared/rest.svg";
import book from "../../shared/book.svg";
import { useLoginMutation } from './loginApiSlice';
import { useDispatch } from 'react-redux';
import './login.css'
import { setCredentials } from './loginSlice';
import { useForm } from 'react-hook-form';

const Login = () => {

    const [login, { error }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register: registerLogin,
        handleSubmit: handleLogin,
        formState: { errors: errorsLogin }
    } = useForm({
        mode: "onChange",
    });

    const onSubmitLogin = async (data) => {
        try {
            const tokensInfo = await login(data).unwrap()
            dispatch(setCredentials({ ...tokensInfo }));
            navigate('/profile')
        } catch (error) {}
    }

    return (
        <Container>
            <Row>
                <Col className="restbook"><Image src={rest} /></Col>
                <Col className="centralcol">
                    <h1 className="registration">Вход</h1>
                    <Form className='d-flex flex-column align-items-center' onSubmit={handleLogin(onSubmitLogin)}>
                    {(error?.status === 500) && <span className='input-error mb-2'>Введены некорректные данные</span>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="mail@mail.com" {...registerLogin("email", { required: true})}/>
                            {errorsLogin.email && <span className='input-error'>Необходимо ввести email</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" {...registerLogin("password", { required: true, minLength: 8 })} />
                            {errorsLogin.password && <span className='input-error'>Минимальная длина - 8 символов</span>}
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