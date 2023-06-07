import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './profile.css';
import { useGetUserQuery, usePatchPasswordMutation, usePatchUserMutation } from './profileApiSlice';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const { data: profile = null } = useGetUserQuery();

    const [patchUser] = usePatchUserMutation();
    const [patchPassword] = usePatchPasswordMutation();

    const { register: registerPasswordChange,
        getValues: getPasswordChange,
        handleSubmit: handlePasswordChange,
        formState: { errors: errorsPasswordChange },
        reset: resetPasswordChange
    } = useForm({
        mode: "onChange",
    });

    const { register: registerProfileChange,
        handleSubmit: handleProfileChange,
        formState: { errors: errorsProfileChange }
    } = useForm();

    const { register: registerOwnerProfileChange,
        handleSubmit: handleOwnerProfileChange,
        formState: { errors: errorsOwnerProfileChange }
    } = useForm();

    const onSubmitPasswordChange = async (data) => {
        resetPasswordChange();
        await patchPassword(data.password)
    };
    const onSubmitProfileChange = async (data) => await patchUser(data);

    if (!profile)
        return (<></>);

    const passwordChangeForm = () => {
        return (
            <>
                <Form className='d-flex flex-column align-items-left password-form' onSubmit={handlePasswordChange(onSubmitPasswordChange)}>
                    <h2 className='mb-4'>Смена пароля</h2>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control type="password" placeholder="*******" {...registerPasswordChange("password", { required: true, minLength: 8 })} />
                        {errorsPasswordChange.password && <span className='input-error'>Длина пароля не может быть менее 8 символов</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirm-password">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control type="password" placeholder="*******" {...registerPasswordChange("confirmPassword", { required: true, validate: v => v === getPasswordChange("password") })} />
                        {errorsPasswordChange.confirmPassword && <span className='input-error'>Пароли не совпадают</span>}
                    </Form.Group>
                    <Button className="mt-3 mb-4" variant="primary" type="submit">
                        Сменить пароль
                    </Button>
                </Form>
            </>
        )
    }

    const VisitorProfile = () => {
        return (
            <>
                <h1 className='main-header'>Профиль</h1>
                <div className="profile-main">
                    <Form className='profile-form d-flex flex-column align-items-left' onSubmit={handleProfileChange(onSubmitProfileChange)}>
                        <h2 className='mb-4'>Ваши данные</h2>
                        <Form.Group className="mb-3" controlId="visitor-name" >
                            <Form.Label>Имя</Form.Label>
                            {/* <Form.Control placeholder="Иван" value={profile.name} onChange={updateName} /> */}
                            <Form.Control placeholder="Иван" {...registerProfileChange("name", { required: true, value: profile.name })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Email" required>
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled type="email" placeholder="mail@mail.com" {...registerProfileChange("email", { required: true, value: profile.email })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="visitor-phone">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control type="phone" placeholder="+71234567890"  {...registerProfileChange("phone", { required: true, value: profile.phone })} />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Form>
                    {passwordChangeForm()}
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
                        <Form.Group className="mb-3" controlId="working-hours" required>
                            <Form.Label>Режим работы</Form.Label>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="time" />
                                <label htmlFor="floatingInputCustom">Открытие в</label>
                            </Form.Floating>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingInput"
                                    type="time" />
                                <label htmlFor="floatingInput">Закрытие в</label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="tables" required>
                            <Form.Label>Количество столов</Form.Label>
                            <Form.Control type="number" placeholder="0" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description" required>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control as="textarea" placeholder="Напишите об особенностях вашего заведения и преимуществах" style={{ height: '300px' }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tables" required>
                            <Form.Label>Загрузите карту столов</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Form>
                    {passwordChangeForm()}
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