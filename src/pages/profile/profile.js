import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './profile.css';

const Profile = () => {
    return (
        <>
            <div className='fav-wrapper'>
                <h1 className='fav-header'>Профиль заведения</h1>
                <div className="profile-main">
                    <Form className='profile-form d-flex flex-column align-items-left'>
                        <h2 className='mb-4'>Данные заведения</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled type="email" placeholder="mail@mail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Название</Form.Label>
                            <Form.Control placeholder="Лучший ресторан" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control type="address" placeholder="г. Москва, ул. Пушкина, 6" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control type="phone" placeholder="+71234567890" />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Сохранить
                        </Button>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Изменить карту столов
                        </Button>
                    </Form>
                    <Form className='d-flex flex-column align-items-left'>
                        <h2 className='mb-4'>Смена пароля</h2>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Новый пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Подтвердите пароль</Form.Label>
                            <Form.Control type="password" placeholder="*******" />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Сменить пароль
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Profile;