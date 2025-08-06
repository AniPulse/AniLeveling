'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Users, 
  GitBranch, 
  Star, 
  Eye, 
  Calendar,
  MapPin,
  Building,
  Link as LinkIcon,
  Mail,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

import { useGitHubData } from '@/hooks/useGitHubData';
import { useContributions } from '@/hooks/useContributions';
import StatCard from '@/components/ui/StatCard';
import PieChartCard from '@/components/charts/PieChartCard';
import BarChartCard from '@/components/charts/BarChartCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import ErrorAlert, { FullScreenError } from '@/components/ui/ErrorAlert';
import { siteConfig } from '@/config/site';

export default function Stats() {
  const router = useRouter();
  const { username } = router.query;
  const [mounted, setMounted] = useState(false);

  const { data: githubData, loading: githubLoading, error: githubError, refetch: refetchGithub } = useGitHubData(username);
  const { data: contributionsData, loading: contributionsLoading, error: contributionsError, refetch: refetchContributions } = useContributions(username);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = githubLoading || contributionsLoading;
  const hasError = githubError || contributionsError;
  const error = githubError || contributionsError;

  const handleRetry = () => {
    refetchGithub();
    refetchContributions();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Show loading state
  if (isLoading && !githubData?.user) {
    return <LoadingSkeleton type="dashboard" />;
  }

  // Show error state
  if (hasError && !githubData?.user) {
    return (
      <FullScreenError
        title="Failed to Load Profile"
        message={error}
        onRetry={handleRetry}
        onHome={handleGoHome}
      />
    );
  }

  // No data state
  if (!username) {
    return (
      <FullScreenError
        title="No Username Provided"
        message="Please provide a GitHub username to analyze."
        onHome={handleGoHome}
      />
    );
  }

  const { user, repos, languages } = githubData || {};

  // Prepare chart data
  const languageChartData = languages?.topLanguages || [];
  
  const statsChartData = [
    { name: 'Repositories', value: repos?.totalRepos || 0 },
    { name: 'Stars', value: repos?.totalStars || 0 },
    { name: 'Forks', value: repos?.totalForks || 0 },
    { name: 'Followers', value: user?.followers || 0 },
  ];

  const contributionChartData = contributionsData ? 
    Object.entries(contributionsData.monthlyContributions || {})
      .slice(-6)
      .map(([month, count]) => ({
        name: new Date(month + '-01').toLocaleDateString('en', { month: 'short' }),
        value: count,
      })) : [];

  return (
    <>
      <Head>
        <title>{user?.name || username} - {siteConfig.name}</title>
        <meta name="description" content={`GitHub statistics for ${user?.name || username}`} />
      </Head>

      <div className="min-h-screen bg-solo-gradient">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoHome}
                className="
                  flex items-center space-x-2 px-4 py-2
                  bg-gray-800/50 hover:bg-gray-700/50
                  text-gray-300 hover:text-white
                  border border-gray-700 hover:border-gray-600
                  rounded-lg transition-all duration-200
                "
              >
                <ArrowLeft size={18} />
                <span>Back to Search</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                disabled={isLoading}
                className="
                  flex items-center space-x-2 px-4 py-2
                  bg-purple-600 hover:bg-purple-700
                  disabled:bg-purple-600/50
                  text-white rounded-lg
                  transition-all duration-200
                  disabled:cursor-not-allowed
                "
              >
                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </motion.button>
            </div>

            {user && (
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="relative"
                >
                  <Image
                    src={user.avatar_url}
                    alt={user.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-purple-500/30 shadow-glow"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-glow-pulse"></div>
                </motion.div>

                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    {user.name || user.login}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg mb-3"
                  >
                    @{user.login}
                  </motion.p>

                  {user.bio && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-300 mb-4 max-w-2xl"
                    >
                      {user.bio}
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-4 text-sm text-gray-400"
                  >
                    {user.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="flex items-center space-x-1">
                        <Building size={16} />
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.blog && (
                      <a
                        href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:text-purple-400 transition-colors"
                      >
                        <LinkIcon size={16} />
                        <span>Website</span>
                      </a>
                    )}
                    {user.email && (
                      <div className="flex items-center space-x-1">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>Joined {new Date(user.created_at).toLocaleDateString('en', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Error Alert */}
          {hasError && (
            <div className="mb-8">
              <ErrorAlert
                message={error}
                onRetry={handleRetry}
                type="warning"
              />
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Repositories"
              value={repos?.totalRepos || 0}
              icon={GitBranch}
              color="purple"
              delay={0.1}
            />
            <StatCard
              title="Total Stars"
              value={repos?.totalStars || 0}
              icon={Star}
              color="yellow"
              delay={0.2}
            />
            <StatCard
              title="Followers"
              value={user?.followers || 0}
              icon={Users}
              color="blue"
              delay={0.3}
            />
            <StatCard
              title="Contributions"
              value={contributionsData?.totalContributions || 0}
              icon={Calendar}
              color="green"
              delay={0.4}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <PieChartCard 
                data={languageChartData} 
                title="Programming Languages" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <BarChartCard 
                data={statsChartData} 
                title="GitHub Statistics" 
                color="#7c3aed"
              />
            </motion.div>
          </div>

          {/* Contributions Chart */}
          {contributionChartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <BarChartCard 
                data={contributionChartData} 
                title="Recent Contributions (Last 6 Months)" 
                color="#10b981"
              />
            </motion.div>
          )}

          {/* Top Repositories */}
          {repos?.topRepos && repos.topRepos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card-gradient border border-gray-700 rounded-xl p-6 shadow-card"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Top Repositories
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.topRepos.slice(0, 6).map((repo, index) => (
                  <motion.a
                    key={repo.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block p-4 bg-gray-800/30 hover:bg-gray-800/50
                      border border-gray-700 hover:border-gray-600
                      rounded-lg transition-all duration-200
                      group
                    "
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {repo.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-400">
                        {repo.stars > 0 && (
                          <div className="flex items-center space-x-1">
                            <Star size={14} />
                            <span>{repo.stars}</span>
                          </div>
                        )}
                        {repo.forks > 0 && (
                          <div className="flex items-center space-x-1">
                            <GitBranch size={14} />
                            <span>{repo.forks}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {repo.description && (
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    
                    {repo.language && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-gray-400">{repo.language}</span>
                      </div>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}