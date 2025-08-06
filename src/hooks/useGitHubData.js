import { useState, useEffect } from 'react';
import { fetchGitHubUser } from '@/lib/fetchGitHubUser';
import { fetchRepos } from '@/lib/fetchRepos';
import { fetchLanguages } from '@/lib/fetchLanguages';

/**
 * Custom hook for fetching and managing GitHub user data
 * @param {string} username - GitHub username
 * @returns {Object} Hook state and data
 */
export const useGitHubData = (username) => {
  const [data, setData] = useState({
    user: null,
    repos: null,
    languages: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setData({ user: null, repos: null, languages: null });
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        const [userData, reposData, languagesData] = await Promise.all([
          fetchGitHubUser(username),
          fetchRepos(username),
          fetchLanguages(username),
        ]);

        setData({
          user: userData,
          repos: reposData,
          languages: languagesData,
        });
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message || 'Failed to fetch GitHub data');
        setData({ user: null, repos: null, languages: null });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const refetch = () => {
    if (username) {
      setData({ user: null, repos: null, languages: null });
      setError(null);
      // Re-trigger the effect
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const [userData, reposData, languagesData] = await Promise.all([
            fetchGitHubUser(username),
            fetchRepos(username),
            fetchLanguages(username),
          ]);

          setData({
            user: userData,
            repos: reposData,
            languages: languagesData,
          });
        } catch (err) {
          console.error('Error fetching GitHub data:', err);
          setError(err.message || 'Failed to fetch GitHub data');
          setData({ user: null, repos: null, languages: null });
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
    hasData: !!(data.user && data.repos && data.languages),
  };
};