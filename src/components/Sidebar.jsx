import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const linkClasses = ({ isActive }) =>
    isActive
      ? "flex items-center gap-4 px-4 py-3 rounded-lg text-primary font-bold bg-primary/5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] group"
      : "flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] group";

  const iconClasses = ({ isActive }) =>
    isActive
      ? "material-symbols-outlined text-[20px]"
      : "material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform";

  const getFill = (isActive) => (isActive ? "'FILL' 1" : "'FILL' 0");

  return (
    <aside className="hidden md:flex flex-col h-full w-80 bg-surface-container-low shadow-2xl shadow-indigo-950/20 p-8 flex-shrink-0 fixed top-0 left-0 bottom-0 z-40 border-r border-outline-variant/15">
      <div className="mb-12">
        <h1 className="text-3xl text-primary font-headline italic mb-6">SignalFlow</h1>
        <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/15">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/30">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAlV1NKvSmCV4F9sFDxHwrYdb7SYy9qWH3gCiT5ldVBtSMvFmLa-RTXVW9w1lwXg30Ohqv3SwBjnrageYdI0AnmFlzA5-BHJsnSKZiP-4i_h5vk6ipCqza4eHO2yNgaOq0h4mTTg8NSr4FwJejped2Lv6-q7MZqQ6OywuHd4XJP2GNxhvRnsSbEnKv-VbVjsBIpUlY5RKaj7RSnfz8v5tLVcekClFRaJ5OAPzzRzCvVbkgMBqGL52J8ofJWOnBnEUqRfZMWgpUPF4" className="w-full h-full object-cover" alt="User" />
          </div>
          <div>
            <p className="font-headline text-lg text-on-surface">The Curator</p>
            <p className="font-body text-xs text-on-surface-variant">Privacy Level: Maximum</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-2 flex-grow font-label">
        <NavLink to="/" className={linkClasses}>
          {({ isActive }) => (
            <>
              <span className={iconClasses({ isActive })} style={{ fontVariationSettings: getFill(isActive) }}>sensors</span>
              <span className="text-sm tracking-wide">The Signal</span>
            </>
          )}
        </NavLink>
        <NavLink to="/noise-filter" className={linkClasses}>
          {({ isActive }) => (
            <>
              <span className={iconClasses({ isActive })} style={{ fontVariationSettings: getFill(isActive) }}>filter_list</span>
              <span className="text-sm tracking-wide">Noise Filter</span>
            </>
          )}
        </NavLink>
        <NavLink to="/archive" className={linkClasses}>
          {({ isActive }) => (
            <>
              <span className={iconClasses({ isActive })} style={{ fontVariationSettings: getFill(isActive) }}>archive</span>
              <span className="text-sm tracking-wide">Smart Archive</span>
            </>
          )}
        </NavLink>
        <NavLink to="/ai-control" className={linkClasses}>
          {({ isActive }) => (
            <>
              <span className={iconClasses({ isActive })} style={{ fontVariationSettings: getFill(isActive) }}>psychology</span>
              <span className="text-sm tracking-wide">AI Control</span>
            </>
          )}
        </NavLink>
        <NavLink to="/onboarding" className={linkClasses}>
          {({ isActive }) => (
            <>
              <span className={iconClasses({ isActive })} style={{ fontVariationSettings: getFill(isActive) }}>explore</span>
              <span className="text-sm tracking-wide">Onboarding</span>
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}
