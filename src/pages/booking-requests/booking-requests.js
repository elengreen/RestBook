import React from 'react';
import './booking-requests.css'
import BookingRequestCard from '../../components/booking-request-card/booking-request-card';
import BookingRequestCardArchived from '../../components/booking-request-card/booking-request-card-archived';

const BookingRequests = () => {
    return (
        <>
            <div className='main-wrapper'>
                <h1 className='main-header'>Бронирование</h1>
                <h2 className='mb-4'>Актуальные заявки</h2>
                <div className="book-cards">
                    <BookingRequestCard />
                    <BookingRequestCard/>
                    <BookingRequestCard/>
                </div>
                <h2 className='mb-4 mt-5'>История посещений</h2>
                <div className="book-cards">
                    <BookingRequestCardArchived />
                    <BookingRequestCardArchived/>
                </div>
            </div>
        </>
    );
}

export default BookingRequests;