import React from 'react';

import './favourites.css'

import RestaurantCard from '../../components/restaurant-card/restaurant-card';


const Favourites = () => {
    return (
        <div className='main-wrapper'>
            <h1 className='main-header'>Ваши любимые заведения</h1>
            <div className="cards-container">
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
            </div>
        </div>
    );
}

export default Favourites;