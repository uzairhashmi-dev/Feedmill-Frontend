import Skeleton from "../../../../components/Skeleton";

const FormulationSkeleton = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx}
        className="bg-white dark:bg-gray-900
                   border border-gray-100 dark:border-gray-800
                   rounded-2xl shadow-sm overflow-hidden">
        {/* top accent bar */}
        <Skeleton className="h-1.5 rounded-none" />

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <div className="flex gap-1">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-7 w-7 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-3" />

          <div className="flex items-center gap-1.5 mb-3">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3
                          flex justify-between items-center
                          border border-gray-100 dark:border-gray-700">
            <div>
              <Skeleton className="h-2.5 w-14 mb-1.5" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex flex-col items-end">
              <Skeleton className="h-2.5 w-16 mb-1.5" />
              <Skeleton className="h-5 w-8" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default FormulationSkeleton;