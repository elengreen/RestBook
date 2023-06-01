import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './restaurant-card.css';

import fav from '../../shared/fav.svg';
//import favRed from '../../shared/favred.svg';
import cardImage from '../../shared/cardimage.png';

const RestaurantCard = ({name, address, vacantTablesCount, rating}) => {
    return (
        <Card className='container-card'>
            <Button bsPrefix="card-button"><Image className='card-fav' src={fav} /></Button>
            <Card.Img variant="top" src={cardImage} />
            <Card.Body>
                <Link to='/restaurantDescription'>
                    <Card.Title className='card-texts'>{name}</Card.Title>
                </Link>
                <Card.Text>
                    {address}
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