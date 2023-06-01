import React from 'react';

import { Button } from 'react-bootstrap';

import './booking-request-card.css'


const BookingRequestCard = () => {
    return (
        <div className='book-card'>
            <div className='book-card-info'>
                <span className='card-info-name'>Иван</span>
                <span className='card-info-phone'>+79093332124</span>
            </div>
            <div className='book-card-info'>
                <span>21.06.2023</span>
                <span>16:30</span>
                <span>Стол #7</span>
            </div>
            <Button className='book-card-btn' variant="danger" size="lg">Отменить</Button>
        </div>
    );
}

export default BookingRequestCard;