import axios from 'axios'

const API = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        await axios.post(
          // 'http://localhost:8000/api/auth/refreshAccessToken',
          import.meta.env.VITE_REFRESH_ACCESS_TOKEN_URL,
          {},
          { withCredentials: true }
        )
        return API(original)
      } catch {
        // lazy import — avoids circular dep with store
        const { store } = await import('../store/store')
        const { forceLogout } = await import('../store/authSlice')
        store.dispatch(forceLogout())
        // redirect to login
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default API