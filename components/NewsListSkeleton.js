export default function NewsListSkeleton() {
  return (
    <div>
      {/* Filter Buttons Skeleton */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-20 bg-gray-300 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* News Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            {/* Image placeholder */}
            <div className="h-48 bg-gray-300 relative">
              <div className="absolute bottom-0 left-0 h-6 w-16 bg-gray-400"></div>
            </div>

            {/* Content placeholder */}
            <div className="p-4">
              {/* Title */}
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

              {/* Date */}
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>

              {/* Summary */}
              <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>

              {/* Read more link */}
              <div className="h-5 bg-gray-300 rounded w-1/3 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
