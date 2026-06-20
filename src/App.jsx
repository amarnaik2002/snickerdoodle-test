import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import PhotoCarousel from './components/PhotoCarousel'
import MenuHighlights from './components/MenuHighlights'
import SignatureFoods from './components/SignatureFoods'
import LoyaltyBanner from './components/LoyaltyBanner'
import Locations from './components/Locations'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Menu from './pages/Menu'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <PhotoCarousel />
      <MenuHighlights />
      <SignatureFoods />
      <LoyaltyBanner />
      <Locations />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#FFFDF9' }}>
        <ScrollToTop />
        <Navbar />
        <main style={{ paddingTop: 68 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
