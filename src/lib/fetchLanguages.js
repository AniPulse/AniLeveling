/**
 * Fetch and analyze programming languages from user repositories
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Language statistics
 */
export const fetchLanguages = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const languageStats = {};
    const languageBytes = {};
    
    // Fetch language data for each repository
    const languagePromises = repos.map(async (repo) => {
      if (repo.size > 0) { // Only fetch for non-empty repos
        try {
          const langResponse = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });
          
          if (langResponse.ok) {
            const languages = await langResponse.json();
            return { repoName: repo.name, languages };
          }
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error);
        }
      }
      return null;
    });

    const languageResults = await Promise.all(languagePromises);
    
    // Process language data
    languageResults.forEach(result => {
      if (result && result.languages) {
        Object.entries(result.languages).forEach(([language, bytes]) => {
          languageBytes[language] = (languageBytes[language] || 0) + bytes;
          languageStats[language] = (languageStats[language] || 0) + 1;
        });
      }
    });

    // Calculate percentages
    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);
    const languagePercentages = {};
    
    Object.entries(languageBytes).forEach(([language, bytes]) => {
      languagePercentages[language] = ((bytes / totalBytes) * 100).toFixed(2);
    });

    // Sort languages by bytes
    const sortedLanguages = Object.entries(languageBytes)
      .sort(([, a], [, b]) => b - a)
      .map(([language, bytes]) => ({
        name: language,
        bytes,
        percentage: languagePercentages[language],
        repos: languageStats[language],
      }));

    return {
      totalLanguages: Object.keys(languageStats).length,
      languageStats,
      languageBytes,
      languagePercentages,
      sortedLanguages,
      topLanguages: sortedLanguages.slice(0, 10),
    };
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};