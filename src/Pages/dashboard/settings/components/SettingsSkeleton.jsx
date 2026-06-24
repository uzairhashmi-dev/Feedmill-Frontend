import Skeleton, { SkeletonCircle } from "../../../../components/Skeleton";

const FieldSkeleton = () => (
  <div>
    <Skeleton className="h-3 w-20 mb-2" />
    <Skeleton className="h-10 w-full rounded-xl" />
  </div>
);

const SectionCardSkeleton = ({ fields = 4, half = true }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm
                  border border-gray-100 dark:border-gray-800 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800
                    flex items-center gap-3">
      <Skeleton className="h-9 w-9 rounded-xl" />
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="p-6">
      <div className={`grid grid-cols-1 ${half ? "sm:grid-cols-2" : ""} gap-4`}>
        {Array.from({ length: fields }).map((_, i) => <FieldSkeleton key={i} />)}
      </div>
      <div className="flex justify-end mt-5">
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>
    </div>
  </div>
);

const SettingsSkeleton = () => (
  <div className="min-h-screen bg-gray-50/60 dark:bg-transparent p-4 md:p-6 lg:p-8">

    {/* Page Header */}
    <div className="mb-6">
      <Skeleton className="h-7 w-32 mb-2" />
      <Skeleton className="h-4 w-56" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT — Profile Summary */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm
                        border border-gray-100 dark:border-gray-800 p-6 text-center">
          <div className="flex justify-center mb-4">
            <SkeletonCircle size={96} />
          </div>
          <Skeleton className="h-5 w-32 mx-auto mb-2" />
          <Skeleton className="h-3.5 w-24 mx-auto mb-1.5" />
          <Skeleton className="h-3 w-40 mx-auto mb-3" />
          <Skeleton className="h-5 w-20 rounded-lg mx-auto mb-4" />
          <Skeleton className="h-7 w-28 rounded-lg mx-auto" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm
                        border border-gray-100 dark:border-gray-800 p-5 space-y-4">
          <Skeleton className="h-3 w-28 mb-2" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <SkeletonCircle size={16} />
              <div className="flex-1">
                <Skeleton className="h-2.5 w-14 mb-1.5" />
                <Skeleton className="h-3.5 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Forms */}
      <div className="lg:col-span-2 space-y-6">
        <SectionCardSkeleton fields={4} half={true} />
        <SectionCardSkeleton fields={3} half={false} />
      </div>
    </div>
  </div>
);

export default SettingsSkeleton;