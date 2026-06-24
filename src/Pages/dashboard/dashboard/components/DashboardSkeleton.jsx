import Skeleton from "../../../../components/Skeleton";

const cardClass = "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5";

const StatCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm
                  border border-gray-100 dark:border-gray-800
                  p-5 flex items-center gap-4">
    <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
    <div className="min-w-0 flex-1">
      <Skeleton className="h-2.5 w-20 mb-2" />
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-2.5 w-32" />
    </div>
  </div>
);

const SectionSkeleton = ({ barColor }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-1 h-5 ${barColor} rounded-full`} />
      <Skeleton className="h-4 w-44" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)}
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <>
    {/* Summary Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className={`lg:col-span-1 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4.5 w-4.5 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
      <div className={cardClass}>
        <Skeleton className="h-4 w-28 mb-4" />
        <Skeleton className="h-[200px] w-full rounded-full mx-auto" style={{ maxWidth: 200 }} />
      </div>
      <div className={cardClass}>
        <Skeleton className="h-4 w-28 mb-4" />
        <Skeleton className="h-[200px] w-full rounded-full mx-auto" style={{ maxWidth: 200 }} />
      </div>
    </div>

    {/* 3 Sections */}
    <SectionSkeleton barColor="bg-emerald-600" />
    <SectionSkeleton barColor="bg-blue-600" />
    <SectionSkeleton barColor="bg-amber-500" />
  </>
);

export default DashboardSkeleton;