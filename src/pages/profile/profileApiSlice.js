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
    })
})

export const {
    useGetUserQuery, usePatchUserMutation, usePatchPasswordMutation
} = profileApiSlice