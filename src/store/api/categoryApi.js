import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchAllCategories,
  createCategory as createCategoryApi,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
  searchCategories as searchCategoriesApi,
} from '../../api/categoryService'

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

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

  }),
  overrideExisting: false,
})

export const {
  useGetCategoriesQuery,
  useLazySearchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi