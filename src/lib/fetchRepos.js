/**
 * Fetch GitHub user repositories and calculate statistics
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Repository statistics
 */
export const fetchRepos = async (username) => {
  try {
    const allRepos = [];
    let page = 1;
    const perPage = 100;

    // Fetch all repositories (paginated)
    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();
      
      if (repos.length === 0) break;
      
      allRepos.push(...repos);
      
      if (repos.length < perPage) break;
      
      page++;
    }

    // Calculate statistics
    let totalStars = 0;
    let totalForks = 0;
    let totalWatchers = 0;
    const languages = {};
    const topRepos = [];

    allRepos.forEach(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      totalWatchers += repo.watchers_count;

      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }

      topRepos.push({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        updated_at: repo.updated_at,
      });
    });

    // Sort top repositories by stars
    topRepos.sort((a, b) => b.stars - a.stars);

    return {
      totalRepos: allRepos.length,
      totalStars,
      totalForks,
      totalWatchers,
      languages,
      topRepos: topRepos.slice(0, 10), // Top 10 repositories
      allRepos: allRepos.map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      })),
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};