import { useEffect, useRef } from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import FeaturesSection from '../components/FeaturesSection'
import DestinationsSection from '../components/DestinationsSection'
import ReviewsSection from '../components/ReviewsSection'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import { useParticles } from '../hooks/useParticles'

const HomePage = () => {
  const particlesRef = useRef(null)
  
  useScrollAnimations()
  useParticles(particlesRef)

  return (
    <div className="home-page">
      <canvas ref={particlesRef} id="particles-canvas" />
      
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <DestinationsSection />
      <ReviewsSection />
    </div>
  )
}

export default HomePage