import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../pages/login/loginSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7010',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().login.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        if (!headers.has("Content-Type")){
            headers.set("Content-Type", " application/json;odata.metadata=minimal;odata.streaming=true")
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log("sendind...");
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo')) ?? { refreshToken: api.getState().login.refreshToken,  accessToken: api.getState().login.token };

        const refreshResult = await baseQuery(
            { url: '/Authentication/RefreshToken', method: 'POST', body: { accessToken: tokenInfo.token, refreshToken: tokenInfo.refreshToken } },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            // store the new tokenInfo
            api.dispatch(setCredentials({ ...refreshResult.data }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})