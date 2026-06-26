import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchAllFormulas,
  createFormula as createFormulaApi,
  updateFormula as updateFormulaApi,
  deleteFormula as deleteFormulaApi,
  searchFormulas as searchFormulasApi,
  fetchCategoriesForFormula,
  fetchInventoryForFormula,
} from '../../api/formulaService'

export const formulaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getFormulas: builder.query({
      queryFn: async () => {
        try {
          const [formulaRes, catRes, invRes] = await Promise.allSettled([
            fetchAllFormulas(),
            fetchCategoriesForFormula(),
            fetchInventoryForFormula(),
          ])
          return {
            data: {
              formulas: formulaRes.status === 'fulfilled' && formulaRes.value.success
                ? formulaRes.value.data || [] : [],
              categories: catRes.status === 'fulfilled' && catRes.value.success
                ? catRes.value.data || [] : [],
              inventoryItems: invRes.status === 'fulfilled' && invRes.value.success
                ? (invRes.value.data || []).filter((i) => i.status === 'Received') : [],
            },
          }
        } catch {
          toast.error('Failed to load formula data')
          return { error: 'Failed to load formula data' }
        }
      },
      providesTags: ['Formula'],
    }),

    searchFormulas: builder.query({
      queryFn: async (term) => {
        try {
          const res = await searchFormulasApi(term)
          return { data: res.success ? res.data || [] : [] }
        } catch (err) {
          if (err.response?.status === 404) return { data: [] }
          toast.error('Search failed')
          return { error: 'Search failed' }
        }
      },
    }),

    createFormulaItem: builder.mutation({
      queryFn: async (formData) => {
        try {
          const res = await createFormulaApi(formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to create formula')
          return { error: err.response?.data?.message || 'Failed to create formula' }
        }
      },
      invalidatesTags: ['Formula'],
    }),

    updateFormulaItem: builder.mutation({
      queryFn: async ({ id, formData }) => {
        try {
          const res = await updateFormulaApi(id, formData)
          return { data: res.success === true }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to update formula')
          return { error: err.response?.data?.message || 'Failed to update formula' }
        }
      },
      invalidatesTags: ['Formula'],
    }),

    deleteFormulaItem: builder.mutation({
      queryFn: async (id) => {
        try {
          const res = await deleteFormulaApi(id)
          if (res.success) {
            toast.success(res.message || 'Formula deleted successfully')
            return { data: true }
          }
          return { data: false }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to delete formula')
          return { error: err.response?.data?.message || 'Failed to delete formula' }
        }
      },
      invalidatesTags: ['Formula'],
    }),

  }),
  overrideExisting: false,
})

export const {
  useGetFormulasQuery,
  useLazySearchFormulasQuery,
  useCreateFormulaItemMutation,
  useUpdateFormulaItemMutation,
  useDeleteFormulaItemMutation,
} = formulaApi