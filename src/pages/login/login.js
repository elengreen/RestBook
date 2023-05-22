import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import rest from "../../shared/rest.svg";
import book from "../../shared/book.svg";
import './login.css'

const Login = ()  => {
    return (
<Container>
            <Row>
                <Col className="restbook"><Image src={rest}/></Col>
                <Col className="centralcol">
                    <h1 className="registration">Вход</h1>
                    <Form className='d-flex flex-column align-items-center'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="mail@mail.com" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Создать аккаунт
                        </Button>
                        <Link to="/registration" className="mb-3">Создать аккаунт</Link>
                        <Link to="/registration">Создать аккаунт заведения</Link>
                    </Form>

                </Col>
                <Col className="restbook"><Image src={book}/></Col>
            </Row>
        </Container>
    );
}

export default Login;