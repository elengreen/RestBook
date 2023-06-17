import React, { useState } from 'react';

import { Button } from 'react-bootstrap';

import './booking-request-card.css'
import { Rating } from '@mui/material';
import { usePostGradeRestaurantMutation } from '../../pages/restaurant-list/restaurantListApiSlice';


const BookingRequestCardArchived = ({ isOwner, restaurant, userName, userPhoneNumber, restaurantPhoneNumber, tableNumber, claimFromDate, claimToDate, id }) => {
    
    const [grade] = usePostGradeRestaurantMutation();
    const [rate, setRate] = useState(isOwner ? null : 1);
    const [isRated, setIsRated] = useState(false);

    const onRateSubmit = () => {
        grade({restaurantId: 1, grade: rate});
        setIsRated(true);
    }

    return (
        <div className='book-card'>
            <div className='book-card-info'>
                <span className='card-info-name'>{isOwner ? userName : restaurant}</span>
                <span className='card-info-phone'>{isOwner ? userPhoneNumber : restaurantPhoneNumber}</span>
            </div>
            <div className='book-card-info'>
                <span>{`${claimFromDate.getDate()}.${claimFromDate.getMonth()}.${claimFromDate.getFullYear()}`}</span>
                <span>{`${claimFromDate.getHours()}:${claimFromDate.getMinutes()}`}-{`${claimToDate.getHours()}:${claimToDate.getMinutes()}`}</span>
                <span>Стол #{tableNumber}</span>
            </div>
            <div className='book-card-rating'>
                {!isRated && <>
                    <Rating name="rating" value={rate} onClick={(e) => setRate(+e.target.defaultValue)} className='me-3' disabled={isOwner} />
                    <Button className='book-card-btn' type='submit' onClick={() => onRateSubmit()} variant="primary" size="lg" disabled={isOwner}>Оценить</Button>
                </>}
                {isRated && <>
                    <p>Спасибо за оценку!</p>
                </>}
            </div>

        </div>
    );
}

export default BookingRequestCardArchived;