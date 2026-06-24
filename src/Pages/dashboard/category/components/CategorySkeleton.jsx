import Skeleton from "../../../../components/Skeleton";

const CategorySkeleton = ({ count = 6 }) => (
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
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex gap-1">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-7 w-7 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3.5 w-full mb-1.5" />
          <Skeleton className="h-3.5 w-2/3 mb-3" />

          <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800
                          flex justify-between items-center">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>
      </div>
    ))}
  </>
);

export default CategorySkeleton;