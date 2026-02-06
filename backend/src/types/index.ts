// Placeholder for backend types
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  source: string;
  published_at: string;
  category?: string;
  media_age?: 'legacy' | 'new_age';
}

export interface NewsResponse {
  articles: Article[];
  total_results: number;
}

export interface FilterOptions {
  category: string;
  legacyWeight: number; // 0-100, where 0 is all new age, 100 is all legacy
}
