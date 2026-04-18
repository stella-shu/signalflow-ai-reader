import { useState } from 'react';
import { useAppContext } from '../AppContext';
import { ReadingDrawer } from '../components/ReadingDrawer';

export default function SmartArchive() {
  const { savedArticles } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All Saved");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleReveal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("End of archive reached.");
    }, 800);
  };

  const filters = ["All Saved", "Deep Dives", "High Signal", "Tech", "Culture"];

  // Filter saved articles if needed based on activeFilter
  const displayedArticles = savedArticles.filter(article => {
    if (activeFilter === "All Saved") return true;
    if (activeFilter === "High Signal" && article.signal) return true;
    if (article.tags && article.tags.includes(activeFilter)) return true;
    return false;
  });

  return (
    <>
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-16 pb-32 md:ml-80 pt-24 md:pt-16 max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">Smart Archive</h1>
          <p className="font-body text-on-surface-variant text-base max-w-2xl leading-relaxed">
            Your persistent knowledge base. Signals you've saved, automatically categorized by the AI for future retrieval.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 hide-scrollbar overflow-x-auto pb-4">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-label text-sm whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
                activeFilter === filter 
                  ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary font-medium shadow-[0_4px_16px_rgba(78,222,163,0.15)] scale-105'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {displayedArticles.length === 0 ? (
          <div className="text-center py-24 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">archive</span>
            <h3 className="font-headline text-2xl text-on-surface mb-2">No Signals Here</h3>
            <p className="font-body text-on-surface-variant max-w-md mx-auto">
              Your archive is currently empty for this filter. Read articles in the Feed and click the Bookmark icon to save them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map(article => (
              <article key={article.id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors group flex flex-col h-full relative overflow-hidden">
                {article.signal && <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full pointer-events-none"></div>}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    {article.signal && <span className="bg-primary/20 text-primary px-2 py-1 rounded text-[10px] font-label uppercase tracking-wider font-bold">High Signal</span>}
                    {article.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded text-[10px] font-label uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); showToast("Options menu coming soon."); }} 
                    className="text-primary hover:text-primary-container transition-colors p-2 -mr-2 -mt-2 z-10"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>more_horiz</span>
                  </button>
                </div>
                
                <h3 className="font-headline text-xl text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant line-clamp-3 mb-6 flex-grow">
                  {article.summaryPoints?.[0] || article.fullAnalysis}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant/10">
                  <span className="font-label text-xs text-on-surface-variant opacity-70">Saved {article.savedAt}</span>
                  <button onClick={() => setActiveArticle(article)} className="text-primary hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {displayedArticles.length > 0 && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={handleReveal}
              disabled={loading}
              className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)] flex items-center gap-2"
            >
              {loading ? (
                <><span className="material-symbols-outlined animate-spin text-[16px]">sync</span> Loading...</>
              ) : (
                <>Reveal deeper layers <span className="material-symbols-outlined text-[16px]">south</span></>
              )}
            </button>
          </div>
        )}
      </main>

      <div className={`fixed bottom-24 right-8 transform transition-all duration-300 ease-out bg-surface-container-highest text-on-surface px-6 py-4 rounded-lg shadow-lg font-label font-medium flex items-center gap-3 z-50 ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
        <span>{toastMsg}</span>
      </div>

      <ReadingDrawer 
        article={activeArticle} 
        isOpen={!!activeArticle} 
        onClose={() => setActiveArticle(null)} 
      />
    </>
  );
}
