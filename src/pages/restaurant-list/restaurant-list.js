import React, { useEffect, useState } from 'react';
import './restaurant-list.css'
import { Form, Image, InputGroup } from 'react-bootstrap';

import RestaurantCard from '../../components/restaurant-card/restaurant-card';

import { useGetListQuery } from './restaurantListApiSlice.js'

import searchIcon from '../../shared/search.svg'
import { useGetFavouritesQuery } from '../favourites/favouritesApiSlice';




const RestaurantList = () => {

    const {
        data: favourites = [],
    } = useGetFavouritesQuery();

    const [filter_1, setFilter_1] = useState(0);
    const [filter_2, setFilter_2] = useState(5);
    const [sort, setSort] = useState('desc');
    const [search, setSearch] = useState('');

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const changeFilter_1 = (event) => setFilter_1(clamp(event.target.value, 0, 5));
    const changeFilter_2 = (event) => setFilter_2(clamp(event.target.value,1,5));
    const changeSort = (event) => setSort(event.target.value);
    const changeSearch = (event) => setSearch(event.target.value);

    const {
        data: restaurants = [], refetch: refetchRests
    } = useGetListQuery({ search, filter_1, filter_2, sort });

    useEffect(() => {
        refetchRests({ search, filter_1, filter_2, sort });
    },
        [search, filter_1, filter_2, sort]);

    const restCards = restaurants.map(({ ...restaurant }) => {
        let isFav;
        if (favourites.find(f => f.id === restaurant.id))
            isFav = true;
        else
            isFav = false;
        return (
            <RestaurantCard key={restaurant.id} {...restaurant} isFavourite={isFav} />
        )
    })

    return (
        <>
            <section className="hero">
                <h1 className="hero-header">Найдите свой ресторан</h1>
                <InputGroup className="hero-search">
                    <InputGroup.Text><Image src={searchIcon}></Image></InputGroup.Text>
                    <Form.Control placeholder="Введите название ресторана" value={search} onChange={changeSearch} />
                </InputGroup>
            </section>
            <section className="cards">
                <div className="cards-info">
                    <span>Найдено результатов: <span className="cards-results"> {restaurants.length} </span></span>
                    <div className="cards-filter">
                        <span className='me-2'>Фильтр по рейтингу </span>
                        <InputGroup className="cards-filter-input">
                            <Form.Control type='number' className="cards-filter-input" placeholder="0" value={filter_1} onChange={changeFilter_1} />
                            <Form.Control type='number' className="cards-filter-input" placeholder="5" value={filter_2} onChange={changeFilter_2} />
                        </InputGroup>
                    </div>
                    <div className="cards-filter">
                        <span className='me-2'>Сортировка</span>
                        <Form.Select className="cards-sort" size="sm" value={sort} onChange={changeSort}>
                            <option value="desc">По убыванию рейтинга</option>
                            <option value="asc">По возрастанию рейтинга</option>
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


