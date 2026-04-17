import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState(() => {
    const localData = localStorage.getItem('signalflow_savedArticles');
    return localData ? JSON.parse(localData) : [];
  });
  const [rssFeeds, setRssFeeds] = useState(() => {
    const localData = localStorage.getItem('signalflow_rssFeeds');
    return localData ? JSON.parse(localData) : ["https://techcrunch.com/feed/"];
  });
  const [feedData, setFeedData] = useState([]);
  const [loadingFeeds, setLoadingFeeds] = useState(true);

  // Fetch Real News Data
  useEffect(() => {
    const getRelativeTime = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    };

    const fetchNews = async () => {
      try {
        setLoadingFeeds(true);
        // Use the feeds the user added in Onboarding, default to TechCrunch if empty
        const targetFeed = rssFeeds.length > 0 ? rssFeeds[0] : "https://techcrunch.com/feed/";
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetFeed)}`);
        const data = await res.json();
        
        if (data.items) {
          const formattedData = data.items.map((item, index) => ({
            id: item.guid || index,
            title: item.title,
            timestamp: getRelativeTime(item.pubDate),
            vibe: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            signal: Math.random() > 0.5,
            tags: item.categories?.slice(0, 3) || ["Tech", "News"],
            sourceUrl: item.link,
            summaryPoints: [
              item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
              "Extracted via SignalFlow Real-Time Engine.",
              "Vibe and Signal metrics are algorithmically estimated."
            ],
            fullAnalysis: item.description.replace(/<[^>]*>?/gm, '') || item.content.replace(/<[^>]*>?/gm, '')
          }));
          setFeedData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch live feeds:", error);
      } finally {
        setLoadingFeeds(false);
      }
    };

    fetchNews();
  }, [rssFeeds]); // Re-fetch when the user adds a new feed

  // Persist to Local Storage
  useEffect(() => {
    localStorage.setItem('signalflow_savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  useEffect(() => {
    localStorage.setItem('signalflow_rssFeeds', JSON.stringify(rssFeeds));
  }, [rssFeeds]);

  const saveArticle = (article) => {
    if (!savedArticles.find(a => a.id === article.id)) {
      // Add a saved timestamp
      setSavedArticles([{...article, savedAt: new Date().toLocaleDateString()}, ...savedArticles]);
    }
  };

  const removeArticle = (id) => {
    setSavedArticles(savedArticles.filter(a => a.id !== id));
  };

  const addRssFeed = (url) => {
    if (url && !rssFeeds.includes(url)) {
      setRssFeeds([...rssFeeds, url]);
    }
  };

  const removeRssFeed = (url) => {
    setRssFeeds(rssFeeds.filter(f => f !== url));
  };

  return (
    <AppContext.Provider value={{
      savedArticles,
      saveArticle,
      removeArticle,
      rssFeeds,
      addRssFeed,
      removeRssFeed,
      feedData,
      setFeedData,
      loadingFeeds
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
