import { apiSlice } from "../../api/apiSlice";

export const bookingRequestsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBookingRequests: builder.query({
            query: () => '/api/Tables/UserClaims',
            transformResponse: (response, meta, arg) => {
                const offset = new Date().getTimezoneOffset() / 60;
                response.forEach(r => {
                    let claimFromDate = new Date(r.claimFromDate);
                    claimFromDate.setHours(claimFromDate.getHours() - offset);

                    let claimToDate = new Date(r.claimToDate);
                    claimToDate.setHours(claimToDate.getHours() - offset);

                    r.claimFromDate = claimFromDate;
                    r.claimToDate = claimToDate; 
                });
                return response;
            },
            providesTags:['requests']
        }),
        cancelRequest: builder.mutation({
            query: requestId => ({
                url: '/api/Tables/Unclaim',
                method: 'POST',
                body: requestId
            }),
            invalidatesTags: ['requests']
        }),
        
    })
})

export const {
        useGetBookingRequestsQuery, useCancelRequestMutation
} = bookingRequestsApiSlice