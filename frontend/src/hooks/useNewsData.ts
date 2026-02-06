import { useState, useEffect } from 'react'
import axios from 'axios'

interface Article {
  id: string
  title: string
  description: string
  image: string
  source: string
  url: string
  published_at: string
  category?: string
}

interface UseNewsDataReturn {
  articles: Article[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  lastRefreshTime: Date | null
}

export function useNewsData(category: string, legacyWeight: number): UseNewsDataReturn {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null)

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('/api/news', {
        params: {
          category,
          legacyWeight,
        },
      })

      if (response.data.success) {
        setArticles(response.data.data)
        setLastRefreshTime(new Date())
      } else {
        setError(response.data.error || 'Failed to fetch articles')
      }
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : 'Failed to fetch articles'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchArticles()
  }, [category, legacyWeight])

  return {
    articles,
    loading,
    error,
    refresh: fetchArticles,
    lastRefreshTime,
  }
}
