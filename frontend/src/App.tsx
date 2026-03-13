import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import CreatePage from './pages/CreatePage'
import EventDetailPage from './pages/EventDetailPage'
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import SavedPage from './pages/SavedPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
