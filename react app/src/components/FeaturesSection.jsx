import { Link } from 'react-router-dom'

const FeaturesSection = () => {
  const features = [
    {
      id: 'ai-personalization',
      title: 'AI Personalization',
      description: 'Our advanced AI analyzes your preferences, past trips, and real-time data to create perfectly tailored travel recommendations just for you.',
      image: '/resources/feature-1.jpg',
      color: 'from-blue-500 to-purple-600',
      demo: () => alert('🤖 AI Personalization Demo\n\nOur AI analyzes your preferences, past bookings, and real-time data to create personalized recommendations. This demo would show how the AI learns your travel style and suggests destinations tailored just for you!')
    },
    {
      id: '24-7-support',
      title: '24/7 Smart Support',
      description: 'Get instant assistance anytime with our AI travel companion. From booking changes to local recommendations, we\'re always here to help.',
      image: '/resources/feature-2.jpg',
      color: 'from-green-500 to-teal-600',
      demo: () => alert('📞 24/7 Support Demo\n\nOur AI assistant is always available to help with your travel needs. This demo would show real-time support for booking changes, local recommendations, and emergency assistance!')
    },
    {
      id: 'best-price',
      title: 'Best Price Guarantee',
      description: 'Our AI continuously monitors prices across hundreds of booking sites to ensure you always get the best deals on flights, hotels, and packages.',
      image: '/resources/feature-3.jpg',
      color: 'from-pink-500 to-yellow-500',
      demo: () => {
        const destinations = ['Paris', 'Tokyo', 'Bali', 'New York', 'London', 'Rome']
        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)]
        const randomPrice = Math.floor(Math.random() * 1000) + 500
        
        alert(`💰 Price Check Demo\n\nGreat news! We found flights to ${randomDestination} starting from $${randomPrice}. Our AI continuously monitors prices across hundreds of booking sites to ensure you get the best deals!`)
      }
    }
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Smart Travel Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of travel planning with our innovative AI-powered features designed to make your journey seamless and unforgettable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card rounded-2xl p-8 text-center reveal">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <img src={feature.image} alt={feature.title} className="w-16 h-16 rounded-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <button 
                onClick={feature.demo}
                className={`bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full hover:shadow-lg transition-all`}
              >
                Try Demo
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection