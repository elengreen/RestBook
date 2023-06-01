import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
    name: 'login',
    initialState: JSON.parse(localStorage.getItem('tokenInfo')) ?? { refreshToken: null, token: null, validTo: null },
    reducers: {
        setCredentials: (state, action) => {
            const { token, refreshToken, validTo } = action.payload
            localStorage.setItem('tokenInfo', JSON.stringify(action.payload));
            state.refreshToken = refreshToken
            state.token = token
            state.validTo = validTo
        },
        logOut: (state, action) => {
            localStorage.removeItem("tokenInfo");
            state.refreshToken = null
            state.token = null
            state.validTo = null
        }
    },
})

export const { setCredentials, logOut } = loginSlice.actions

export default loginSlice.reducer

export const selectCurrentToken = (state) => state.login.token