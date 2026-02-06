# Tech News Webapp

A real-time tech news aggregator with industry filtering, media source balance control, and social sharing.

## Features

- Latest tech news from top reputed publications (up to 25 articles per request)
- Industry filtering (fintech, healthcare, media, TMT, manufacturing, retail, etc.)
- Legacy vs new age media balance slider
- Article upvoting/downvoting/removal with sorting
- Social sharing (Twitter, LinkedIn, Bluesky)
- Auto-refresh every hour with manual refresh button
- No paywalled content

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **News API:** NewsAPI.org
- **Storage:** Browser LocalStorage

## Setup

### Prerequisites

- Node.js v18+
- npm or yarn
- NewsAPI.org API key (get free at https://newsapi.org)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd test-1

# Backend setup
cd backend
npm install
cp .env.example .env
# Add your NEWS_API_KEY to .env

# Frontend setup
cd ../frontend
npm install
```

### Running

**Terminal 1 - Backend (port 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (port 5173):**
```bash
cd frontend
npm run dev
```

Visit http://localhost:5173 in your browser.

## Project Structure

```
backend/
  src/
    server.ts
    routes/
    services/
    types/
  package.json
  tsconfig.json

frontend/
  src/
    components/
    hooks/
    context/
    App.tsx
    main.tsx
  package.json
  vite.config.ts
```

## Development Branches

- `main` - Production-ready code
- `phase-1-setup` - Initial project scaffolding
- `phase-2-backend-ui` - Backend API + Core UI components
- `phase-3-filters-interact` - Filtering logic + User interactions
- `phase-4-final` - Auto-refresh + Polish + Testing
