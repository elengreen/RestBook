import React from 'react';
import './restaurant-booking.css';

import { Button, Form, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRestaurantInfoQuery, usePostTableClaimMutation } from '../restaurant-list/restaurantListApiSlice';
import { useForm } from 'react-hook-form';

const RestaurantBooking = () => {

    let { restId } = useParams();

    const navigate = useNavigate();

    const {
        data: restaurant, refetch
    } = useGetRestaurantInfoQuery(restId);

    const { register: registerClaimChange,
        handleSubmit: handleClaimChange
    } = useForm();

    const [postTableClaim] = usePostTableClaimMutation();

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

        await postTableClaim(claim);
        await refetch();
        navigate('/booking')

    }

    if (!restaurant)
        return (<></>);

    const tables = restaurant.tables.map(({ ...table }) => {
        if (!table.isClaimed) {
            return (
                <option key={table.id} value={table.id}>Стол {table.tableNumber}</option>
            )
        }
        else return 0;
    })


    let openFrom = restaurant.openFrom.split(':');
    let openTo = restaurant.openTo.split(':');

    let now = new Date();

    

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
                    <Form onSubmit={handleClaimChange(onSubmitClaimChange)}>
                        <Form.Label>Выберите дату</Form.Label>
                        <Form.Control
                            type='date'
                            className='mb-3'
                            min={`${now.getFullYear()}-0${now.getMonth() + 1}-${now.getDate()}`} max={`${now.getFullYear()}-0${now.getMonth() + 2}-${now.getDate()}`}
                            {...registerClaimChange("date", { required: true })}>
                        </Form.Control>
                        <Form.Label>Выберите время</Form.Label>
                        <Form.Control
                            type='time'
                            className='mb-3'
                            min={`${openFrom[0]}:${openFrom[1]}`}
                            max={`${openTo[0]}:${openTo[1]}`}
                            {...registerClaimChange("time", { required: true })}>
                        </Form.Control>
                        <Form.Label>Выберите стол</Form.Label>
                        <Form.Select className='mb-3' {...registerClaimChange("tableId", {required: true})}>
                            {tables}
                        </Form.Select>
                        <Form.Label>Выберите длительность</Form.Label>
                        <Form.Select className='mb-3' {...registerClaimChange("claimDuration", {required: true})}>
                            <option value={1}>1 час</option>
                            <option value={2}>2 часа</option>
                            <option value={3}>3 часа</option>
                            <option value={4}>4 часа</option>
                        </Form.Select>
                        <Button className='mt-3' size='lg' type='submit'>Забронировать</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default RestaurantBooking;