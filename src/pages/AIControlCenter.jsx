import { useState } from 'react';

export default function AIControlCenter() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleApply = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard your changes?")) {
      window.location.reload();
    }
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-16 pb-32 md:ml-80 pt-24 md:pt-16 max-w-5xl mx-auto w-full">
        <div className="mb-16">
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">AI Control Center</h1>
          <p className="font-body text-on-surface-variant text-base max-w-2xl leading-relaxed">
            Fine-tune the neural parameters that govern your SignalFlow. Adjust curation thresholds, temporal sensitivity, and stylistic preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          <section className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-headline text-2xl text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">psychology</span>
                    Cognitive Style
                  </h2>
                  <p className="text-sm font-label text-on-surface-variant mt-1">Determine how the AI synthesizes information.</p>
                </div>
              </div>

              <div className="space-y-8 mt-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-label text-sm text-on-surface">Synthesis Depth</label>
                    <span className="font-label text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">Deep</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="80" className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" />
                  <div className="flex justify-between text-xs font-label text-on-surface-variant mt-2 opacity-50">
                    <span>Skim</span>
                    <span>Comprehensive</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-label text-sm text-on-surface">Tone Preference</label>
                    <span className="font-label text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded">Analytical</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="30" className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary" />
                  <div className="flex justify-between text-xs font-label text-on-surface-variant mt-2 opacity-50">
                    <span>Analytical</span>
                    <span>Narrative</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-headline text-2xl text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">tune</span>
                  Temporal Sensitivity
                </h2>
                <p className="text-sm font-label text-on-surface-variant mt-1">Adjust the algorithm's bias towards recency vs. historical relevance.</p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="radio" name="temporal" className="peer appearance-none w-5 h-5 border border-outline-variant rounded-full checked:border-primary transition-colors" />
                  <div className="absolute w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <span className="block font-label text-sm text-on-surface group-hover:text-primary transition-colors">Bleeding Edge</span>
                  <span className="block font-body text-xs text-on-surface-variant opacity-70">Focus exclusively on breaking developments (0-24h).</span>
                </div>
              </label>

              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="radio" name="temporal" defaultChecked className="peer appearance-none w-5 h-5 border border-outline-variant rounded-full checked:border-primary transition-colors" />
                  <div className="absolute w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <span className="block font-label text-sm text-on-surface group-hover:text-primary transition-colors">Balanced Integration</span>
                  <span className="block font-body text-xs text-on-surface-variant opacity-70">Blend recent news with relevant historical context.</span>
                </div>
              </label>

              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="radio" name="temporal" className="peer appearance-none w-5 h-5 border border-outline-variant rounded-full checked:border-primary transition-colors" />
                  <div className="absolute w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <span className="block font-label text-sm text-on-surface group-hover:text-primary transition-colors">Historical Weighting</span>
                  <span className="block font-body text-xs text-on-surface-variant opacity-70">Prioritize deep, longitudinal analysis over immediate updates.</span>
                </div>
              </label>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 lg:col-span-2">
            <h2 className="font-headline text-2xl text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant">network_node</span>
              Cross-Pollination Settings
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <div className="max-w-xl">
                <h3 className="font-label text-base text-on-surface mb-1">Serendipity Engine</h3>
                <p className="font-body text-sm text-on-surface-variant">Inject a controlled percentage of articles from disciplines outside your primary interests to foster lateral thinking.</p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="font-label text-xs text-on-surface-variant">0%</span>
                <input type="range" min="0" max="30" defaultValue="15" className="w-32 h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" />
                <span className="font-label text-xs text-primary font-bold">15%</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-end gap-4 border-t border-outline-variant/15 pt-8">
          <button onClick={handleDiscard} className="px-6 py-3 rounded-lg font-label text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
            Discard Changes
          </button>
          <button onClick={handleApply} className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold font-label rounded-lg shadow-[0_4px_20px_rgba(78,222,163,0.2)] hover:shadow-[0_4px_24px_rgba(78,222,163,0.4)] transition-all">
            Apply Configuration
          </button>
        </div>
      </main>

      <div className={`fixed bottom-24 right-8 transform transition-all duration-300 ease-out bg-primary text-on-primary px-6 py-4 rounded-lg shadow-lg font-label font-bold flex items-center gap-3 z-50 ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        <span>Configuration Saved Successfully</span>
      </div>
    </>
  );
}
