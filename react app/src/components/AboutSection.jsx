import { useEffect, useRef } from 'react'
import { useStatsCounter } from '../hooks/useStatsCounter'
import TravelStats from './TravelStats'

const AboutSection = () => {
  const statsRef = useRef(null)
  useStatsCounter(statsRef)

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">About VoyageAI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing travel planning with AI-powered voice assistance, making your dream destinations just a conversation away.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16" ref={statsRef}>
          <div className="text-center reveal">
            <div className="stats-counter text-5xl font-bold mb-2" data-target="150">0</div>
            <p className="text-gray-600">Destinations Worldwide</p>
          </div>
          <div className="text-center reveal">
            <div className="stats-counter text-5xl font-bold mb-2" data-target="50000">0</div>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="text-center reveal">
            <div className="stats-counter text-5xl font-bold mb-2" data-target="10">0</div>
            <p className="text-gray-600">Years of Excellence</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose VoyageAI?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">AI-Powered Personalization</h4>
                  <p className="text-gray-600">Our advanced AI learns your preferences to create perfectly tailored travel experiences.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Voice-First Experience</h4>
                  <p className="text-gray-600">Simply speak your travel dreams and watch them come to life with natural voice interactions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">24/7 Smart Support</h4>
                  <p className="text-gray-600">Get instant assistance anytime, anywhere with our intelligent travel companion.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <TravelStats />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection