const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`} />
);

export const SkeletonCircle = ({ size = 32, className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full shrink-0 ${className}`}
    style={{ width: size, height: size }}
  />
);

export default Skeleton;