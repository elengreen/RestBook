import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import './registration.css'
import { Link, useNavigate } from 'react-router-dom';
import rest from "../../shared/rest.svg";
import book from "../../shared/book.svg";
import { useForm } from 'react-hook-form';
import { useRegistrationOwnerMutation, useRegistrationUserMutation } from './registrationApiSlice';

const Registration = ({ isAdmin = false }) => {
    const regHeader = isAdmin ? 'Регистрация заведения' : 'Регистрация';

    const navigate = useNavigate();

    const [registrationUser, { error: errorUserReg }] = useRegistrationUserMutation();
    const [registrationOwner, { error: errorOwnerReg }] = useRegistrationOwnerMutation();

    const { register: registerRegistrationFormChange,
        getValues: getPasswordChange,
        handleSubmit: handleRegistrationFormChange,
        formState: { errors: errorsRegistrationForm },
        reset: resetRegistrationForm }
        = useForm({
            mode: "onChange",
        });

    const onSubmitRegistrationForm = async (data) => {
        resetRegistrationForm();
        try {
            if (isAdmin) {
                await registrationOwner(data).unwrap();
            } else {
                await registrationUser(data).unwrap();
            }
            navigate('/login');
        } catch (error) { }
    };


    console.log(errorUserReg)
    return (
        <Container>
            <Row>
                <Col className="restbook"><Image src={rest} /></Col>
                <Col>
                    <h1 className="registration">{regHeader}</h1>
                    <Form className='d-flex flex-column align-items-center' onSubmit={handleRegistrationFormChange(onSubmitRegistrationForm)}>
                        {((errorUserReg?.status === 500) || (errorOwnerReg?.status === 500)) && <span className='input-error mb-2'>Пользователь с таким email уже существует</span>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="mail@mail.com" {...registerRegistrationFormChange("email", { required: true })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='password-input'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" {...registerRegistrationFormChange("password", { required: true, minLength: 8 })} />
                            {errorsRegistrationForm.password && <span className='input-error'>Минимальная длина - 8 символов</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='password-confirm'>
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" {...registerRegistrationFormChange("confirmPassword", { required: true, validate: v => v === getPasswordChange("password") })} />
                            {errorsRegistrationForm.confirmPassword && <span className='input-error'>Пароли не совпадают</span>}
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