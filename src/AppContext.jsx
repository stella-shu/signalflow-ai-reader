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

    const analyzeContent = (text) => {
      if (!text) return { vibe: 'Medium', signal: false, summaryPoints: ["No summary available."] };
      const content = text.toLowerCase();
      const highSignalKeywords = ['launch', 'announce', 'release', 'breakthrough', 'funding', 'acquire', 'new', 'update', 'invest', 'ai'];
      const lowSignalKeywords = ['rumor', 'opinion', 'review', 'guide', 'best', 'deals', 'gossip'];
      
      let signalScore = 0;
      highSignalKeywords.forEach(kw => { if (content.includes(kw)) signalScore++; });
      lowSignalKeywords.forEach(kw => { if (content.includes(kw)) signalScore--; });

      let vibe = 'Medium';
      let signal = false;
      
      if (signalScore >= 1) {
        vibe = 'High';
        signal = true;
      } else if (signalScore < 0) {
        vibe = 'Low';
      }

      // Extract actual points
      const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 15).slice(0, 3);
      const summaryPoints = sentences.length > 0 ? sentences.map(s => s.trim()) : [text.substring(0, 100) + '...'];

      return { vibe, signal, summaryPoints };
    };

    const fetchNews = async () => {
      try {
        setLoadingFeeds(true);
        // Use the feeds the user added in Onboarding, default to TechCrunch if empty
        const targetFeed = rssFeeds.length > 0 ? rssFeeds[0] : "https://techcrunch.com/feed/";
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetFeed)}`);
        const data = await res.json();
        
        if (data.items) {
          const formattedData = data.items.map((item, index) => {
            const rawContent = item.description || item.content || '';
            const cleanContent = rawContent.replace(/<[^>]*>?/gm, '');
            const analysis = analyzeContent(cleanContent);
            
            return {
              id: item.guid || index,
              title: item.title,
              timestamp: getRelativeTime(item.pubDate),
              vibe: analysis.vibe,
              signal: analysis.signal,
              tags: item.categories?.slice(0, 3) || ["Tech"],
              sourceUrl: item.link,
              summaryPoints: analysis.summaryPoints,
              fullAnalysis: cleanContent
            };
          });
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
