import React from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  articleId: string
}

export default function ShareButtons({ title, url, articleId }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(`Check out this article: "${title}"`)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    bluesky: `https://bsky.app/intent/compose?text=${encodedText}%20${encodedUrl}`,
  }

  return (
    <div className="flex gap-2 items-center justify-center py-3 border-y border-gray-100">
      <span className="text-xs font-semibold text-gray-600">Share:</span>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded hover:bg-blue-200 transition-colors"
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        𝕏
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded hover:bg-blue-800 transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        in
      </a>

      <a
        href={shareLinks.bluesky}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded hover:bg-sky-200 transition-colors"
        title="Share on Bluesky"
        aria-label="Share on Bluesky"
      >
        🦋
      </a>
    </div>
  )
}
