import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './restaurant-card.css';

import fav from '../../shared/fav.svg';
import favRed from '../../shared/favred.svg';
import cardImage from '../../shared/cardimage.png';
import { useAddFavouriteMutation, useRemoveFavouriteMutation } from '../../pages/favourites/favouritesApiSlice';

const RestaurantCard = ({ name, address, vacantTablesCount, rating, id, isFavourite, openFrom, openTo, restaurantImage }) => {

    const [addFavourite] = useAddFavouriteMutation();
    const [removeFavourite] = useRemoveFavouriteMutation();

    const handleFavouriteButton = () => {
        if (isFavourite) 
            removeFavourite(id);
        else 
            addFavourite(id);
    }
    
    openFrom = openFrom.split(':');
    openTo = openTo.split(':');

    return (
        <Card className='container-card'>
            <Button bsPrefix="card-button" onClick={handleFavouriteButton}><Image className='card-fav' src={isFavourite ? favRed : fav} /></Button>
            <Card.Img variant="top" height={240} src={restaurantImage == null ? cardImage : restaurantImage} />
            <Card.Body>
                <Link to={`/restaurantDescription/${id}`}>
                    <Card.Title className='card-texts'>{name}</Card.Title>
                </Link>
                <Card.Text>
                    {address}
                </Card.Text>
                <Card.Text>
                    Время работы: {openFrom[0]}:{openFrom[1]} - {openTo[0]}:{openTo[1]}
                </Card.Text>
                <Card.Text className='card-texts'>
                    Свободно столов: {vacantTablesCount}
                </Card.Text>
                <Card.Text>
                    Рейтинг: <span className='card-rating'>{rating}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RestaurantCard;