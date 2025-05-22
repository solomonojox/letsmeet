const CardSkeleton = () => (
  <div className="p-4 rounded-xl shadow-sm bg-white animate-pulse">
    <div className="flex justify-between items-start px-2">
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-32 mt-3"></div>
  </div>
);

const CardSkeletonLoader = ({num}) => (
  <div className={`grid grid-cols-1 md:grid-cols-${num} gap-4`}>
    {[...Array(num)].map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

export default CardSkeletonLoader;