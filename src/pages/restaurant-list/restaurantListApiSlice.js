import { apiSlice } from "../../api/apiSlice";

export const restauraurantListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getList: builder.query({
            query: () => '/api/Restaurants'
        }),
        getRestaurantInfo: builder.query({
            query: (id) => `/api/Restaurants/Details?id=${id}`
        })
    })
})

export const {
    useGetListQuery, useGetRestaurantInfoQuery
} = restauraurantListApiSlice