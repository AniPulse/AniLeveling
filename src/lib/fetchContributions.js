/**
 * Fetch GitHub user contributions using GraphQL API
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Contribution statistics
 */
export const fetchContributions = async (username) => {
  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${data.errors.map(e => e.message).join(', ')}`);
    }

    const user = data.data.user;
    const contributionCalendar = user.contributionsCollection.contributionCalendar;
    
    // Process contribution data
    const contributionDays = [];
    const monthlyContributions = {};
    
    contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        contributionDays.push({
          date: day.date,
          count: day.contributionCount,
        });
        
        const month = day.date.substring(0, 7); // YYYY-MM format
        monthlyContributions[month] = (monthlyContributions[month] || 0) + day.contributionCount;
      });
    });

    // Calculate streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    const sortedDays = contributionDays.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedDays.length; i++) {
      const day = sortedDays[i];
      if (day.count > 0) {
        tempStreak++;
        if (i === 0 || new Date(today) - new Date(day.date) <= 24 * 60 * 60 * 1000) {
          currentStreak = tempStreak;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return {
      totalContributions: contributionCalendar.totalContributions,
      contributionDays,
      monthlyContributions,
      repositoriesContributedTo: user.repositoriesContributedTo.totalCount,
      currentStreak,
      longestStreak,
    };
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
};