import React from 'react';

import { Button, Form } from 'react-bootstrap';

import './booking-request-card.css'


const BookingRequestCardArchived = () => {

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
            <div className='book-card-rating'>
            <Form.Select className='book-card-selector me-2'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">4</option>
                <option value="3">5</option>
            </Form.Select>
            <Button className='book-card-btn' type='submit' variant="primary" size="lg">Оценить</Button>
            </div>
            
        </div>
    );
}

export default BookingRequestCardArchived;