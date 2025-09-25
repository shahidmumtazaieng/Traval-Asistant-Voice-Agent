import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Typed from 'typed.js'

const HeroSection = () => {
  const typedRef = useRef(null)

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          'Your Journey Begins Here',
          'Discover the World with AI',
          'Voice-Powered Travel Planning',
          'Your Adventure Awaits'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      })

      return () => typed.destroy()
    }
  }, [])

  return (
    <section id="home" className="hero-bg min-h-screen flex items-center justify-center relative">
      <div className="floating-elements">
        <div className="floating-icon" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>✈️</div>
        <div className="floating-icon" style={{ top: '60%', left: '80%', animationDelay: '2s' }}>🏖️</div>
        <div className="floating-icon" style={{ top: '30%', left: '70%', animationDelay: '4s' }}>🗺️</div>
        <div className="floating-icon" style={{ top: '80%', left: '20%', animationDelay: '1s' }}>📸</div>
        <div className="floating-icon" style={{ top: '15%', left: '60%', animationDelay: '3s' }}>🏨</div>
      </div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="typewriter mb-6">
          <span ref={typedRef}></span>
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover the world with our AI-powered travel assistant. Your perfect journey starts with a simple voice command.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/voice-assistant" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105">
            🎤 Try Voice Assistant
          </Link>
          <a href="#destinations" className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105">
            Explore Destinations
          </a>
        </div>
        
        {/* Voice Search Bar */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-full p-2 flex items-center">
            <input 
              type="text" 
              placeholder="Say 'Find me a beach vacation in December'..." 
              className="flex-1 bg-transparent text-white placeholder-white placeholder-opacity-70 px-6 py-3 outline-none"
            />
            <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-3 rounded-full hover:shadow-lg transition-all">
              🎤
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection