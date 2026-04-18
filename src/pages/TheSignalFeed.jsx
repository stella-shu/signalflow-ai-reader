import { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { ReadingDrawer } from '../components/ReadingDrawer';

export default function TheSignalFeed() {
  const { feedData, setFeedData, loadingFeeds } = useAppContext();
  const [activeVibe, setActiveVibe] = useState('All'); // 'All', 'Low', 'Medium', 'High'
  const [noiseFilterOn, setNoiseFilterOn] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  // Filter Logic
  const filteredFeed = feedData.filter(article => {
    if (noiseFilterOn && !article.signal) return false;
    // Optional: filter by vibe if we strictly want only 'High' when 'High' is clicked, etc.
    // Let's implement strict vibe filtering if they are selecting a vibe.
    if (activeVibe && article.vibe !== activeVibe && activeVibe !== 'All') return false;
    return true;
  });

  return (
    <>
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-16 pb-32 md:ml-80 pt-24 md:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Controls Section */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2 tracking-tight">The Signal Feed</h1>
              <p className="font-body text-on-surface-variant text-sm md:text-base">Curated intelligence, filtered for clarity.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Noise Filter Toggle */}
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
                <span className="font-label text-sm text-on-surface-variant">Noise Filter</span>
                <button 
                  onClick={() => setNoiseFilterOn(!noiseFilterOn)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface ${noiseFilterOn ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${noiseFilterOn ? 'translate-x-6 bg-on-primary' : 'translate-x-1 bg-on-surface'}`}></span>
                </button>
              </div>

              {/* Vibe Selector */}
              <div className="flex items-center bg-surface-container-high rounded-full p-1 shadow-sm">
                {['All', 'Low', 'Medium', 'High'].map(vibe => (
                  <button 
                    key={vibe}
                    onClick={() => setActiveVibe(vibe)}
                    className={`px-4 py-1.5 rounded-full font-label text-sm transition-colors ${
                      activeVibe === vibe 
                        ? 'bg-primary-container text-on-primary-container shadow-sm' 
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>

            </div>
          </section>

          {/* Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingFeeds ? (
              <div className="col-span-1 md:col-span-2 text-center py-24 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">sync</span>
                <p className="text-on-surface-variant font-label animate-pulse">Syncing real-time signals from the web...</p>
              </div>
            ) : filteredFeed.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center py-16">
                <p className="text-on-surface-variant font-label">No signals match current filters.</p>
              </div>
            ) : (
              filteredFeed.map((article, idx) => (
              <article 
                key={article.id} 
                className={`relative bg-surface-container-lowest p-8 rounded-xl group transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-surface-container-low ${idx % 2 !== 0 ? 'md:mt-12' : ''}`}
              >
                {article.signal && (
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-primary rounded-r-full"></div>
                )}
                
                <div className="pl-4 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    {article.signal ? (
                      <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full font-label text-xs tracking-wider uppercase">
                        <span className="material-symbols-outlined text-[14px]">bolt</span>
                        High Signal
                      </span>
                    ) : (
                      <span className="font-label text-xs text-on-surface-variant">Standard</span>
                    )}
                    <span className="font-label text-xs text-on-surface-variant">{article.timestamp}</span>
                  </div>
                  
                  <h2 className="font-headline text-2xl text-on-surface mb-4 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  
                  <ul className="space-y-3 mb-8">
                    {article.summaryPoints.slice(0, 2).map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-body text-on-surface-variant leading-relaxed">
                        <span className={`material-symbols-outlined text-[16px] mt-0.5 ${article.signal ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {article.signal ? 'check' : 'horizontal_rule'}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setActiveArticle(article)}
                    className="font-label text-sm text-primary flex items-center gap-2 group-hover:gap-3 transition-all mt-auto pt-4"
                  >
                    Read Full Analysis
                    <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </button>
                </div>
              </article>
            )))}
          </div>
        </div>
      </main>

      {/* Reading Drawer Modal */}
      <ReadingDrawer 
        article={activeArticle} 
        isOpen={!!activeArticle} 
        onClose={() => setActiveArticle(null)} 
      />
    </>
  );
}
