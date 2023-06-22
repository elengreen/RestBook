import React from 'react';
import './booking-requests.css'
import BookingRequestCard from '../../components/booking-request-card/booking-request-card';
import BookingRequestCardArchived from '../../components/booking-request-card/booking-request-card-archived';
import { useGetBookingRequestsQuery } from './bookingRequestsApiSlice';

const BookingRequestsVisitor = () => {

    const {
        data: requests,
    } = useGetBookingRequestsQuery();

    if (!requests)
        return(<></>);

    let archivedRequests = [];
    let activeRequests = [];

    requests.forEach(request => {
        if (request.isExpired)
            archivedRequests.push(<BookingRequestCardArchived key = {request.id} {...request} isOwner={false}/>)
            else if (request.isCanceled)
                archivedRequests.push(<BookingRequestCardArchived key = {request.id} {...request} isOwner={false} isCanceled={true}/>)
        else
            activeRequests.push(<BookingRequestCard key = {request.id} {...request} isOwner={false}/>)
    })

    return (
        <>
            <div className='main-wrapper'>
                <h1 className='main-header'>Бронирование</h1>
                <h2 className='mb-4'>Актуальные заявки</h2>
                <div className="book-cards">
                    {activeRequests.length===0 && <span className='empty-state'>У вас нет активных заявок</span>}
                    {activeRequests}
                </div>
                <h2 className='mb-4 mt-5'>История посещений</h2>
                <div className="book-cards">
                    {activeRequests.length===0 && <span className='empty-state'>У вас нет заявок в архиве</span>}
                    {archivedRequests}
                </div>
            </div>
        </>
    );
}

export default BookingRequestsVisitor;