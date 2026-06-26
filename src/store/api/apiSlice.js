import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

// Base API slice — intentionally empty here.
// Each feature file (categoryApi.js, inventoryApi.js, formulaApi.js,
// productionApi.js, orderApi.js, settingApi.js, dashboardApi.js) injects its
// own endpoints into THIS SAME slice via apiSlice.injectEndpoints(). That
// means everything still shares one reducer ('api') and one cache —
// store.js does not need to change at all.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Category', 'Inventory', 'Formula', 'Production', 'Order', 'Profile'],
  endpoints: () => ({}),
})