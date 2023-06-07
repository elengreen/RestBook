import React from 'react';
import './restaurant-booking.css';

import { Button, Form, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetRestaurantInfoQuery } from '../restaurant-list/restaurantListApiSlice';



import scheme from '../../shared/scheme.png'

const RestaurantBooking = () => {

    let { restId } = useParams();

    const {
        data: restaurant,
    } = useGetRestaurantInfoQuery(restId);

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

    return (
        <>
            <section className="hero">
                <h1 className="hero-header rest-header">{restaurant.name}</h1>
            </section>
            <div className="main-wrapper d-flex">
                <div className="restaurant-scheme me-5">
                    <h2 className='main-header'>Схема зала</h2>
                    <Image src={scheme} width={800} ></Image>
                </div>
                <div className="booking-section">
                    <h2 className='main-header'>Бронирование</h2>
                    <Form>
                        <Form.Control type='date' className='mb-3' required></Form.Control>
                        <Form.Control type='time' className='mb-3' required></Form.Control>
                        <Form.Select aria-label="Default select example">
                            {tables}
                        </Form.Select>
                        <Button className='mt-4' size='lg' type='submit'>Забронировать</Button>
                    </Form>


                </div>
            </div>
        </>
    );
}

export default RestaurantBooking;