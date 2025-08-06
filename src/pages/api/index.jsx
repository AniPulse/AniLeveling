'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Search, Github, Zap, TrendingUp, Users, Star } from 'lucide-react';
import Head from 'next/head';
import { siteConfig } from '@/config/site';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      await router.push(`/stats?username=${encodeURIComponent(username.trim())}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Deep insights into your GitHub activity and performance metrics.',
      color: 'purple',
    },
    {
      icon: Users,
      title: 'Contribution Tracking',
      description: 'Track your contributions across repositories and time periods.',
      color: 'blue',
    },
    {
      icon: Star,
      title: 'Repository Insights',
      description: 'Analyze your repositories, languages, and project statistics.',
      color: 'green',
    },
  ];

  const examples = ['octocat', 'torvalds', 'gaearon', 'sindresorhus', 'addyosmani'];

  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords.join(', ')} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
      </Head>

      <div className="min-h-screen bg-solo-gradient relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-glow mr-4"
                >
                  <Zap size={40} className="text-white" />
                </motion.div>
                <div className="text-left">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                    Shadow Stats
                  </h1>
                  <p className="text-purple-400 text-lg font-medium">GitHub Analytics Dashboard</p>
                </div>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
              >
                Unleash the power of your GitHub profile with{' '}
                <span className="text-purple-400 font-semibold">Solo Leveling</span>-inspired analytics.
                Track your coding journey, visualize your progress, and level up your development game.
              </motion.p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md mx-auto mb-12"
            >
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter GitHub username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="
                      w-full pl-12 pr-4 py-4 
                      bg-gray-900/50 border border-gray-700 
                      rounded-xl text-white placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                      backdrop-blur-sm transition-all duration-300
                    "
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!username.trim() || isLoading}
                  className="
                    w-full mt-4 px-8 py-4
                    bg-gradient-to-r from-purple-600 to-purple-800
                    hover:from-purple-700 hover:to-purple-900
                    disabled:from-gray-600 disabled:to-gray-700
                    text-white font-semibold rounded-xl
                    shadow-glow hover:shadow-glow-lg
                    transition-all duration-300
                    flex items-center justify-center space-x-2
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Search size={20} />
                      <span>Analyze Profile</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Example usernames */}
              <div className="mt-6">
                <p className="text-gray-400 text-sm mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {examples.map((example, index) => (
                    <motion.button
                      key={example}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUsername(example)}
                      className="
                        px-3 py-1 text-sm
                        bg-gray-800/50 hover:bg-gray-700/50
                        text-gray-300 hover:text-white
                        border border-gray-700 hover:border-gray-600
                        rounded-lg transition-all duration-200
                      "
                    >
                      {example}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="
                  bg-card-gradient border border-gray-700 rounded-xl p-6
                  hover:shadow-glow hover:scale-105 transition-all duration-300
                  group cursor-pointer
                "
              >
                <div className={`
                  w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                  ${feature.color === 'purple' ? 'bg-purple-600/20 text-purple-400' : ''}
                  ${feature.color === 'blue' ? 'bg-blue-600/20 text-blue-400' : ''}
                  ${feature.color === 'green' ? 'bg-green-600/20 text-green-400' : ''}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <feature.icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}