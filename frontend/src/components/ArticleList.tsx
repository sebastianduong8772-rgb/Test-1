import React from 'react'
import ArticleCard from './ArticleCard'

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

interface ArticleListProps {
  articles: Article[]
  loading: boolean
  error: string | null
  onUpvote: (id: string) => void
  onDownvote: (id: string) => void
  onRemove: (id: string) => void
  votes: Record<string, { upvotes: number; downvotes: number }>
}

export default function ArticleList({
  articles,
  loading,
  error,
  onUpvote,
  onDownvote,
  onRemove,
  votes,
}: ArticleListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading latest tech news...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-6 rounded-lg text-center">
        <p className="font-semibold mb-1">Failed to load articles</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-lg">No articles found for your preferences.</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting the filters or refresh the page.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          image={article.image}
          source={article.source}
          url={article.url}
          published_at={article.published_at}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          onRemove={onRemove}
          upvotes={votes[article.id]?.upvotes || 0}
          downvotes={votes[article.id]?.downvotes || 0}
        />
      ))}
    </div>
  )
}
