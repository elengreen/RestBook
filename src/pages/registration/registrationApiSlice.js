import { apiSlice } from "../../api/apiSlice";

export const registrationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registrationUser: builder.mutation({
            query: credentials => ({
                url: '/Authentication/Register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        registrationOwner: builder.mutation({
            query: credentials => ({
                url: '/Authentication/RegisterAdmin',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useRegistrationUserMutation, useRegistrationOwnerMutation
} = registrationApiSlice