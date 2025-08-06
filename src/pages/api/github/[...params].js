import { fetchGitHubUser } from '@/lib/fetchGitHubUser';
import { fetchRepos } from '@/lib/fetchRepos';
import { fetchLanguages } from '@/lib/fetchLanguages';
import { fetchContributions } from '@/lib/fetchContributions';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { params } = req.query;
  
  if (!params || params.length === 0) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const [type, username] = params;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    let data;

    switch (type) {
      case 'user':
        data = await fetchGitHubUser(username);
        break;
      
      case 'repos':
        data = await fetchRepos(username);
        break;
      
      case 'languages':
        data = await fetchLanguages(username);
        break;
      
      case 'contributions':
        data = await fetchContributions(username);
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid API endpoint' });
    }

    // Cache the response for 5 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching ${type} for ${username}:`, error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.status(500).json({ 
      error: 'Failed to fetch data',
      message: error.message 
    });
  }
}
