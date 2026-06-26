import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

import { useGetDashboardStatsQuery } from "../../../store/api/dashboardApi";

import PeriodSelector   from "./components/PeriodSelector";
import InventorySection from "./components/InventorySection";
import ProductionSection from "./components/ProductionSection";
import OrdersSection    from "./components/OrdersSection";
import SummaryCharts    from "./components/SummaryCharts";
import DashboardSkeleton from "./components/DashboardSkeleton";

const Dashboard = () => {
  // UI-selected period + draft custom dates (typing here doesn't trigger a fetch)
  const [period,      setPeriod]      = useState("monthly");
  const [customStart, setCustomStart] = useState("");
  const [customEnd,   setCustomEnd]   = useState("");

  // queryArg only changes when we actually want to fetch — same monthly
  // default on mount as the old useEffect(() => fetchDashboardStats({period:'monthly'}))
  const [queryArg, setQueryArg] = useState({ period: "monthly", customStart: "", customEnd: "" });

  const { data, isFetching: loading } = useGetDashboardStatsQuery(queryArg);
  const inventoryStats  = data?.inventoryStats  ?? null;
  const productionStats = data?.productionStats ?? null;
  const orderStats      = data?.orderStats      ?? null;

  // ✅ Same as handlePeriodChange
  const handlePeriodChange = useCallback((newPeriod) => {
    setPeriod(newPeriod);
    if (newPeriod !== "custom") {
      setQueryArg({ period: newPeriod, customStart: "", customEnd: "" });
    }
    // custom → wait for user to pick dates and press Apply
  }, []);

  // ✅ Same as handleCustomApply
  const handleCustomApply = useCallback(() => {
    if (!customStart || !customEnd) {
      toast.error("Please select both start and end dates");
      return;
    }
    if (new Date(customStart) > new Date(customEnd)) {
      toast.error("Start date must be before end date");
      return;
    }
    setQueryArg({ period: "custom", customStart, customEnd });
  }, [customStart, customEnd]);

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-transparent
                    p-4 md:p-5 lg:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          FeedMill operations overview
        </p>
      </div>

      <PeriodSelector
        period={period}
        onPeriodChange={handlePeriodChange}
        customStart={customStart}
        customEnd={customEnd}
        onCustomStartChange={(v) => setCustomStart(v)}
        onCustomEndChange={(v)   => setCustomEnd(v)}
        onCustomApply={handleCustomApply}
        loading={loading}
      />

      {/* Loading */}
      {loading && (
       <DashboardSkeleton />
      )}

      {/* Content */}
      {!loading && (
        <>
          <SummaryCharts
            inventoryStats={inventoryStats}
            productionStats={productionStats}
            orderStats={orderStats}
          />
          <InventorySection  stats={inventoryStats}  loading={loading} />
          <ProductionSection stats={productionStats} loading={loading} />
          <OrdersSection     stats={orderStats}      loading={loading} />

          {/* Empty state */}
          {!inventoryStats && !productionStats && !orderStats && (
            <div className="flex flex-col items-center justify-center
                            py-20 text-gray-400 dark:text-gray-600">
              <p className="text-base font-medium">No data available</p>
              <p className="text-sm mt-1">
                Try a different period or add some data first
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;