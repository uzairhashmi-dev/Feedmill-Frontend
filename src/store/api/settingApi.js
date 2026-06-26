import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchProfile,
  updateProfileApi,
  changePasswordApi,
} from '../../api/settingService'

export const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProfile: builder.query({
      queryFn: async () => {
        try {
          const res = await fetchProfile()
          if (res.success) return { data: res.user }
          toast.error('Failed to load profile')
          return { error: 'Failed to load profile' }
        } catch (err) {
          toast.error('Failed to load profile')
          return { error: err.message || 'Failed to load profile' }
        }
      },
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation({
      queryFn: async (formData) => {
        try {
          const res = await updateProfileApi(formData)
          if (res.success) {
            toast.success('Profile updated successfully!')
            window.dispatchEvent(new Event('profile:updated'))
            return { data: true }
          }
          return { data: false }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to update profile')
          return { error: err.response?.data?.message || 'Failed to update profile' }
        }
      },
      invalidatesTags: ['Profile'],
    }),

    changePassword: builder.mutation({
      queryFn: async (data) => {
        try {
          const res = await changePasswordApi(data)
          if (res.success) {
            toast.success('Password changed successfully!')
            return { data: true }
          }
          return { data: false }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to change password')
          return { error: err.response?.data?.message || 'Failed to change password' }
        }
      },
    }),

  }),
  overrideExisting: false,
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = settingApi