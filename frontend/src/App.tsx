import React, { useState, useEffect } from 'react'
import { useNewsData } from './hooks/useNewsData'
import ArticleList from './components/ArticleList'
import { formatDistanceToNow } from 'date-fns'

interface VoteState {
  [articleId: string]: {
    upvotes: number
    downvotes: number
  }
}

export default function App() {
  const [category, setCategory] = useState('tmt')
  const [legacyWeight, setLegacyWeight] = useState(50)
  const [votes, setVotes] = useState<VoteState>({})
  const [removedArticles, setRemovedArticles] = useState<Set<string>>(new Set())
  const { articles, loading, error, refresh, lastRefreshTime } = useNewsData(category, legacyWeight)

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('articleVotes')
    const savedRemoved = localStorage.getItem('removedArticles')

    if (savedVotes) {
      setVotes(JSON.parse(savedVotes))
    }
    if (savedRemoved) {
      setRemovedArticles(new Set(JSON.parse(savedRemoved)))
    }
  }, [])

  // Save votes to localStorage
  useEffect(() => {
    localStorage.setItem('articleVotes', JSON.stringify(votes))
  }, [votes])

  // Save removed articles to localStorage
  useEffect(() => {
    localStorage.setItem('removedArticles', JSON.stringify(Array.from(removedArticles)))
  }, [removedArticles])

  const handleUpvote = (id: string) => {
    setVotes((prev) => ({
      ...prev,
      [id]: {
        upvotes: (prev[id]?.upvotes || 0) + 1,
        downvotes: prev[id]?.downvotes || 0,
      },
    }))
  }

  const handleDownvote = (id: string) => {
    setVotes((prev) => ({
      ...prev,
      [id]: {
        upvotes: prev[id]?.upvotes || 0,
        downvotes: (prev[id]?.downvotes || 0) + 1,
      },
    }))
  }

  const handleRemove = (id: string) => {
    setRemovedArticles((prev) => new Set([...prev, id]))
  }

  // Filter articles by removal and sort by upvotes
  const filteredArticles = articles
    .filter((article) => !removedArticles.has(article.id))
    .sort((a, b) => {
      const aVotes = votes[a.id]?.upvotes || 0
      const bVotes = votes[b.id]?.upvotes || 0
      return bVotes - aVotes
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">📰 Tech News</h1>
              <p className="text-sm text-gray-600 mt-1">Latest news from top tech publications</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={refresh}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {/* Last Refresh Time */}
          {lastRefreshTime && (
            <p className="text-xs text-gray-500 mt-3">
              Last refreshed: {formatDistanceToNow(lastRefreshTime, { addSuffix: true })}
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Filters Panel */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📂 Industry Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tmt">🌐 TMT (Tech/Media/Telecom)</option>
                <option value="fintech">💰 Fintech</option>
                <option value="healthcare">🏥 Healthcare</option>
                <option value="manufacturing">🏭 Manufacturing</option>
                <option value="retail">🛍️ Retail</option>
                <option value="media">📺 Media</option>
                <option value="automotive">🚗 Automotive</option>
                <option value="energy">⚡ Energy</option>
              </select>
            </div>

            {/* Media Age Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎭 Media Balance: {legacyWeight < 35 ? 'New Age' : legacyWeight > 65 ? 'Legacy' : 'Balanced'}
              </label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-600 min-w-fit">📰 Legacy</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={legacyWeight}
                  onChange={(e) => setLegacyWeight(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-600 min-w-fit">New Age 🚀</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">{legacyWeight}% Legacy / {100 - legacyWeight}% New Age</p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <ArticleList
          articles={filteredArticles}
          loading={loading}
          error={error}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onRemove={handleRemove}
          votes={votes}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>Powered by NewsAPI.org | No paywalled content | {filteredArticles.length} articles currently displayed</p>
        </div>
      </footer>
    </div>
  )
}
