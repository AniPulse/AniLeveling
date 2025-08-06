'use client';

import { motion } from 'framer-motion';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = "purple", 
  gradient = false,
  delay = 0 
}) => {
  const colorClasses = {
    purple: "text-purple-400 border-purple-500/30",
    blue: "text-blue-400 border-blue-500/30",
    green: "text-green-400 border-green-500/30",
    yellow: "text-yellow-400 border-yellow-500/30",
    red: "text-red-400 border-red-500/30",
  };

  const gradientClasses = {
    purple: "from-purple-600/20 to-purple-800/20",
    blue: "from-blue-600/20 to-blue-800/20",
    green: "from-green-600/20 to-green-800/20",
    yellow: "from-yellow-600/20 to-yellow-800/20",
    red: "from-red-600/20 to-red-800/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      className={`
        relative overflow-hidden
        ${gradient 
          ? `bg-gradient-to-br ${gradientClasses[color]}` 
          : 'bg-card-gradient'
        }
        border ${colorClasses[color]}
        rounded-xl p-6 shadow-card
        hover:shadow-glow hover:scale-105
        transition-all duration-300
        group cursor-pointer
      `}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gray-800/50 ${colorClasses[color].split(' ')[0]}`}>
            {Icon && <Icon size={24} />}
          </div>
          <div className="text-right">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3, type: "spring" }}
              className={`text-2xl font-bold ${colorClasses[color].split(' ')[0]}`}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </motion.div>
          </div>
        </div>
        
        <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        
        {/* Glow effect on hover */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20
          bg-gradient-to-r ${gradientClasses[color]}
          transition-opacity duration-300
        `}></div>
      </div>
    </motion.div>
  );
};

export default StatCard;