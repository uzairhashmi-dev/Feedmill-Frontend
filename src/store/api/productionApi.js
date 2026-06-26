import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchAllProductions,
  createProduction as createProductionApi,
  updateProduction as updateProductionApi,
  deleteProduction as deleteProductionApi,
  searchProductions as searchProductionsApi,
  fetchFormulasForProduction,
} from '../../api/productionService'

export const productionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProductions: builder.query({
      queryFn: async () => {
        try {
          const [prodRes, formulaRes] = await Promise.allSettled([
            fetchAllProductions(),
            fetchFormulasForProduction(),
          ])
          return {
            data: {
              productions: prodRes.status === 'fulfilled' && prodRes.value.success
                ? prodRes.value.data || [] : [],
              formulas: formulaRes.status === 'fulfilled' && formulaRes.value.success
                ? formulaRes.value.data || [] : [],
            },
          }
        } catch {
          toast.error('Failed to load production data')
          return { error: 'Failed to load production data' }
        }
      },
      providesTags: ['Production'],
    }),

    searchProductions: builder.query({
      queryFn: async (term) => {
        try {
          const res = await searchProductionsApi(term)
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          if (err.response?.status === 404) return { data: [] }
          toast.error('Search failed')
          return { error: 'Search failed' }
        }
      },
    }),

    createProductionItem: builder.mutation({
      queryFn: async (formData) => {
        try {
          const res = await createProductionApi(formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to create batch')
          return { error: err.response?.data?.message || 'Failed to create batch' }
        }
      },
      invalidatesTags: ['Production'],
    }),

    updateProductionItem: builder.mutation({
      queryFn: async ({ id, formData }) => {
        try {
          const res = await updateProductionApi(id, formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to update batch')
          return { error: err.response?.data?.message || 'Failed to update batch' }
        }
      },
      invalidatesTags: ['Production'],
    }),

    deleteProductionItem: builder.mutation({
      queryFn: async (id) => {
        try {
          const res = await deleteProductionApi(id)
          if (res.success) {
            toast.success(res.message || 'Batch deleted successfully')
            return { data: true }
          }
          return { data: false }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to delete batch')
          return { error: err.response?.data?.message || 'Failed to delete batch' }
        }
      },
      invalidatesTags: ['Production'],
    }),

  }),
  overrideExisting: false,
})

export const {
  useGetProductionsQuery,
  useLazySearchProductionsQuery,
  useCreateProductionItemMutation,
  useUpdateProductionItemMutation,
  useDeleteProductionItemMutation,
} = productionApi