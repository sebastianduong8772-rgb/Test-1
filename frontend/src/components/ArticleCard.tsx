import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import ShareButtons from './ShareButtons'

interface ArticleProps {
  id: string
  title: string
  description: string
  image: string
  source: string
  url: string
  published_at: string
  onUpvote?: (id: string) => void
  onDownvote?: (id: string) => void
  onRemove?: (id: string) => void
  upvotes?: number
  downvotes?: number
}

export default function ArticleCard({
  id,
  title,
  description,
  image,
  source,
  url,
  published_at,
  onUpvote,
  onDownvote,
  onRemove,
  upvotes = 0,
  downvotes = 0,
}: ArticleProps) {
  const publishedDate = new Date(published_at)
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      {/* Article Image */}
      {image && (
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Source & Time */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {source}
          </span>
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">{description}</p>

        {/* Vote Stats */}
        <div className="flex items-center gap-4 mb-3 py-2 border-t border-gray-100">
          <span className="text-xs text-green-600 font-semibold">
            👍 {upvotes}
          </span>
          <span className="text-xs text-red-600 font-semibold">
            👎 {downvotes}
          </span>
        </div>

        {/* Share Buttons */}
        <ShareButtons title={title} url={url} articleId={id} />

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onUpvote?.(id)}
            className="flex-1 px-3 py-2 bg-green-100 text-green-700 text-sm font-medium rounded hover:bg-green-200 transition-colors"
            title="Upvote this article"
          >
            👍 Upvote
          </button>
          <button
            onClick={() => onDownvote?.(id)}
            className="flex-1 px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded hover:bg-red-200 transition-colors"
            title="Downvote this article"
          >
            👎 Downvote
          </button>
          <button
            onClick={() => onRemove?.(id)}
            className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
            title="Remove from view"
          >
            ✕ Remove
          </button>
        </div>

        {/* Read Full Article Link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs text-blue-600 font-semibold hover:underline mt-3"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  )
}
