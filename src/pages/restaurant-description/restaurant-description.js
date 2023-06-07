import React from 'react';
import './restaurant-description.css';

import address from '../../shared/address.svg';
import phone from '../../shared/phone.svg';
import time from '../../shared/time.svg';
import { Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRestaurantInfoQuery } from '../restaurant-list/restaurantListApiSlice';


const RestaurantDescription = () => {
    const navigate = useNavigate();
    let { restId } = useParams();

    const {
        data: restaurant,
    } = useGetRestaurantInfoQuery(restId);

    if (!restaurant)
        return (<></>);

    let openFrom = restaurant.openFrom.split(':');
    let openTo = restaurant.openTo.split(':');

    return (
        <>
            <section className="hero">
                <h1 className="hero-header rest-header">{restaurant.name}</h1>
            </section>
            <div className="main-wrapper rest-wrapper">
                <div className="booking-info">
                    <span className='info-tables'>Свободно столов: <span className='cards-results'>{restaurant.vacantTablesCount}</span></span>
                    <span>Рейтинг: <span className='card-rating'>{restaurant.rating}</span></span>
                    <Button className='mt-4' size='lg' onClick={() => navigate(`/restaurantBooking/${restId}`)}>Забронировать</Button>
                </div>
                <h2 className='main-header'>Описание</h2>
                <p>{restaurant.description}</p>
                <h2 className='main-header'>Контакты</h2>
                <div className="description-contacts">
                    <div className="contacts-field">
                        <Image src={time}></Image>
                        <span>{openFrom[0]}:{openFrom[1]} - {openTo[0]}:{openTo[1]}</span>
                    </div>
                    <div className="contacts-field">
                        <Image src={phone}></Image>
                        <span>{restaurant.phoneNumbers[0]}</span>
                    </div>
                    <div className="contacts-field">
                        <Image src={address}></Image>
                        <span>{restaurant.address}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantDescription;