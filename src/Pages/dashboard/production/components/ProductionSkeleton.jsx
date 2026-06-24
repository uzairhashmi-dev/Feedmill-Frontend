import Skeleton from "../../../../components/Skeleton";

const ProductionSkeleton = ({ rows = 6 }) => (
  <>
    {Array.from({ length: rows }).map((_, idx) => (
      <tr key={idx} className="border-b border-gray-50 dark:border-gray-800/60">
        <td className="px-5 py-4"><Skeleton className="h-3 w-4" /></td>
        <td className="px-5 py-4">
          <Skeleton className="h-4 w-28 mb-1.5" />
          <Skeleton className="h-2.5 w-16" />
        </td>
        <td className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
        <td className="px-5 py-4"><Skeleton className="h-4 w-16" /></td>
        <td className="px-5 py-4"><Skeleton className="h-4 w-20" /></td>
        <td className="px-5 py-4"><Skeleton className="h-5 w-20 rounded-lg" /></td>
        <td className="px-5 py-4">
          <div className="flex justify-end gap-1">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-7 w-7 rounded-lg" />
          </div>
        </td>
      </tr>
    ))}
  </>
);

export default ProductionSkeleton;