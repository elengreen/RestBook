import React, { useEffect, useRef } from 'react';
import './restaurant-description.css';

import address from '../../shared/address.svg';
import phone from '../../shared/phone.svg';
import time from '../../shared/time.svg';
import { Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRestaurantInfoQuery } from '../restaurant-list/restaurantListApiSlice';
import { useGetUserQuery } from '../profile/profileApiSlice';
import { useYMaps } from '@pbe/react-yandex-maps';


const RestaurantDescription = () => {

    const mapRef = useRef(null);
    const ymaps = useYMaps(['Map', 'geocode']);

    const navigate = useNavigate();
    let { restId } = useParams();

    const {
        data: restaurant,
    } = useGetRestaurantInfoQuery(restId);

    const { data: profile = null } = useGetUserQuery();

    useEffect(() => {
        if (!ymaps || !mapRef.current || !restaurant) {
            return;
        }

        const map = new ymaps.Map(mapRef.current, {
            center: [55.76, 37.64],
            zoom: 15,
        });

        ymaps.geocode(restaurant.address).then(res => {
            map.setCenter(res.geoObjects.get(0).geometry.getCoordinates())
            map.geoObjects.add(res.geoObjects.get(0));
        });

    }, [ymaps, restaurant]);

    if (!restaurant)
        return (<></>);

    let isProfileFilledOut = true;
    for (let elem in profile) {
        if (!profile[elem]) {
            isProfileFilledOut = false;
            break;
        }
    }
    function bookingButtonOnClick() {
        if (isProfileFilledOut)
            navigate(`/restaurantBooking/${restId}`)
    }

    console.log(restaurant);
    return (
        <>
            <section className="hero">
                <h1 className="hero-header rest-header">{restaurant.name}</h1>
            </section>
            <div className="main-wrapper rest-wrapper">
                <div className="booking-info">
                    <span className='info-tables'>Свободно столов: <span className='cards-results'>{restaurant.vacantTablesCount}</span></span>
                    <span>Рейтинг: <span className='card-rating'>{restaurant.rating}</span></span>
                    <Button className="mt-4" size='lg' variant="primary" href={restaurant.menuPath} target="_blank">Меню</Button>
                    <Button className='mt-4' size='lg' onClick={bookingButtonOnClick} disabled={!isProfileFilledOut}>Забронировать</Button>
                    {!isProfileFilledOut && <span className='input-error'>Необходимо заполнить профиль</span>}
                </div>
                <h2 className='main-header'>Описание</h2>
                <p>{restaurant.description}</p>
                <h2 className='main-header'>Контакты</h2>
                <div className="description-contacts">
                    <div className="contacts-field">
                        <Image src={time}></Image>
                        <span>{restaurant.openFrom} - {restaurant.openTo}</span>
                    </div>
                    <div className="contacts-field">
                        <Image src={phone}></Image>
                        <span>{restaurant.phoneNumber}</span>
                    </div>
                    <div className="contacts-field">
                        <Image src={address}></Image>
                        <span>{restaurant.address}</span>
                    </div>
                    <div ref={mapRef} style={{ width: '800px', height: '500px' }} />
                </div>
            </div>
        </>
    );
}

export default RestaurantDescription;