import { apiSlice } from "../../api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/api/User',
            providesTags: ['profile']
        }),
        patchUser: builder.mutation({
            query: profile => ({
                url: '/api/User',
                method: 'PATCH',
                body: { ...profile }
            }),
            invalidatesTags: ['profile']
        }),
    })
})

export const {
    useGetUserQuery, usePatchUserMutation
} = profileApiSlice