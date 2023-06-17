import React from 'react';
import './booking-requests.css'
import BookingRequestCard from '../../components/booking-request-card/booking-request-card';
import BookingRequestCardArchived from '../../components/booking-request-card/booking-request-card-archived';
import { useGetBookingRequestsOwnerQuery } from './bookingRequestsOwnerApiSlice';

const BookingRequestsOwner = () => {

    const {
        data: requests,
    } = useGetBookingRequestsOwnerQuery();

    if (!requests)
        return(<></>);

    let archivedRequests = [];
    let activeRequests = [];

    requests.forEach(request => {
        if (request.isCanceled || request.isExpired)
            archivedRequests.push(<BookingRequestCardArchived key = {request.id} {...request} isOwner={true}/>)
        else
            activeRequests.push(<BookingRequestCard key = {request.id} {...request} isOwner={true} />)

    })

    return (
        <>
            <div className='main-wrapper'>
                <h1 className='main-header'>Бронирование</h1>
                <h2 className='mb-4'>Актуальные заявки</h2>
                <div className="book-cards">
                    {activeRequests}
                </div>
                <h2 className='mb-4 mt-5'>История посещений</h2>
                <div className="book-cards">
                    {archivedRequests}
                </div>
            </div>
        </>
    );
}

export default BookingRequestsOwner;