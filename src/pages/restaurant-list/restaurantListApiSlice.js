import { apiSlice } from "../../api/apiSlice";

export const restauraurantListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getList: builder.query({
            query: () => '/api/Restaurants'
        }),
    })
})

export const {
    useGetListQuery
} = restauraurantListApiSlice