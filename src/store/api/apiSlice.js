import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-hot-toast'
import {
  fetchAllCategories,
  createCategory as createCategoryApi,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
  searchCategories as searchCategoriesApi,
} from '../../api/categoryService'
import {
  fetchAllInventory, fetchMonthlyStats, fetchTotalStats,
  createInventory as createInventoryApi,
  updateInventory as updateInventoryApi,
  deleteInventory as deleteInventoryApi,
  searchInventory as searchInventoryApi,
  fetchFilteredOrders,
} from '../../api/inventoryService'

// fakeBaseQuery: we don't use a fetch/axios baseURL here because each endpoint
// below calls the existing service functions directly (same axios instance,
// same interceptors — nothing duplicated).
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Category', 'Inventory'],
  endpoints: (builder) => ({

    // ── Category ─────────────────────────────────────────
    getCategories: builder.query({
      queryFn: async () => {
        try {
          const res = await fetchAllCategories()
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          if (err.response?.status === 404) return { data: [] }
          toast.error('Failed to load categories')
          return { error: err.response?.data?.message || 'Failed to load categories' }
        }
      },
      providesTags: ['Category'],
    }),

    searchCategories: builder.query({
      queryFn: async (term) => {
        try {
          const res = await searchCategoriesApi(term)
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          return err.response?.status === 404
            ? { data: [] }
            : { error: err.response?.data?.message || 'Search failed' }
        }
      },
    }),

    createCategory: builder.mutation({
      queryFn: async (formData) => {
        try {
          const res = await createCategoryApi(formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Creation failed')
          return { error: err.response?.data?.message || 'Creation failed' }
        }
      },
      invalidatesTags: ['Category'],
    }),

    updateCategory: builder.mutation({
      queryFn: async ({ id, formData }) => {
        try {
          const res = await updateCategoryApi(id, formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Update failed')
          return { error: err.response?.data?.message || 'Update failed' }
        }
      },
      invalidatesTags: ['Category'],
    }),

    deleteCategory: builder.mutation({
      queryFn: async (id) => {
        try {
          const res = await deleteCategoryApi(id)
          if (res.success) {
            toast.success(res.message || 'Category deleted')
            return { data: id }
          }
          return { data: null }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Delete failed')
          return { error: err.response?.data?.message || 'Delete failed' }
        }
      },
      invalidatesTags: ['Category'],
    }),

    // ── Inventory ────────────────────────────────────────
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
})

export const {
  useGetCategoriesQuery,
  useLazySearchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  useGetInventoryQuery,
  useLazySearchInventoryItemsQuery,
  useLazyFilterInventoryItemsQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
} = apiSlice