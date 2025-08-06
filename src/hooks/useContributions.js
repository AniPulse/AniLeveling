import { useState, useEffect } from 'react';
import { fetchContributions } from '@/lib/fetchContributions';

/**
 * Custom hook for fetching and managing GitHub contributions data
 * @param {string} username - GitHub username
 * @returns {Object} Hook state and data
 */
export const useContributions = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const contributionsData = await fetchContributions(username);
        setData(contributionsData);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err.message || 'Failed to fetch contributions data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const refetch = () => {
    if (username) {
      setData(null);
      setError(null);
      
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const contributionsData = await fetchContributions(username);
          setData(contributionsData);
        } catch (err) {
          console.error('Error fetching contributions:', err);
          setError(err.message || 'Failed to fetch contributions data');
          setData(null);
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
    hasData: !!data,
  };
};