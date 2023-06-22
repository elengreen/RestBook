import React, { useState } from 'react';

import { Button } from 'react-bootstrap';

import './booking-request-card.css'
import { Rating } from '@mui/material';
import { usePostGradeRestaurantMutation } from '../../pages/restaurant-list/restaurantListApiSlice';
import { useGetUserQuery } from '../../pages/profile/profileApiSlice';


const BookingRequestCardArchived = ({ isOwner, isCanceled, restaurant, userName, userPhoneNumber, restaurantPhoneNumber, tableNumber, claimFromDate, claimToDate, id, restaurantId, userId }) => {
    
    const [grade] = usePostGradeRestaurantMutation();
    const { data: profile = null } = useGetUserQuery();

    const [rate, setRate] = useState(isOwner ? null : 1);
    const [isRated, setIsRated] = useState(false);

    const onRateSubmit = () => {
        grade({restaurantId: restaurantId, grade: rate, tableClaimId: id});
        setIsRated(true);
    }

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
                <span>{`${claimFromDate.getDate()}.${claimFromDate.getMonth()+1}.${claimFromDate.getFullYear()}`}</span>
                <span>{`${claimFromDate.getHours()}:${claimFromDate.getMinutes()}`}-{`${claimToDate.getHours()}:${claimToDate.getMinutes()}`}</span>
                <span>Стол #{tableNumber}</span>
            </div>
            <div className='book-card-rating'>
                {!isCanceled && !isRated && <>
                    <Rating name="rating" value={rate} onClick={(e) => setRate(+e.target.defaultValue)} className='me-3' disabled={isOwner} />
                    <Button className='book-card-btn' type='submit' onClick={() => onRateSubmit()} variant="primary" size="lg" disabled={isOwner}>Оценить</Button>
                </>}
                {!isCanceled && isRated && <>
                    <p  className='me-5 mt-2 ms-5'>Спасибо за оценку!</p>
                </>}
                {isCanceled && <span className='me-5 ms-5 cancelled-request'>Отменено</span>}
            </div>
        </div>
    );
}

export default BookingRequestCardArchived;