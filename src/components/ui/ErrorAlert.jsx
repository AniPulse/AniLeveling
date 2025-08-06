'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';

const ErrorAlert = ({ 
  message = "Something went wrong", 
  onRetry, 
  onClose,
  type = "error" 
}) => {
  const typeStyles = {
    error: {
      bg: "bg-red-900/20 border-red-500/30",
      icon: "text-red-400",
      text: "text-red-300",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      bg: "bg-yellow-900/20 border-yellow-500/30",
      icon: "text-yellow-400",
      text: "text-yellow-300",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
    info: {
      bg: "bg-blue-900/20 border-blue-500/30",
      icon: "text-blue-400",
      text: "text-blue-300",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const styles = typeStyles[type] || typeStyles.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`
        ${styles.bg}
        border rounded-xl p-6 shadow-lg
        backdrop-blur-sm
        max-w-md mx-auto
      `}
    >
      <div className="flex items-start space-x-4">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${styles.icon} flex-shrink-0 mt-1`}
        >
          <AlertTriangle size={24} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold ${styles.text} mb-2`}>
            {type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Information'}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {message}
          </p>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 mt-4">
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className={`
                  ${styles.button}
                  text-white px-4 py-2 rounded-lg
                  text-sm font-medium
                  flex items-center space-x-2
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50
                `}
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </motion.button>
            )}

            {onClose && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="
                  bg-gray-700 hover:bg-gray-600
                  text-gray-300 px-4 py-2 rounded-lg
                  text-sm font-medium
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-gray-500/50
                "
              >
                Dismiss
              </motion.button>
            )}
          </div>
        </div>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`
              ${styles.text} hover:text-white
              flex-shrink-0 p-1 rounded-full
              hover:bg-white/10
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-white/20
            `}
          >
            <X size={20} />
          </motion.button>
        )}
      </div>

      {/* Animated border glow */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-xl border border-red-500/20 pointer-events-none"
      />
    </motion.div>
  );
};

// Full-screen error component
export const FullScreenError = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading your data.",
  onRetry,
  onHome,
}) => {
  return (
    <div className="min-h-screen bg-solo-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-6 bg-red-900/20 rounded-full flex items-center justify-center"
          >
            <AlertTriangle size={48} className="text-red-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-4"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            {message}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="
                bg-purple-600 hover:bg-purple-700
                text-white px-6 py-3 rounded-lg
                font-medium flex items-center justify-center space-x-2
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-500/50
              "
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </motion.button>
          )}

          {onHome && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHome}
              className="
                bg-gray-700 hover:bg-gray-600
                text-gray-300 px-6 py-3 rounded-lg
                font-medium
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-500/50
              "
            >
              Go Home
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Background animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl"
        />
      </div>
    </div>
  );
};

export default ErrorAlert;