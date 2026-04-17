import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

export default function Onboarding() {
  const [selectedInterests, setSelectedInterests] = useState(["AI", "Web3"]);
  const [urlInput, setUrlInput] = useState("");
  const [addState, setAddState] = useState("Add");
  const { rssFeeds, addRssFeed, removeRssFeed } = useAppContext();
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      let finalUrl = urlInput.trim();
      
      // Smart Resolver: Attempt to convert normal URLs into RSS feeds for the MVP
      if (!finalUrl.includes('rss') && !finalUrl.includes('xml') && !finalUrl.includes('feed')) {
        try {
          const urlObj = new URL(finalUrl.startsWith('http') ? finalUrl : `https://${finalUrl}`);
          if (urlObj.hostname.includes('theverge.com')) finalUrl = 'https://www.theverge.com/rss/index.xml';
          else if (urlObj.hostname.includes('techcrunch.com')) finalUrl = 'https://techcrunch.com/feed/';
          else if (urlObj.hostname.includes('wired.com')) finalUrl = 'https://www.wired.com/feed/rss';
          else if (urlObj.hostname.includes('nytimes.com')) finalUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';
          else finalUrl = urlObj.origin + '/feed/'; // Standard WordPress fallback
        } catch(e) {
          console.error("Invalid URL format");
        }
      }

      addRssFeed(finalUrl);
      setAddState("Added!");
      setTimeout(() => {
        setUrlInput("");
        setAddState("Add");
      }, 1500);
    }
  };

  const interests = ["AI", "Privacy", "Web3", "Space", "Philosophy", "Architecture", "Neuroscience", "Deep Tech"];

  return (
    <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-32 px-6 md:px-12 max-w-4xl mx-auto w-full md:ml-80">
      <div className="text-left w-full mb-16 md:mb-24">
        <h2 className="font-headline text-5xl md:text-7xl font-medium tracking-tight mb-4 text-on-surface">Welcome to your signal.</h2>
        <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
          Curate your focus. Select the topics that matter. Silence the noise.
        </p>
      </div>

      <div className="w-full mb-16">
        <h3 className="font-headline text-2xl text-on-surface mb-8">Curate Your Feed</h3>
        <div className="flex flex-wrap gap-4">
          {interests.map(interest => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <button 
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`font-label text-sm px-6 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isSelected ? 'bg-primary-container text-on-primary-container hover:opacity-90 flex items-center gap-2 shadow-[0_4px_24px_rgba(0,0,0,0.1)]' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
              >
                {interest}
                {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full bg-surface-container-lowest p-8 md:p-12 rounded-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <h3 className="font-headline text-2xl text-on-surface mb-2">Connect your world</h3>
            <p className="font-body text-on-surface-variant text-sm">Paste a standard news website or RSS feed URL. The AI will automatically discover the data pipe.</p>
          </div>
          <div className="w-full md:w-[400px]">
            <div className="relative group mb-4">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-10">link</span>
              <input 
                type="text" 
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddUrl()}
                placeholder="https://theverge.com" 
                className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 border border-transparent group-focus-within:border-primary/40 rounded-lg py-4 pl-12 pr-4 font-body text-sm outline-none transition-all duration-300" 
              />
              <button 
                onClick={handleAddUrl}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded font-label text-xs transition-colors ${addState === 'Added!' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest hover:bg-surface-variant text-on-surface'}`}
              >
                {addState}
              </button>
            </div>
            
            {/* Added Feeds Display */}
            {rssFeeds.length > 0 && (
              <div className="flex flex-col gap-2">
                {rssFeeds.map((feed, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-surface-container-high px-4 py-2.5 rounded-md border border-outline-variant/10">
                    <span className="text-sm font-body text-on-surface truncate pr-4">{feed}</span>
                    <button onClick={() => removeRssFeed(feed)} className="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end mt-12 border-t-0 border-outline-variant/15 pt-8">
        <button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-base font-semibold px-10 py-4 rounded-lg flex items-center gap-3 transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(78,222,163,0.2)]"
        >
          Continue
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </main>
  );
}
