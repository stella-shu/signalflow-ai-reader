import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'

// Pages
import TheSignalFeed from './pages/TheSignalFeed'
import SmartArchive from './pages/SmartArchive'
import SilentSignal from './pages/SilentSignal'
import AIControlCenter from './pages/AIControlCenter'
import Onboarding from './pages/Onboarding'

function App() {
  return (
    <>
      <Sidebar />
      <MobileNav />
      <Routes>
        <Route path="/" element={<TheSignalFeed />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/archive" element={<SmartArchive />} />
        <Route path="/noise-filter" element={<SilentSignal />} />
        <Route path="/ai-control" element={<AIControlCenter />} />
      </Routes>
    </>
  )
}

export default App
