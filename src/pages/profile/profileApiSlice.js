import { apiSlice } from "../../api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/api/User',
            providesTags: ['profile']
        }),
        patchUser: builder.mutation({
            query: profile => ({
                url: '/api/User/EditUser',
                method: 'PATCH',
                body: { ...profile }
            }),
            invalidatesTags: ['profile']
        }),
        patchPassword: builder.mutation({
            query: password => ({
                url: '/api/User/ChangePassword',
                method: 'PATCH',
                body: `"${password}"`
            }),
            invalidatesTags: ['profile']
        }),
        getRestaurant: builder.query({
            query: () => '/api/User/Restaurant',
            transformResponse: (response, meta, arg) => {
                let openFrom = response.openFrom.split(':');
                let openTo = response.openTo.split(':');
                const offset = new Date().getTimezoneOffset()/60;
                response.openFrom = `${(+openFrom[0]-offset)%24}:${openFrom[1]}`;
                response.openTo = `${(+openTo[0]-offset)%24}:${openTo[1]}`;
                return response;
            },
            providesTags: ['restaurantProfile']
        }),
    })
})

export const {
    useGetUserQuery,
    usePatchUserMutation,
    usePatchPasswordMutation,
    useGetRestaurantQuery
} = profileApiSlice