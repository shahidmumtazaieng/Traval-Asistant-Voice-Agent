import { useState } from 'react'

const DestinationsSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null)

  const destinations = [
    {
      id: 'mountain',
      name: 'Mountain Adventures',
      description: 'Experience the majesty of the Swiss Alps with hiking, skiing, and breathtaking views.',
      image: '/resources/destination-1.jpg',
      price: 'From $899',
      tag: 'Adventure',
      tagColor: 'from-blue-500 to-purple-600'
    },
    {
      id: 'europe',
      name: 'European Cities',
      description: 'Discover the charm of historic cities with world-class dining and cultural experiences.',
      image: '/resources/destination-2.jpg',
      price: 'From $1,299',
      tag: 'Culture',
      tagColor: 'from-pink-500 to-yellow-500'
    },
    {
      id: 'asia',
      name: 'Asian Temples',
      description: 'Find peace and wisdom in ancient temples surrounded by natural beauty.',
      image: '/resources/destination-3.jpg',
      price: 'From $799',
      tag: 'Spiritual',
      tagColor: 'from-green-500 to-teal-600'
    },
    {
      id: 'safari',
      name: 'African Safari',
      description: 'Witness the Big Five in their natural habitat on an unforgettable safari adventure.',
      image: '/resources/destination-4.jpg',
      price: 'From $1,599',
      tag: 'Wildlife',
      tagColor: 'from-orange-500 to-red-600'
    },
    {
      id: 'cruise',
      name: 'Cruise Vacations',
      description: 'Sail to paradise on luxury cruise ships with all-inclusive amenities.',
      image: '/resources/destination-5.jpg',
      price: 'From $1,199',
      tag: 'Luxury',
      tagColor: 'from-purple-500 to-blue-600'
    },
    {
      id: 'aurora',
      name: 'Northern Lights',
      description: 'Witness the magical aurora borealis from the comfort of a glass igloo.',
      image: '/resources/destination-6.jpg',
      price: 'From $1,399',
      tag: 'Unique',
      tagColor: 'from-indigo-500 to-purple-600'
    }
  ]

  const handleExplore = (destinationId) => {
    setSelectedDestination(destinationId)
    const messages = {
      mountain: 'Mountain adventures are breathtaking! I can help you find the perfect alpine destination with hiking trails, ski resorts, and stunning views. When would you like to travel?',
      europe: 'European cities offer incredible culture and history! From Paris to Rome, I can help you plan the perfect European getaway. What are your travel dates?',
      asia: 'Asia is full of wonders! Whether you want temples in Japan, beaches in Thailand, or cities in Singapore, I can create the perfect Asian adventure for you.',
      safari: 'African safaris are life-changing experiences! I can help you choose between Kenya, Tanzania, South Africa, or other amazing safari destinations. When do you want to go?',
      cruise: 'Cruise vacations are so relaxing! I can help you find the perfect cruise - Caribbean, Mediterranean, or even world cruises. What\'s your ideal cruise experience?',
      aurora: 'The Northern Lights are magical! I can help you plan a trip to Iceland, Norway, or Finland to see the aurora. When would you like to experience this natural wonder?'
    }
    
    alert(`🌍 ${destinationId.charAt(0).toUpperCase() + destinationId.slice(1)} Destination\n\n${messages[destinationId]}`)
  }

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Popular Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked destinations, each offering unique experiences and unforgettable memories. Click on any destination to explore more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="destination-card bg-white rounded-2xl overflow-hidden shadow-lg reveal">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${destination.tagColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {destination.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">{destination.price}</span>
                  <button 
                    onClick={() => handleExplore(destination.id)}
                    className={`bg-gradient-to-r ${destination.tagColor} text-white px-4 py-2 rounded-full hover:shadow-lg transition-all`}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationsSection