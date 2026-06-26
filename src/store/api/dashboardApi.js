import { toast } from 'react-hot-toast'
import { apiSlice } from './apiSlice'
import {
  fetchInventoryDailyStats,   fetchInventoryWeeklyStats,
  fetchInventoryMonthlyStats, fetchInventoryYearlyStats,
  fetchInventoryTotalStats,   fetchInventoryCustomStats,
  fetchProductionDailyStats,  fetchProductionWeeklyStats,
  fetchProductionMonthlyStats,fetchProductionYearlyStats,
  fetchProductionTotalStats,  fetchProductionCustomStats,
  fetchOrderDailyStats,       fetchOrderWeeklyStats,
  fetchOrderMonthlyStats,     fetchOrderYearlyStats,
  fetchOrderTotalStats,       fetchOrderCustomStats,
} from '../../api/dashboardService'

// Same period-picker logic as before. No aliasing needed here — the naming
// clash with orderService's fetchOrderMonthlyStats/fetchOrderTotalStats only
// existed when everything lived in one shared apiSlice.js file. Now that this
// file only imports from dashboardService, there's nothing to collide with.
const getDashboardInventoryStats = (p, s, e) => {
  if (p === 'daily')  return fetchInventoryDailyStats()
  if (p === 'weekly') return fetchInventoryWeeklyStats()
  if (p === 'yearly') return fetchInventoryYearlyStats()
  if (p === 'total')  return fetchInventoryTotalStats()
  if (p === 'custom') return fetchInventoryCustomStats(s, e)
  return fetchInventoryMonthlyStats()
}
const getDashboardProductionStats = (p, s, e) => {
  if (p === 'daily')  return fetchProductionDailyStats()
  if (p === 'weekly') return fetchProductionWeeklyStats()
  if (p === 'yearly') return fetchProductionYearlyStats()
  if (p === 'total')  return fetchProductionTotalStats()
  if (p === 'custom') return fetchProductionCustomStats(s, e)
  return fetchProductionMonthlyStats()
}
const getDashboardOrderStats = (p, s, e) => {
  if (p === 'daily')  return fetchOrderDailyStats()
  if (p === 'weekly') return fetchOrderWeeklyStats()
  if (p === 'yearly') return fetchOrderYearlyStats()
  if (p === 'total')  return fetchOrderTotalStats()
  if (p === 'custom') return fetchOrderCustomStats(s, e)
  return fetchOrderMonthlyStats()
}

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getDashboardStats: builder.query({
      queryFn: async ({ period, customStart = '', customEnd = '' }) => {
        try {
          const [invRes, prodRes, ordRes] = await Promise.allSettled([
            getDashboardInventoryStats(period, customStart, customEnd),
            getDashboardProductionStats(period, customStart, customEnd),
            getDashboardOrderStats(period, customStart, customEnd),
          ])
          return {
            data: {
              inventoryStats:  invRes.status  === 'fulfilled' && invRes.value.success
                                 ? invRes.value.stats  : null,
              productionStats: prodRes.status === 'fulfilled' && prodRes.value.success
                                 ? prodRes.value.stats : null,
              orderStats:      ordRes.status  === 'fulfilled' && ordRes.value.success
                                 ? ordRes.value.stats  : null,
            },
          }
        } catch {
          toast.error('Failed to load dashboard data')
          return { error: 'Failed to load dashboard data' }
        }
      },
    }),

  }),
  overrideExisting: false,
})

export const { useGetDashboardStatsQuery } = dashboardApi