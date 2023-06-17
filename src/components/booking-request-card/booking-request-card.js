import React from 'react';

import { Button } from 'react-bootstrap';

import './booking-request-card.css'
import { useCancelRequestMutation } from '../../pages/booking-requests-visitor/bookingRequestsApiSlice';


const BookingRequestCard = ({isOwner, restaurant, userName, userPhoneNumber, restaurantPhoneNumber, tableNumber, claimFromDate, claimToDate, id}) => {
    const [cancelRequest] = useCancelRequestMutation();
    return (
        <div className='book-card'>
            <div className='book-card-info'>
                <span className='card-info-name'>{isOwner ? userName : restaurant}</span>
                <span className='card-info-phone'>{isOwner ? userPhoneNumber : restaurantPhoneNumber}</span>
            </div>
            <div className='book-card-info'>
                <span>{`${claimFromDate.getDate()}.${claimFromDate.getMonth()+1}.${claimFromDate.getFullYear()}`}</span>
                <span>{`${claimFromDate.getHours()}:${claimFromDate.getMinutes()}`}-{`${claimToDate.getHours()}:${claimToDate.getMinutes()}`}</span>
                <span>Стол #{tableNumber}</span>
            </div>
            <Button className='book-card-btn' variant="danger" size="lg" onClick={() => cancelRequest(id)}>Отменить</Button>
        </div>
    );
}

export default BookingRequestCard;