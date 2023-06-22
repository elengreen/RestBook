import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './profile.css';
import { useGetRestaurantQuery, useGetUserQuery, usePatchPasswordMutation, usePatchUserMutation } from './profileApiSlice';
import { useForm } from 'react-hook-form';
import { usePatchRestaurantInfoMutation, usePostRestaurantSchemeMutation, usePostRestaurantInfoMutation, usePostRestaurantMenuMutation, usePostRestaurantImageMutation } from '../restaurant-list/restaurantListApiSlice';

const Profile = () => {
    const { data: profile = null } = useGetUserQuery();

    const {
        data: restaurant, error
    } = useGetRestaurantQuery();

    const [patchUser] = usePatchUserMutation();
    const [patchPassword] = usePatchPasswordMutation();
    const [patchRestaurantInfo] = usePatchRestaurantInfoMutation();
    const [postRestaurantInfo] = usePostRestaurantInfoMutation();
    const [postRestaurantScheme] = usePostRestaurantSchemeMutation();
    const [postRestaurantMenu] = usePostRestaurantMenuMutation();
    const [postRestaurantImage] = usePostRestaurantImageMutation();

    const { register: registerPasswordChange,
        getValues: getPasswordChange,
        handleSubmit: handlePasswordChange,
        formState: { errors: errorsPasswordChange },
        reset: resetPasswordChange
    } = useForm({
        mode: "onChange",
    });

    const { register: registerSchemeChange,
        handleSubmit: handleSchemeChange
    } = useForm();

    const { register: registerMenuChange,
        handleSubmit: handleMenuChange
    } = useForm();

    const { register: registerRestaurantCreation,
        handleSubmit: handleRestaurantCreation,
        formState: { errors: errorsRestaurantCreation }
    } = useForm({
        mode: "onChange",
    });

    const onSubmitPasswordChange = async (data) => {
        resetPasswordChange();
        await patchPassword(data.password)
    };

    const onSubmitSchemeChange = async (data) => await postRestaurantScheme(data.image);

    const onSubmitMenuChange = async (data) => await postRestaurantMenu(data.menu);

    const onSubmitRestaurantCreation = async (data) => {
        let openFrom = data.openFrom.split(':');
        let openTo = data.openTo.split(':');
        const offset = new Date().getTimezoneOffset() / 60;
        openFrom[0] = (+openFrom[0] + offset) % 24;
        openTo[0] = (+openTo[0] + offset) % 24;
        data.openFrom = `${("00" + openFrom[0]).slice(-2)}:${openFrom[1]}:00`
        data.openTo = `${("00" + openTo[0]).slice(-2)}:${openTo[1]}:00`
        await postRestaurantInfo(data);
    }

    const passwordChangeForm = () => {
        return (
            <>
                <Form className='d-flex flex-column align-items-left password-form' onSubmit={handlePasswordChange(onSubmitPasswordChange)}>
                    <h2 className='mb-4'>Смена пароля</h2>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control type="password" placeholder="*******" {...registerPasswordChange("password", { required: true, minLength: 8 })} />
                        {errorsPasswordChange.password && <span className='input-error'>Минимальная длина - 8 символов</span>}
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

    const CreateRestaurant = () => {
        return (
            <>
                <h1 className='main-header'>Создайте заведение</h1>
                <div >
                    <Form className="profile-main d-flex flex-column" onSubmit={handleRestaurantCreation(onSubmitRestaurantCreation)}>
                        <section className='d-flex flex-row'>
                            <section className='profile-form d-flex flex-column align-items-left'>
                                <Form.Group className="mb-3" controlId="admin-email" required>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control disabled type="email" placeholder="mail@mail.com" required value={profile?.email} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="admin-name">
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control placeholder="Лучший ресторан" {...registerRestaurantCreation("name", { required: true, value: restaurant?.name })} />
                                    {errorsRestaurantCreation.name && <span className='input-error'>Необходимо ввести название</span>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="admin-address">
                                    <Form.Label>Адрес</Form.Label>
                                    <Form.Control type="address" placeholder="г. Москва, ул. Пушкина, 6" {...registerRestaurantCreation("address", { required: true, value: restaurant?.address })} />
                                    {errorsRestaurantCreation.address && <span className='input-error'>Необходимо ввести адрес</span>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="admin-phone">
                                    <Form.Label>Номер телефона</Form.Label>
                                    <Form.Control type="tel" placeholder="+71234567890" {...registerRestaurantCreation("phoneNumber", { required: true, value: restaurant?.phoneNumber, pattern: /\+\d{11}/, maxLength: 12 })} />
                                    {errorsRestaurantCreation.phoneNumber?.type === 'required' && <span className='input-error'>Необходимо ввести номер</span>}
                                    {(errorsRestaurantCreation.phoneNumber?.type === 'pattern' || errorsRestaurantCreation.phoneNumber?.type === 'maxLength') && <span className='input-error'>Формат: +71234567890</span>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="open-from" required>
                                    <Form.Label>Режим работы</Form.Label>
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            type="time"
                                            {...registerRestaurantCreation("openFrom", { required: true, value: restaurant?.openFrom })} />
                                        {errorsRestaurantCreation.openFrom && <span className='input-error'>Необходимо ввести время открытия</span>}
                                        <label htmlFor="floatingInputCustom">Открытие в</label>
                                    </Form.Floating>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="open-to" required>
                                    <Form.Floating>
                                        <Form.Control
                                            type="time" {...registerRestaurantCreation("openTo", { required: true, value: restaurant?.openTo })} />
                                        {errorsRestaurantCreation.openFrom && <span className='input-error'>Необходимо ввести время закрытия</span>}
                                        <label htmlFor="floatingInput">Закрытие в</label>
                                    </Form.Floating>
                                </Form.Group>
                            </section>

                            <section className='d-flex flex-column align-items-left'>
                                <Form.Group className="mb-3" controlId="tablesCount" required>
                                    <Form.Label>Количество столов</Form.Label>
                                    <Form.Control type="number" placeholder="0" {...registerRestaurantCreation("tablesCount", { required: true, value: restaurant?.tablesCount, min: 1, max: 50 })} />
                                    {errorsRestaurantCreation.tablesCount?.type === 'required' && <span className='input-error'>Необходимо ввести количество столов</span>}
                                    {errorsRestaurantCreation.tablesCount?.type === 'min' && <span className='input-error'>Минимальное количество - 1</span>}
                                    {errorsRestaurantCreation.tablesCount?.type === 'max' && <span className='input-error'>Максимальное количество - 50</span>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="description" required>
                                    <Form.Label>Описание</Form.Label>
                                    <Form.Control as="textarea"
                                        placeholder="Напишите об особенностях и преимуществах вашего заведения"
                                        style={{ height: '300px' }}
                                        {...registerRestaurantCreation("description", { required: true, value: restaurant?.description })} />
                                    {errorsRestaurantCreation.description && <span className='input-error'>Необходимо ввести описание</span>}
                                </Form.Group>
                                <Form.Label>Схема зала</Form.Label>
                                {errorsRestaurantCreation.image && <span className='input-error mb-2'>Вы еще не загрузили схему зала</span>}
                                <Form.Group className="mb-3" controlId="scheme" required>
                                    <Form.Control type="file" accept="image/png, image/jpeg" {...registerRestaurantCreation("image", { required: true })} />
                                </Form.Group>
                                <Button className="mt-3 mb-4" variant="primary" size='lg' type="submit">
                                    Создать
                                </Button>
                            </section>
                        </section>
                    </Form>

                </div >
            </>
        )
    }

    const { register: registerProfileChange,
        handleSubmit: handleProfileChange,
        formState: { errors: errorsProfileChange }
    } = useForm({
        mode: "onChange",
    });

    const onSubmitProfileChange = async (data) => await patchUser(data);

    const VisitorProfile = () => {
        return (
            <>
                <h1 className='main-header'>Профиль</h1>
                <div className="profile-main">
                    <Form className='profile-form d-flex flex-column align-items-left' onSubmit={handleProfileChange(onSubmitProfileChange)}>
                        <h2 className='mb-4'>Ваши данные</h2>
                        <Form.Group className="mb-3" controlId="visitor-name" >
                            <Form.Label>Имя</Form.Label>
                            <Form.Control placeholder="Иван" {...registerProfileChange("name", { required: true, value: profile?.name })} />
                            {errorsProfileChange.name && <span className='input-error'>Необходимо ввести имя</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Email" required>
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled type="email" placeholder="mail@mail.com" {...registerProfileChange("email", { required: true, value: profile?.email })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="visitor-phone">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control type="phone" placeholder="+71234567890"  {...registerProfileChange("phone", { required: true, value: profile?.phone, pattern: /\+\d{11}/, maxLength: 12 })} />
                            {errorsProfileChange.phone?.type === 'required' && <span className='input-error'>Необходимо ввести номер</span>}
                            {(errorsProfileChange.phone?.type === 'pattern' || errorsProfileChange.phoneNumber?.type === 'maxLength') && <span className='input-error'>Формат: +71234567890</span>}
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

    const { register: registerOwnerProfileChange,
        handleSubmit: handleOwnerProfileChange,
        formState: { errors: errorsOwnerProfileChange }
    } = useForm({
        mode: "onChange",
    });

    const { register: registerRestaurantImageChange,
        handleSubmit: handleRestaurantImageChange
    } = useForm();

    const onSubmitOwnerProfileChange = async (data) => {
        let openFrom = data.openFrom.split(':');
        let openTo = data.openTo.split(':');
        const offset = new Date().getTimezoneOffset() / 60;
        openFrom[0] = (+openFrom[0] + offset) % 24;
        openTo[0] = (+openTo[0] + offset) % 24;
        data.openFrom = `${("00" + openFrom[0]).slice(-2)}:${openFrom[1]}:00`
        data.openTo = `${("00" + openTo[0]).slice(-2)}:${openTo[1]}:00`
        await patchRestaurantInfo(data);
    }

    const onSubmitRestaurantImageChange = async (data) => await postRestaurantImage(data.restaurantImage);

    const AdminProfile = () => {

        if (!restaurant) {
            return <></>
        }


        return (
            <>
                <h1 className='main-header'>Профиль заведения</h1>
                <div className="profile-main">
                    <Form className='profile-form d-flex flex-column align-items-left' onSubmit={handleOwnerProfileChange(onSubmitOwnerProfileChange)}>
                        <h2 className='mb-4'>Данные заведения</h2>
                        <Form.Group className="mb-3" controlId="admin-email" required>
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled type="email" placeholder="mail@mail.com" required value={profile?.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-name">
                            <Form.Label>Название</Form.Label>
                            <Form.Control placeholder="Лучший ресторан" {...registerOwnerProfileChange("name", { required: true, value: restaurant?.name })} />
                            {errorsOwnerProfileChange.name && <span className='input-error'>Необходимо ввести название</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-address">
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control type="address" placeholder="г. Москва, ул. Пушкина, 6" {...registerOwnerProfileChange("address", { required: true, value: restaurant?.address })} />
                            {errorsOwnerProfileChange.address && <span className='input-error'>Необходимо ввести адрес</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-phone">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control type="phone" placeholder="+71234567890" {...registerOwnerProfileChange("phoneNumber", { required: true, value: restaurant?.phoneNumber, pattern: /\+\d{11}/, maxLength: 12 })} />
                            {errorsOwnerProfileChange.phoneNumber?.type === 'required' && <span className='input-error'>Необходимо ввести номер</span>}
                            {(errorsOwnerProfileChange.phoneNumber?.type === 'pattern' || errorsOwnerProfileChange.phoneNumber?.type === 'maxLength') && <span className='input-error'>Формат: +71234567890</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="open-from" required>
                            <Form.Label>Режим работы</Form.Label>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="time"
                                    {...registerOwnerProfileChange("openFrom", { required: true, value: restaurant?.openFrom })} />
                                    {errorsOwnerProfileChange.openFrom && <span className='input-error'>Необходимо ввести время открытия</span>}
                                <label htmlFor="floatingInputCustom">Открытие в</label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="open-to" required>
                            <Form.Floating>
                                <Form.Control
                                    type="time" {...registerOwnerProfileChange("openTo", { required: true, value: restaurant?.openTo })} />
                                    {errorsOwnerProfileChange.openFrom && <span className='input-error'>Необходимо ввести время закрытия</span>}
                                <label htmlFor="floatingInput">Закрытие в</label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tablesCount" required>
                            <Form.Label>Количество столов</Form.Label>
                            <Form.Control type="number" placeholder="0" {...registerOwnerProfileChange("tablesCount", { required: true, value: restaurant?.tablesCount })} />
                            {errorsOwnerProfileChange.tablesCount?.type === 'required' && <span className='input-error'>Необходимо ввести количество столов</span>}
                            {errorsOwnerProfileChange.tablesCount?.type === 'min' && <span className='input-error'>Минимальное количество - 1</span>}
                            {errorsOwnerProfileChange.tablesCount?.type === 'max' && <span className='input-error'>Максимальное количество - 50</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description" required>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control as="textarea"
                                placeholder="Напишите об особенностях и преимуществах вашего заведения"
                                style={{ height: '300px' }}
                                {...registerOwnerProfileChange("description", { required: true, value: restaurant?.description })} />
                                {errorsOwnerProfileChange.description && <span className='input-error'>Необходимо ввести описание</span>}
                        </Form.Group>
                        <Button className="mt-3 mb-4" variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Form>
                    <section>
                        {passwordChangeForm()}
                        <Form className='d-flex flex-column align-items-left password-form' onSubmit={handleSchemeChange(onSubmitSchemeChange)}>
                            <h2 className='mb-4'>Загрузите схему зала</h2>
                            {!restaurant?.schemeImage && <span className='input-error mb-2'>Вы еще не загрузили схему зала</span>}
                            <Form.Group className="mb-3" controlId="scheme" required>
                                <Form.Control type="file" accept="image/png, image/jpeg" {...registerSchemeChange("image", { required: true })} />
                            </Form.Group>
                            <Button className="mt-3 mb-4" variant="primary" type="submit">
                                Загрузить
                            </Button>
                        </Form>
                        <Form className='d-flex flex-column align-items-left password-form' onSubmit={handleMenuChange(onSubmitMenuChange)}>
                            <h2 className='mb-4'>Загрузите меню заведения</h2>
                            {!restaurant?.menuPath && <span className='input-error mb-2'>Вы еще не загрузили меню</span>}
                            <Form.Group className="mb-3" controlId="menu" required>
                                <Form.Control type="file" accept="application/pdf" {...registerMenuChange("menu", { required: true })} />
                            </Form.Group>
                            <Button className="mt-3 mb-4" variant="primary" type="submit">
                                Загрузить
                            </Button>
                        </Form>
                        <Form className='d-flex flex-column align-items-left password-form' onSubmit={handleRestaurantImageChange(onSubmitRestaurantImageChange)}>
                            <h2 className='mb-4'>Загрузите фото заведения</h2>
                            {!restaurant?.restaurantImage && <span className='input-error mb-2'>Вы еще не загрузили фотографию</span>}
                            <Form.Group className="mb-3" controlId="restaurantImage" required>
                                <Form.Control type="file" accept="image/png, image/jpeg" {...registerRestaurantImageChange("restaurantImage", { required: true })} />
                            </Form.Group>
                            <Button className="mt-3 mb-4" variant="primary" type="submit">
                                Загрузить
                            </Button>
                        </Form>
                    </section>
                </div>
            </>
        )
    }

    let render;

    if (error?.status === 500) {
        render = CreateRestaurant();
    } else {
        if (profile?.roles[0].name === 'Member') {
            render = VisitorProfile();
        }
        else if (profile?.roles[0].name === 'Admin') {
            render = AdminProfile();
        }
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