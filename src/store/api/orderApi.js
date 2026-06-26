import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchAllOrders, fetchOrderMonthlyStats, fetchOrderTotalStats,
  fetchFormulaStockSummary,
  createOrder as createOrderApi,
  updateOrder as updateOrderApi,
  deleteOrder as deleteOrderApi,
  searchOrders as searchOrdersApi,
} from '../../api/orderService'
import { fetchAllFormulas } from '../../api/formulaService'

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getOrders: builder.query({
      queryFn: async () => {
        try {
          const [ordersRes, monthlyRes, totalRes, stockRes, formulaRes] =
            await Promise.allSettled([
              fetchAllOrders(), fetchOrderMonthlyStats(),
              fetchOrderTotalStats(), fetchFormulaStockSummary(),
              fetchAllFormulas(),
            ])
          return {
            data: {
              orders:       ordersRes.status  === 'fulfilled' && ordersRes.value.success  ? ordersRes.value.data  || [] : [],
              monthlyStats: monthlyRes.status === 'fulfilled' && monthlyRes.value.success ? monthlyRes.value.monthlyStats || null : null,
              totalStats:   totalRes.status   === 'fulfilled' && totalRes.value.success   ? totalRes.value.totalStats   || null : null,
              stockSummary: stockRes.status   === 'fulfilled' && stockRes.value.success   ? stockRes.value.data   || [] : [],
              formulas:     formulaRes.status === 'fulfilled' && formulaRes.value.success ? formulaRes.value.data || [] : [],
            },
          }
        } catch {
          toast.error('Failed to load sales data')
          return { error: 'Failed to load sales data' }
        }
      },
      providesTags: ['Order'],
    }),

    searchOrders: builder.query({
      queryFn: async (term) => {
        try {
          const res = await searchOrdersApi(term)
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          if (err.response?.status === 404) return { data: [] }
          toast.error('Search failed')
          return { error: 'Search failed' }
        }
      },
    }),

    createOrderItem: builder.mutation({
      queryFn: async (formData) => {
        try {
          const res = await createOrderApi(formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to create order')
          return { error: err.response?.data?.message || 'Failed to create order' }
        }
      },
      invalidatesTags: ['Order'],
    }),

    updateOrderItem: builder.mutation({
      queryFn: async ({ id, formData }) => {
        try {
          const res = await updateOrderApi(id, formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to update order')
          return { error: err.response?.data?.message || 'Failed to update order' }
        }
      },
      invalidatesTags: ['Order'],
    }),

    deleteOrderItem: builder.mutation({
      queryFn: async (id) => {
        try {
          const res = await deleteOrderApi(id)
          if (res.success) {
            toast.success('Order deleted successfully')
            return { data: true }
          }
          return { data: false }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to delete order')
          return { error: err.response?.data?.message || 'Failed to delete order' }
        }
      },
      invalidatesTags: ['Order'],
    }),

  }),
  overrideExisting: false,
})

export const {
  useGetOrdersQuery,
  useLazySearchOrdersQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation,
} = orderApi