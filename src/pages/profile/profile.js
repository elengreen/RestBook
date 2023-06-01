import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './profile.css';
import { profileApiSlice,  useGetUserQuery, usePatchUserMutation } from './profileApiSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {

    const { data: profile = null } = useGetUserQuery();
    const dispatch = useDispatch();

    const [patchUser] = usePatchUserMutation();

    if (!profile)
        return (<></>);

    const updateName = (e) => {
        dispatch(profileApiSlice.util.updateQueryData('getUser', undefined, (profile) => {

            profile.name = e.target.value;
        }))
    }

    const updatePhone = (e) => {
        dispatch(profileApiSlice.util.updateQueryData('getUser', undefined, (profile) => {
            profile.phone = e.target.value;
        }))
    }

    const passwordChange = () => {
        return (
            <>
                <Form className='d-flex flex-column align-items-left'>
                    <h2 className='mb-4'>Смена пароля</h2>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control type="password" placeholder="*******" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirm-password">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control type="password" placeholder="*******" />
                    </Form.Group>
                    <Button className="mt-3 mb-4" variant="primary" type="submit">
                        Сменить пароль
                    </Button>
                </Form>
            </>
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let p = {
            name: profile.name,
            email: profile.email,
            phone: profile.phone
        }
        await patchUser(p);
    };


    const VisitorProfile = () => {
        return (
            <>
                <h1 className='main-header'>Профиль</h1>
                <div className="profile-main">
                    <Form className='profile-form d-flex flex-column align-items-left' onSubmit={handleSubmit}>
                        <h2 className='mb-4'>Ваши данные</h2>
                        <Form.Group className="mb-3" controlId="visitor-name" required>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control placeholder="Иван" value={profile.name} onChange={updateName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Email" required>
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled type="email" placeholder="mail@mail.com" value={profile.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="visitor-phone">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control type="phone" placeholder="+71234567890" value={profile.phone} onChange={updatePhone}/>
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Form>
                    {passwordChange()}
                </div>
            </>
        )
    }

    const AdminProfile = () => {
        return (
            <>
                <h1 className='main-header'>Профиль заведения</h1>
                <div className="profile-main">
                    <Form className='profile-form d-flex flex-column align-items-left'>
                        <h2 className='mb-4'>Данные заведения</h2>
                        <Form.Group className="mb-3" controlId="admin-email" required>
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled type="email" placeholder="mail@mail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-name" required>
                            <Form.Label>Название</Form.Label>
                            <Form.Control placeholder="Лучший ресторан" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-address" required>
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control type="address" placeholder="г. Москва, ул. Пушкина, 6" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-phone" required>
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
                    {passwordChange()}
                </div>
            </>
        )
    }

    let render;

    if (profile.roles[0].name === 'Member') {
        render = VisitorProfile();
    }
    else if (profile.roles[0].name === 'Admin') {
        render = AdminProfile();

    }


    return (
        <>
            <div className='main-wrapper'>
                {render}
            </div>
        </>
    );
}

export default Profile;