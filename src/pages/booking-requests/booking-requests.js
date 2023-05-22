import React from 'react';
import './booking-requests.css'
import { Button } from 'react-bootstrap';

const BookingRequests = () => {
    return (
        <>
            <div className='fav-wrapper'>
                <h1 className='fav-header mb-4'>Бронирование</h1>
                <h2 className='mb-4'>Актуальные заявки</h2>
                <div className="book-cards">
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
                </div>
            </div>
        </>
    );
}

export default BookingRequests;