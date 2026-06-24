import Skeleton from "../../../../components/Skeleton";

const SalesSkeleton = ({ rows = 6 }) => (
  <>
    {Array.from({ length: rows }).map((_, idx) => (
      <tr key={idx} className="border-b border-gray-50 dark:border-gray-800/60">
        <td className="px-4 py-4"><Skeleton className="h-3 w-4" /></td>
        <td className="px-4 py-4">
          <Skeleton className="h-3.5 w-24 mb-1.5" />
          <Skeleton className="h-2.5 w-12" />
        </td>
        <td className="px-4 py-4">
          <Skeleton className="h-3.5 w-20 mb-1.5" />
          <Skeleton className="h-2.5 w-14" />
        </td>
        <td className="px-4 py-4">
          <Skeleton className="h-3.5 w-14 mb-1.5" />
          <Skeleton className="h-2.5 w-12" />
        </td>
        <td className="px-4 py-4"><Skeleton className="h-3.5 w-14" /></td>
        <td className="px-4 py-4"><Skeleton className="h-4 w-16" /></td>
        <td className="px-4 py-4"><Skeleton className="h-3.5 w-14" /></td>
        <td className="px-4 py-4"><Skeleton className="h-3.5 w-14" /></td>
        <td className="px-4 py-4"><Skeleton className="h-3 w-16" /></td>
        <td className="px-4 py-4">
          <div className="flex justify-end gap-1">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-7 w-7 rounded-lg" />
          </div>
        </td>
      </tr>
    ))}
  </>
);

export default SalesSkeleton;