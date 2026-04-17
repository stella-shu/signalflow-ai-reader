import { useAppContext } from '../AppContext';

export function ReadingDrawer({ article, isOpen, onClose }) {
  const { saveArticle, savedArticles } = useAppContext();
  
  if (!isOpen || !article) return null;

  const isSaved = savedArticles.some(a => a.id === article.id);

  return (
    <>
      {/* Background Context (The Feed - blurred/darkened to show overlay) */}
      <div className="fixed inset-0 z-[60] bg-surface-dim/40 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)]"></div>
      
      {/* Overlay Backdrop */}
      <div className="fixed inset-0 z-[60] bg-black/60 transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)]" onClick={onClose}></div>
      
      {/* Reading Drawer (Slide-out panel) */}
      <div className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-2xl bg-surface-container-low shadow-[0_0_48px_rgba(12,14,18,0.6)] transform translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] flex flex-col border-l border-outline-variant/15">
        
        {/* Drawer Header */}
        <header className="flex justify-between items-center px-8 py-6 border-b border-outline-variant/15 bg-surface-container-low sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">psychology</span>
            <span className="font-label text-sm font-medium tracking-widest text-primary uppercase">AI Summary</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => saveArticle(article)}
              disabled={isSaved}
              className={`${isSaved ? 'text-primary' : 'text-on-surface-variant hover:text-primary'} transition-colors duration-300 flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
            </button>
            <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </header>

        {/* Drawer Content */}
        <main className="flex-1 overflow-y-auto px-8 py-12 space-y-12">
          {/* Article Header inside Drawer */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-on-surface-variant text-sm font-label">
              <span>12 min read</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span>Published {article.timestamp}</span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl leading-tight text-on-surface tracking-tight">
              {article.title}
            </h1>
          </div>

          {/* AI Bullet Points (The Summary) */}
          <div className="bg-surface-container-lowest p-8 rounded-xl space-y-6">
            <h2 className="font-headline text-2xl text-on-surface italic">Key Takeaways</h2>
            <ul className="space-y-5">
              {article.summaryPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                  <p className="font-body text-base leading-relaxed text-on-surface-variant">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Entities Section */}
          <div className="space-y-5">
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Extracted Entities</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag, i) => (
                <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-full border border-outline-variant/20">
                  <span className="material-symbols-outlined text-xs text-primary">label</span>
                  <span className="font-label text-sm text-on-surface">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Article Placeholder (Editorial visual break) */}
          <div className="pt-8 border-t border-outline-variant/15">
            <p className="font-body text-lg leading-loose text-on-surface-variant">
              {article.fullAnalysis}
            </p>
          </div>
        </main>

        {/* Drawer Footer */}
        <footer className="p-6 border-t border-outline-variant/15 bg-surface-container-low flex justify-between items-center z-30">
          <a 
            href={article.sourceUrl || "https://news.google.com"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-label text-sm text-primary hover:text-primary-container transition-colors duration-300 flex items-center gap-2 group"
          >
            <span>View Full Source Article</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
          {article.signal && (
            <div className="text-xs text-on-surface-variant font-label flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">verified</span>
              High Signal Confidence
            </div>
          )}
        </footer>
      </div>
    </>
  );
}
