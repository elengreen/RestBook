import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import './registration.css'
import { Link } from 'react-router-dom';
import rest from "../../shared/rest.svg";
import book from "../../shared/book.svg";

const Registration = () => {
    return (
        <Container>
            <Row>
                <Col className="restbook"><Image src={rest}/></Col>
                <Col>
                    <h1 className="registration">Регистрация</h1>
                    <Form className='d-flex flex-column align-items-center'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="mail@mail.com" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Создать аккаунт
                        </Button>
                        <Link to="/login">Войти в существующий аккаунт</Link>
                    </Form>

                </Col>
                <Col className="restbook"><Image src={book}/></Col>
            </Row>
        </Container>
    );
}

export default Registration;