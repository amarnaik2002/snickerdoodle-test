import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import PhotoCarousel from './components/PhotoCarousel'
import MenuHighlights from './components/MenuHighlights'
import SignatureFoods from './components/SignatureFoods'
import LoyaltyBanner from './components/LoyaltyBanner'
import Locations from './components/Locations'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFDF9' }}>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <Hero />
        <OurStory />
        <PhotoCarousel />
        <MenuHighlights />
        <SignatureFoods />
        <LoyaltyBanner />
        <Locations />
        <Footer />
      </main>
    </div>
  )
}
