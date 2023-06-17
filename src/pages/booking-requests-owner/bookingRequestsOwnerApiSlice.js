import { apiSlice } from "../../api/apiSlice";

export const bookingRequestsOwnerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBookingRequestsOwner: builder.query({
            query: () => '/api/Tables/RestaurantClaims',
            transformResponse: (response, meta, arg) => {
                const offset = new Date().getTimezoneOffset() / 60;
                console.log(response);

                response.forEach(r => {
                    let claimFromDate = new Date(r.claimFromDate);
                    claimFromDate.setHours(claimFromDate.getHours() - offset);

                    let claimToDate = new Date(r.claimToDate);
                    claimToDate.setHours(claimToDate.getHours() - offset);

                    r.claimFromDate = claimFromDate;
                    r.claimToDate = claimToDate; });
                    
                return response;
            },
        })
        
    })
})

export const {
        useGetBookingRequestsOwnerQuery
} = bookingRequestsOwnerApiSlice