
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import themeReducer from './themeSlice'
import authReducer  from './authSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth:  authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
export default store