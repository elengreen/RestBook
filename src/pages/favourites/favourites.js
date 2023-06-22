import React from 'react';

import './favourites.css'
import { useGetFavouritesQuery } from './favouritesApiSlice';

import RestaurantCard from '../../components/restaurant-card/restaurant-card';



const Favourites = () => {

    const {
        data: favourites = [],
    } = useGetFavouritesQuery();



    const favouritesCards = favourites.map(({...favourites }) => {
        return (
            <RestaurantCard key={favourites.id} {...favourites} isFavourite = {true} />
        )
    })
    console.log(favourites)

    return (
        <div className='main-wrapper'>
            <h1 className='main-header'>Ваши любимые заведения</h1>
            {favourites.length===0 && <span className='empty-state'>У вас нет избранных заведений</span>}
            <div className="cards-container">
                {favouritesCards}
            </div>
        </div>
    );
}

export default Favourites;