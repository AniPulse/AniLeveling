'use client';

import { motion } from 'framer-motion';

const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-card-gradient border border-gray-700 rounded-xl p-6 shadow-card ${className}`}>
    <div className="animate-pulse">
      <div className="h-6 bg-gray-700 rounded-md mb-4 w-1/2"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const SkeletonStat = ({ className = "" }) => (
  <div className={`bg-card-gradient border border-gray-700 rounded-xl p-6 shadow-card ${className}`}>
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
        <div className="h-8 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-24"></div>
    </div>
  </div>
);

const LoadingSkeleton = ({ type = "dashboard" }) => {
  if (type === "dashboard") {
    return (
      <div className="min-h-screen bg-solo-gradient">
        <div className="container mx-auto px-4 py-8">
          {/* Header skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-6 mb-8"
          >
            <div className="w-24 h-24 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-700 rounded-md mb-2 w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-32 mt-2 animate-pulse"></div>
            </div>
          </motion.div>

          {/* Stats grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SkeletonStat />
              </motion.div>
            ))}
          </div>

          {/* Charts grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SkeletonCard className="h-96" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <SkeletonCard className="h-96" />
            </motion.div>
          </div>

          {/* Additional content skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <SkeletonCard className="h-64" />
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
          />
        </div>
      </div>
    );
  }

  if (type === "card") {
    return <SkeletonCard />;
  }

  if (type === "stat") {
    return <SkeletonStat />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-solo-gradient">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingSkeleton;