'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = [
  '#7c3aed', // Purple
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#ec4899', // Pink
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{data.name}</p>
        <p className="text-purple-400">
          {data.value}% ({data.payload.repos} repos)
        </p>
      </div>
    );
  }
  return null;
};

const PieChartCard = ({ data, title = "Language Distribution" }) => {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card-gradient border border-gray-700 rounded-xl p-6 shadow-card"
      >
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">No language data available</p>
        </div>
      </motion.div>
    );
  }

  // Prepare data for the chart
  const chartData = data.slice(0, 8).map((lang, index) => ({
    name: lang.name,
    value: parseFloat(lang.percentage),
    repos: lang.repos,
    color: COLORS[index % COLORS.length],
  }));

  // Calculate "Others" if there are more than 8 languages
  if (data.length > 8) {
    const othersPercentage = data
      .slice(8)
      .reduce((sum, lang) => sum + parseFloat(lang.percentage), 0);
    
    const othersRepos = data
      .slice(8)
      .reduce((sum, lang) => sum + lang.repos, 0);

    if (othersPercentage > 0) {
      chartData.push({
        name: 'Others',
        value: othersPercentage,
        repos: othersRepos,
        color: '#6b7280',
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card-gradient border border-gray-700 rounded-xl p-6 shadow-card hover:shadow-glow transition-shadow duration-300"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        {title}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span className="text-gray-300 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Language list */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {chartData.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-2 text-sm"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            ></div>
            <span className="text-gray-300">{lang.name}</span>
            <span className="text-gray-500 ml-auto">{lang.value.toFixed(1)}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PieChartCard;