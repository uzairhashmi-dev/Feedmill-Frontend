import Skeleton, { SkeletonCircle } from "../../../../components/Skeleton";

const CustomersSkeleton = ({ rows = 6 }) => (
  <>
    {Array.from({ length: rows }).map((_, idx) => (
      <tr key={idx} className="border-b border-gray-50 dark:border-gray-800/60">
        <td className="px-4 py-4"><Skeleton className="h-3 w-4" /></td>
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <SkeletonCircle size={32} />
            <Skeleton className="h-4 w-28" />
          </div>
        </td>
        <td className="px-4 py-4">
          <Skeleton className="h-3.5 w-8 mb-1.5" />
          <Skeleton className="h-2.5 w-16" />
        </td>
        <td className="px-4 py-4"><Skeleton className="h-3.5 w-16" /></td>
        <td className="px-4 py-4"><Skeleton className="h-4 w-20" /></td>
        <td className="px-4 py-4"><Skeleton className="h-3.5 w-16" /></td>
        <td className="px-4 py-4"><Skeleton className="h-3.5 w-16" /></td>
        <td className="px-4 py-4"><Skeleton className="h-5 w-16 rounded-lg" /></td>
        <td className="px-4 py-4"><Skeleton className="h-3 w-16" /></td>
        <td className="px-4 py-4">
          <div className="flex justify-end">
            <Skeleton className="h-7 w-7 rounded-lg" />
          </div>
        </td>
      </tr>
    ))}
  </>
);

export default CustomersSkeleton;