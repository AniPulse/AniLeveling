/**
 * Fetch GitHub user profile data
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User profile data
 */
export const fetchGitHubUser = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      login: data.login,
      name: data.name || data.login,
      avatar_url: data.avatar_url,
      bio: data.bio,
      company: data.company,
      location: data.location,
      email: data.email,
      blog: data.blog,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
};