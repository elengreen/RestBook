import { apiSlice } from "../../api/apiSlice";

export const restauraurantListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getList: builder.query({
            query: (data) => {
                console.log(data);
                let baseUrl = '/api/Restaurants'
                if (!data)
                    return baseUrl;

                if (data.sort)
                    baseUrl += '?orderBy=Rating ' + data.sort;
                if (data.search)
                    baseUrl += `&filter=contains(Name, '${data.search}')`;
                if (!data.search) {
                    if (data.filter_1)
                        if (data.filter_2)
                            baseUrl += `&filter=rating gt ${data.filter_1} and rating le ${data.filter_2}`
                        else
                            baseUrl += `&filter=rating gt ${data.filter_1}`
                    if (data.filter_2 && !data.filter_1)
                        if (data.filter_2)
                            baseUrl += `&filter=rating le ${data.filter_2}`
                } else {
                    if (data.filter_1)
                        if (data.filter_2)
                            baseUrl += ` and rating gt ${data.filter_1} and rating le ${data.filter_2}`
                        else
                            baseUrl += ` and rating gt ${data.filter_1}`
                    if (data.filter_2 && !data.filter_1)
                        if (data.filter_2)
                            baseUrl += ` and rating le ${data.filter_2}`
                }


                return baseUrl;
            },
            transformResponse: (response, meta, arg) => {
                const offset = new Date().getTimezoneOffset() / 60;
                console.log(response);
                response.forEach(r => {
                    let openFrom = r.openFrom.split(':');
                    let openTo = r.openTo.split(':');
                    r.openFrom = `${(+openFrom[0] - offset) % 24}:${openFrom[1]}`;
                    r.openTo = `${(+openTo[0] - offset) % 24}:${openTo[1]}`;
                });
                return response;
            },
            providesTags: ['restaurantProfile']
        }),
        getRestaurantInfo: builder.query({
            query: (id) => `/api/Restaurants/Details?id=${id}`,
            transformResponse: (response, meta, arg) => {
                let openFrom = response.openFrom.split(':');
                let openTo = response.openTo.split(':');
                const offset = new Date().getTimezoneOffset() / 60;
                response.openFrom = `${(+openFrom[0] - offset) % 24}:${openFrom[1]}`;
                response.openTo = `${(+openTo[0] - offset) % 24}:${openTo[1]}`;
                return response;
            },
        }),
        patchRestaurantInfo: builder.mutation({
            query: details => ({
                url: '/api/Restaurants',
                method: 'PATCH',
                body: { ...details }
            }),
            invalidatesTags: ['restaurantProfile']
        }),
        postRestaurantInfo: builder.mutation({
            query: data => {
                const body = new FormData();

                for (let prop in data)
                {
                    if (prop === 'image')
                        body.append('schemeImage', data[prop][0])
                    else
                        body.append(prop, data[prop]);
                }

                return {
                    url: '/api/Restaurants',
                    method: 'POST',
                    headers: { "Content-Type": "multipart/form-data" },
                    body
                }
            },
            invalidatesTags: ['restaurantProfile']
        }),
        postRestaurantScheme: builder.mutation({
            query: image => {
                const body = new FormData();
                body.append('image', image[0]);

                return {
                    url: '/api/Restaurants/ChangeImage',
                    method: 'POST',
                    headers: { "Content-Type": "multipart/form-data" },
                    body
                }
            },
            invalidatesTags: ['restaurantProfile']
        }),
        postRestaurantMenu: builder.mutation({
            query: menu => {
                const body = new FormData();
                body.append('menu', menu[0]);

                return {
                    url: '/api/Restaurants/ChangeMenu',
                    method: 'POST',
                    headers: { "Content-Type": "multipart/form-data" },
                    body
                }
            },
            invalidatesTags: ['restaurantProfile']
        }),
        postTableClaim: builder.mutation({
            query: details => ({
                url: '/api/Tables/Claim',
                method: 'POST',
                body: { ...details }
            })
        }),
        postGradeRestaurant: builder.mutation({
            query: details => ({
                url: '/api/Restaurants/Grade',
                method: 'POST',
                body: {...details}
            })
        }),
        postRestaurantImage: builder.mutation({
            query: image => {
                const body = new FormData();
                body.append('image', image[0]);

                return {
                    url: '/api/Restaurants/ChangeRestaurantImage',
                    method: 'POST',
                    headers: { "Content-Type": "multipart/form-data" },
                    body
                }
            },
            invalidatesTags: ['restaurantProfile']
        }),
    })
})

export const {
    useGetListQuery,
    useGetRestaurantInfoQuery,
    usePatchRestaurantInfoMutation,
    usePostRestaurantInfoMutation,
    usePostRestaurantSchemeMutation,
    usePostRestaurantMenuMutation,
    usePostTableClaimMutation,
    usePostGradeRestaurantMutation,
    usePostRestaurantImageMutation
} = restauraurantListApiSlice