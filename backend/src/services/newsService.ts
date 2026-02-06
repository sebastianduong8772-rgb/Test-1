import axios from 'axios';
import { Article, NewsResponse } from '../types/index.js';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE = 'https://newsapi.org/v2';

// Map of industry keywords for NewsAPI searches
const categoryKeywords: Record<string, string> = {
  'tmt': 'technology OR telecom OR media',
  'fintech': 'fintech OR banking OR cryptocurrency OR payments',
  'healthcare': 'healthcare OR pharma OR biotech OR medical',
  'manufacturing': 'manufacturing OR industrial OR supply chain',
  'retail': 'retail OR e-commerce OR consumer goods',
  'media': 'media OR entertainment OR publishing',
  'automotive': 'automotive OR electric vehicles OR autonomous',
  'energy': 'energy OR power OR renewable OR oil gas',
};

// Legacy media sources (established publications)
const legacySources = [
  'bbc-news',
  'cnn',
  'the-times',
  'financial-times',
  'the-wall-street-journal',
  'the-washington-post',
];

// New age media sources (digital-first)
const newAgeSources = [
  'techcrunch',
  'hacker-news',
  'the-verge',
  'wired',
  'recode',
  'ars-technica',
  'fast-company',
];

export async function fetchNews(
  category: string = 'tmt',
  legacyWeight: number = 50
): Promise<Article[]> {
  if (!NEWS_API_KEY) {
    throw new Error('NEWS_API_KEY not configured');
  }

  try {
    const query = categoryKeywords[category.toLowerCase()] || categoryKeywords['tmt'];
    
    // Fetch articles
    const response = await axios.get(`${NEWS_API_BASE}/everything`, {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 25,
        apiKey: NEWS_API_KEY,
      },
    });

    let articles: Article[] = response.data.articles.map((article: any) => ({
      id: `${article.source.id}-${article.publishedAt}`,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name,
      published_at: article.publishedAt,
      category: category,
    }));

    // Filter out paywalled content (basic check)
    articles = articles.filter(
      (article: Article) =>
        !article.description?.toLowerCase().includes('[+]') &&
        !article.description?.toLowerCase().includes('subscription')
    );

    // Apply legacy/new age media weight
    articles = applyMediaWeighting(articles, legacyWeight);

    return articles.slice(0, 25);
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    throw error;
  }
}

function applyMediaWeighting(articles: Article[], legacyWeight: number): Article[] {
  // If 50-50, return all articles unsorted by media age
  if (legacyWeight === 50) {
    return articles;
  }

  // Split articles by media type
  const legacyArticles = articles.filter((a) =>
    legacySources.some((s) => a.source.toLowerCase().includes(s.toLowerCase()))
  );

  const newAgeArticles = articles.filter((a) =>
    newAgeSources.some((s) => a.source.toLowerCase().includes(s.toLowerCase()))
  );

  const otherArticles = articles.filter(
    (a) =>
      !legacyArticles.includes(a) && !newAgeArticles.includes(a)
  );

  // Calculate split based on weight
  const totalSlots = 25;
  const legacySlots = Math.round((legacyWeight / 100) * totalSlots);
  const newAgeSlots = totalSlots - legacySlots;

  // Combine with priority to requested media type
  const result = [
    ...legacyArticles.slice(0, legacySlots),
    ...newAgeArticles.slice(0, newAgeSlots),
    ...otherArticles.slice(0, totalSlots - legacySlots - newAgeSlots),
  ];

  return result.slice(0, totalSlots);
}
