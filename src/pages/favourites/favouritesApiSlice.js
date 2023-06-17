import { apiSlice } from "../../api/apiSlice";

export const favouritesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFavourites: builder.query({
            query: () => '/api/User/Favorites',
            providesTags: ['favourites']
        }),
        addFavourite: builder.mutation({
            query: restId => ({
                url: '/api/User/AddToFavorites',
                method: 'POST',
                body: restId
            }),
            invalidatesTags: ['favourites']
        }),
        removeFavourite: builder.mutation({
            query: restId => ({
                url: '/api/User/RemoveFromFavorites',
                method: 'POST',
                body: restId
            }),
            invalidatesTags: ['favourites']
        }),
    })
})

export const {
    useGetFavouritesQuery, 
    useAddFavouriteMutation, 
    useRemoveFavouriteMutation
} = favouritesApiSlice
