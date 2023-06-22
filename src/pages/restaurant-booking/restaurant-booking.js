import React, { useEffect, useState } from 'react';
import './restaurant-booking.css';

import { Button, Form, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRestaurantInfoQuery, usePostTableClaimMutation } from '../restaurant-list/restaurantListApiSlice';
import { useForm } from 'react-hook-form';

const RestaurantBooking = () => {

    let { restId } = useParams();
    let [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

    const navigate = useNavigate();

    const [postTableClaim] = usePostTableClaimMutation();

    const {
        data: restaurant, refetch
    } = useGetRestaurantInfoQuery(restId);

    const { register: registerClaimChange,
        handleSubmit: handleClaimChange,
        watch
    } = useForm();

    const date = watch('date', '');
    const time = watch('time', '');
    const claimDuration = watch('claimDuration', '');

    const tables = []
    restaurant?.tables.forEach(({ ...table }) => {
        let splittedDate = date.split("-");
        let splittedTime = time.split(':');

        let userDateTime = new Date(splittedDate[0], +splittedDate[1] - 1, splittedDate[2], splittedTime[0], splittedTime[1])
        let tableDateTime = new Date(table.vacantFrom);

        const offset = new Date().getTimezoneOffset() / 60;
        tableDateTime.setHours(tableDateTime.getHours() - offset);
        console.log(table.id)
        console.log(userDateTime)
        console.log(tableDateTime)

        if (userDateTime && (userDateTime > tableDateTime)) {
            tables.push(<option key={table.id} value={table.id}>Стол {table.tableNumber}</option>);
        }
    })

    useEffect(() => {
        console.log(tables)
        if (date && time && claimDuration && tables.length !== 0) {
            setIsAllFieldsFilled(true);
        } else {
            setIsAllFieldsFilled(false);
        }
        console.log(time);
    }, [date, time, claimDuration, tables])

    const onSubmitClaimChange = async (data) => {
        let hoursFrom = data.time.split(":")[0]
        let minutesFrom = data.time.split(":")[1]

        let from = new Date(data.date);
        from.setHours(hoursFrom);
        from.setMinutes(minutesFrom);

        let to = new Date(from.getTime());
        to.setHours(to.getHours() + +data.claimDuration);

        let claim = {
            "tableId": data.tableId,
            "claimFromDate": from.toISOString(),
            "claimToDate": to.toISOString()
        }
        console.log(claim)

        await postTableClaim(claim);
        await refetch();
        navigate('/booking')
    }

    if (!restaurant)
        return (<></>);

    

    let openFrom = restaurant.openFrom.split(':');
    let openTo = restaurant.openTo.split(':');
    let now = new Date();

    console.log(tables);

    return (
        <>
            <section className="hero">
                <h1 className="hero-header rest-header">{restaurant.name}</h1>
            </section>
            <div className="main-wrapper d-flex">
                <div className="restaurant-scheme me-5">
                    <h2 className='main-header'>Схема зала</h2>
                    <Image src={restaurant.schemeImage} width={800} ></Image>
                </div>
                <div className="booking-section">
                    <h2 className='main-header'>Бронирование</h2>
                    <span><b>Время работы: {restaurant.openFrom} - {restaurant.openTo}</b></span>
                    <Form className='mt-3' onSubmit={handleClaimChange(onSubmitClaimChange)}>
                        <Form.Label>Выберите дату</Form.Label>
                        <Form.Control
                            type='date'
                            className='mb-3'
                            min={`${now.getFullYear()}-0${now.getMonth() + 1}-${now.getDate()}`}
                            max={`${now.getFullYear()}-0${now.getMonth() + 2}-${now.getDate()}`}
                            {...registerClaimChange("date", { required: true })}>
                        </Form.Control>
                        <Form.Label>Выберите время</Form.Label>
                        <Form.Control
                            type='time'
                            className='mb-3'
                            min={`${openFrom[0]}:${openFrom[1]}`}
                            max={`${openTo[0] - claimDuration}:${openTo[1]}`}
                            {...registerClaimChange("time", { required: true })} >
                        </Form.Control>
                        <Form.Label>Выберите длительность</Form.Label>
                        <Form.Select className='mb-3' {...registerClaimChange("claimDuration", { required: true })}>
                            <option value={''}></option>
                            <option value={1}>1 час</option>
                            <option value={2}>2 часа</option>
                            <option value={3}>3 часа</option>
                            <option value={4}>4 часа</option>
                        </Form.Select>
                        <Form.Label>Выберите стол</Form.Label>
                        <Form.Select className='mb-3' {...registerClaimChange("tableId", { required: true })} disabled={!isAllFieldsFilled}>
                            {tables.length === 0 ? <option>Нет столов</option> : tables}
                        </Form.Select>
                        <Button className='mt-3' size='lg' type='submit' disabled={!isAllFieldsFilled}>Забронировать</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default RestaurantBooking;