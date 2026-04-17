# SignalFlow - AI News Reader

SignalFlow is a privacy-first, locally-managed Single Page Application (SPA) designed to act as a "Silent Curator" for your internet consumption. It filters out the noise and synthesizes the most important information from your selected news sources into a beautifully designed, distraction-free environment.

## 🚀 Features

- **Live Data Streams:** Fetches real-time articles directly from the web using the RSS2JSON API.
- **Smart Resolver Onboarding:** Simply paste a standard website URL (e.g., `https://theverge.com`) and the built-in smart resolver will automatically detect and connect the underlying data pipes (RSS).
- **Persistent Smart Archive:** Bookmark articles to read later. Your vault is saved entirely in your browser's local storage—no backend databases or tracking required.
- **Simulated AI Curation:** Dynamically assigns "Vibe" and "Signal" metrics to incoming articles, extracting key takeaways into a reading drawer.
- **AI Control Center & Noise Filter:** A suite of UI tools designed to let users control the exact parameters of their feed and instantly mute unwanted keywords.
- **Responsive Dark-Mode UI:** Built with Tailwind CSS, utilizing a premium 'midnight' and 'emerald' aesthetic with glassmorphism and subtle animations.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **State Management:** React Context API + LocalStorage
- **External API:** [rss2json](https://rss2json.com/) (For bypassing CORS to fetch live RSS feeds on the frontend)

## 📁 Project Structure

```text
stitch_signalflow_ai_news_reader/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Sidebar, ReadingDrawer, MobileNav)
│   ├── pages/              # Main route views (TheSignalFeed, Onboarding, AIControlCenter, etc.)
│   ├── AppContext.jsx      # Global state (Saved articles, RSS Feeds, Live Data)
│   ├── App.jsx             # React Router configuration
│   ├── main.jsx            # React entry point
│   └── index.css           # Global Tailwind directives
├── _legacy_html/           # Original static HTML/CSS prototypes (For reference)
├── vercel.json             # Vercel configuration for SPA routing rewrites
├── tailwind.config.js      # Custom theme colors, fonts, and utilities
└── vite.config.js          # Vite build configuration
```

## 💻 Running Locally

To run this project on your local machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**. 

The included `vercel.json` ensures that all routes correctly map back to `index.html` to prevent 404 errors on page refresh, a common requirement for React Router SPAs.

To deploy from your terminal using the Vercel CLI:
```bash
npx vercel --prod
```

## 🧠 Philosophy
The internet is too loud. SignalFlow was built to demonstrate how a user interface can act as a shield, combining brutalist efficiency with highly curated content streams. The user remains in complete control of their data sources, while the AI manages the synthesis.
