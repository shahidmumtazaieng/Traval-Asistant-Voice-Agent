import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import VoiceAssistantButton from './VoiceAssistantButton'

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`glass-nav fixed w-full top-0 z-50 py-4 transition-all duration-300 ${isScrolled ? 'py-3' : ''}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-white font-bold text-xl font-serif">VoyageAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-yellow-300 transition-colors">Home</Link>
            <a href="/#destinations" className="text-white hover:text-yellow-300 transition-colors">Destinations</a>
            <a href="/#features" className="text-white hover:text-yellow-300 transition-colors">Features</a>
            <a href="/#reviews" className="text-white hover:text-yellow-300 transition-colors">Reviews</a>
            <a href="/#contact" className="text-white hover:text-yellow-300 transition-colors">Contact</a>
          </div>
          
        
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-white font-bold text-xl font-serif">VoyageAI</span>
              </div>
              <p className="text-gray-400">
                Your intelligent travel companion, making dream destinations accessible through the power of AI and voice technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><a href="/#destinations" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/voice-assistant" className="hover:text-white transition-colors">Voice Assistant</Link></li>
                <li><a href="/#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
              <VoiceAssistantButton />
          
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VoyageAI. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout