import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import loginReducer from '../pages/login/loginSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        login: loginReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
          }).concat(apiSlice.middleware),
    devTools: true
})