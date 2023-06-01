import React from 'react';
import './restaurant-list.css'
import { Form, Image, InputGroup } from 'react-bootstrap';

import RestaurantCard from '../../components/restaurant-card/restaurant-card';

import { useGetListQuery } from './restaurantListApiSlice.js'

import search from '../../shared/search.svg'




const RestaurantList = () => {

    const {
        data: restaurants = [],
    } = useGetListQuery();

    console.log(restaurants);

    const restCards = restaurants.map(({ id, ...restaurant }) => {
        return (
            <RestaurantCard {...restaurant} />
        )
    })

    return (
        <>
            <section className="hero">
                <h1 className="hero-header">Найдите свой ресторан</h1>
                <InputGroup className="hero-search">
                    <InputGroup.Text><Image src={search}></Image></InputGroup.Text>
                    <Form.Control placeholder="Введите название ресторана" />
                </InputGroup>
            </section>
            <section className="cards">
                <div className="cards-info">
                    <span>Найдено результатов: <span className="cards-results"> {restaurants.length} </span></span>
                    <div className="cards-filter">
                        <span className='me-2'>Фильтр по рейтингу </span>
                        <InputGroup className="cards-filter-input">
                            <Form.Control className="cards-filter-input" placeholder="0" />
                            <Form.Control className="cards-filter-input" placeholder="5" />
                        </InputGroup>
                    </div>
                    <div className="cards-filter">
                        <span className='me-2'>Сортировка</span>
                        <Form.Select className="cards-sort" size="sm">
                            <option>По убыванию рейтинга</option>
                            <option value="1">По возрастанию рейтинга</option>
                        </Form.Select>
                        
                    </div>
                </div>
                <div className="cards-container">
                    {restCards}
                </div>
            </section >
        </>
    );
}

export default RestaurantList;


