import { Request, Response, Router } from 'express';
import { fetchNews } from '../services/newsService.js';

const router = Router();

router.get('/news', async (req: Request, res: Response) => {
  try {
    const { category = 'tmt', legacyWeight = 50 } = req.query;
    
    const categoryStr = String(category);
    const weightNum = Math.min(100, Math.max(0, parseInt(String(legacyWeight)) || 50));

    const articles = await fetchNews(categoryStr, weightNum);

    res.json({
      success: true,
      data: articles,
      count: articles.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news',
    });
  }
});

export default router;
