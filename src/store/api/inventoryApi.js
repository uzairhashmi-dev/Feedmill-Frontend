import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchAllInventory, fetchMonthlyStats, fetchTotalStats,
  createInventory as createInventoryApi,
  updateInventory as updateInventoryApi,
  deleteInventory as deleteInventoryApi,
  searchInventory as searchInventoryApi,
  fetchFilteredOrders,
} from '../../api/inventoryService'

export const inventoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getInventory: builder.query({
      queryFn: async () => {
        try {
          const [itemRes, statsRes, totalRes] = await Promise.allSettled([
            fetchAllInventory(),
            fetchMonthlyStats(),
            fetchTotalStats(),
          ])
          return {
            data: {
              items:      itemRes.status  === 'fulfilled' && itemRes.value.success
                            ? itemRes.value.data || []   : [],
              stats:      statsRes.status === 'fulfilled' && statsRes.value.success
                            ? statsRes.value.monthlyStats || null : null,
              totalStats: totalRes.status === 'fulfilled' && totalRes.value.success
                            ? totalRes.value.totalStats || null   : null,
            },
          }
        } catch {
          toast.error('Failed to load inventory data')
          return { error: 'Failed to load inventory data' }
        }
      },
      providesTags: ['Inventory'],
    }),

    searchInventoryItems: builder.query({
      queryFn: async (term) => {
        try {
          const res = await searchInventoryApi(term)
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          if (err.response?.status === 404) return { data: [] }
          toast.error('Search failed')
          return { error: 'Search failed' }
        }
      },
    }),

    filterInventoryItems: builder.query({
      queryFn: async (filters) => {
        try {
          const res = await fetchFilteredOrders(filters)
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          if (err.response?.status === 404) return { data: [] }
          toast.error('Filter failed')
          return { error: 'Filter failed' }
        }
      },
    }),

    createInventoryItem: builder.mutation({
      queryFn: async (formData) => {
        try {
          const res = await createInventoryApi(formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to create item')
          return { error: err.response?.data?.message || 'Failed to create item' }
        }
      },
      invalidatesTags: ['Inventory'],
    }),

    updateInventoryItem: builder.mutation({
      queryFn: async ({ id, formData }) => {
        try {
          const res = await updateInventoryApi(id, formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to update item')
          return { error: err.response?.data?.message || 'Failed to update item' }
        }
      },
      invalidatesTags: ['Inventory'],
    }),

    deleteInventoryItem: builder.mutation({
      queryFn: async (id) => {
        try {
          const res = await deleteInventoryApi(id)
          if (res.success) {
            toast.success('Item deleted successfully')
            return { data: true }
          }
          return { data: false }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to delete item')
          return { error: err.response?.data?.message || 'Failed to delete item' }
        }
      },
      invalidatesTags: ['Inventory'],
    }),

  }),
  overrideExisting: false,
})

export const {
  useGetInventoryQuery,
  useLazySearchInventoryItemsQuery,
  useLazyFilterInventoryItemsQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
} = inventoryApi