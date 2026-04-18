import { useState } from 'react';

export default function SilentSignal() {
  const [keywords, setKeywords] = useState(["Elon Musk", "Kardashian", "Clickbait"]);
  const [inputVal, setInputVal] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const addKeyword = () => {
    if (inputVal.trim() && !keywords.includes(inputVal.trim())) {
      setKeywords([...keywords, inputVal.trim()]);
      setInputVal("");
    }
  };

  const removeKeyword = (kw) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const handleSave = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-16 lg:px-24 pb-32 md:ml-80 pt-24 md:pt-16">
        <div className="max-w-7xl mx-auto">
          <section className="mb-16">
            <h1 className="text-5xl font-headline text-on-surface mb-4 tracking-tight">The Noise Filter</h1>
            <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
              Aggressively curate your focus. Define the topics, keywords, and sources you wish to banish from your feed. We'll handle the silence.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
              <div className="flex justify-between items-start mb-8 pl-4">
                <h2 className="text-2xl font-headline text-on-surface">Muted Keywords</h2>
              </div>
              
              <div className="pl-4 mb-8">
                <div className="flex flex-wrap gap-3">
                  {keywords.map(kw => (
                    <span key={kw} className="bg-surface-container-high text-on-surface px-4 py-2 rounded-full font-label text-sm flex items-center gap-2">
                      {kw} 
                      <button onClick={() => removeKeyword(kw)} className="hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pl-4">
                <div className="relative max-w-md">
                  <input 
                    type="text" 
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addKeyword()}
                    placeholder="Add keyword to mute..." 
                    className="w-full bg-surface-container-low text-on-surface border border-transparent focus:border-primary/40 rounded-lg py-3 pl-4 pr-20 font-body text-sm outline-none transition-all"
                  />
                  <button onClick={addKeyword} className="absolute right-2 top-1/2 -translate-y-1/2 text-primary font-label text-sm font-bold hover:text-primary-container px-3 py-1 transition-colors">ADD</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15">
              <h2 className="text-2xl font-headline text-on-surface mb-8">Algorithmic Filters</h2>
              <div className="flex flex-col gap-6">
                {/* Simplified toggles for demo */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col pr-4">
                    <span className="text-on-surface font-label text-sm">Suppress Outrage</span>
                    <span className="text-on-surface-variant text-xs">Filter content designed to provoke anger.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                </div>
                <div className="w-full h-px bg-outline-variant/20"></div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col pr-4">
                    <span className="text-on-surface font-label text-sm">Strict Paywall Mute</span>
                    <span className="text-on-surface-variant text-xs">Hide all articles blocked by paywalls.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-12 flex justify-end mt-8">
              <button onClick={handleSave} className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold font-label rounded-lg shadow-[0_4px_20px_rgba(78,222,163,0.2)] hover:shadow-[0_4px_24px_rgba(78,222,163,0.4)] transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">save</span>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className={`fixed bottom-24 right-8 transform transition-all duration-300 ease-out bg-primary text-on-primary px-6 py-4 rounded-lg shadow-lg font-label font-bold flex items-center gap-3 z-50 ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        <span>Filters Saved Successfully</span>
      </div>
    </>
  );
}
