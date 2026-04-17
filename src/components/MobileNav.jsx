import { NavLink } from 'react-router-dom';

export function MobileNav() {
  return (
    <>
      <header className="md:hidden fixed top-0 w-full z-30 flex justify-between items-center px-6 py-4 bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">security</span>
          <span className="text-on-surface text-2xl font-headline italic tracking-tight">SignalFlow</span>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-4 bg-surface-container-low/80 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
        <NavLink to="/" className={({ isActive }) => isActive ? "relative flex flex-col items-center justify-center text-primary transition-all duration-500 after:content-[''] after:absolute after:-bottom-2 after:w-1 after:h-1 after:bg-primary after:rounded-full" : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-500"}>
          {({ isActive }) => (
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>rss_feed</span>
          )}
        </NavLink>
        <NavLink to="/noise-filter" className={({ isActive }) => isActive ? "relative flex flex-col items-center justify-center text-primary transition-all duration-500 after:content-[''] after:absolute after:-bottom-2 after:w-1 after:h-1 after:bg-primary after:rounded-full" : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-500"}>
          {({ isActive }) => (
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>tune</span>
          )}
        </NavLink>
        <NavLink to="/archive" className={({ isActive }) => isActive ? "relative flex flex-col items-center justify-center text-primary transition-all duration-500 after:content-[''] after:absolute after:-bottom-2 after:w-1 after:h-1 after:bg-primary after:rounded-full" : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-500"}>
          {({ isActive }) => (
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>inventory_2</span>
          )}
        </NavLink>
        <NavLink to="/ai-control" className={({ isActive }) => isActive ? "relative flex flex-col items-center justify-center text-primary transition-all duration-500 after:content-[''] after:absolute after:-bottom-2 after:w-1 after:h-1 after:bg-primary after:rounded-full" : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-500"}>
          {({ isActive }) => (
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>settings_input_component</span>
          )}
        </NavLink>
      </nav>
    </>
  );
}
