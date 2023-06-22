import React from 'react';

import { Button } from 'react-bootstrap';
import './booking-request-card.css'

import { useCancelRequestMutation } from '../../pages/booking-requests-visitor/bookingRequestsApiSlice';
import { useGetUserQuery } from '../../pages/profile/profileApiSlice';



const BookingRequestCard = ({ isOwner, restaurant, userName, userPhoneNumber, restaurantPhoneNumber, tableNumber, claimFromDate, claimToDate, id, userId, refetchRequests }) => {

    const [cancelRequest] = useCancelRequestMutation();
    const { data: profile = null } = useGetUserQuery();

    const isClaimedByAdmin = profile?.id === userId
    const CardInfoName = () => {
        if (isOwner) {
            if (isClaimedByAdmin) {
                return 'Забронировано администратором'
            }
            return userName
        } else {
            return restaurant
        }
    }

    return (
        <div className='book-card'>
            <div className='book-card-info'>
                <span className={isClaimedByAdmin ? 'card-info-name admin' : 'card-info-name'}>{CardInfoName()}</span>
                <span className='card-info-phone'>{isOwner ? userPhoneNumber : restaurantPhoneNumber}</span>
            </div>
            <div className='book-card-info'>
                <span>{`${claimFromDate.getDate()}.${claimFromDate.getMonth() + 1}.${claimFromDate.getFullYear()}`}</span>
                <span>{`${claimFromDate.getHours()}:${claimFromDate.getMinutes()}`}-{`${claimToDate.getHours()}:${claimToDate.getMinutes()}`}</span>
                <span>Стол #{tableNumber}</span>
            </div>
            <Button className='book-card-btn' variant="danger" size="lg" onClick={async () => { await cancelRequest(id); refetchRequests() }}>Отменить</Button>
        </div>
    );
}

export default BookingRequestCard;