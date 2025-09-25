const DestinationSuggestions = () => {
  const destinations = [
    { id: 'paris', name: 'Paris, France', flag: '🇫🇷', price: 'From $899' },
    { id: 'tokyo', name: 'Tokyo, Japan', flag: '🇯🇵', price: 'From $1,299' },
    { id: 'bali', name: 'Bali, Indonesia', flag: '🇮🇩', price: 'From $799' },
    { id: 'newyork', name: 'New York, USA', flag: '🇺🇸', price: 'From $699' }
  ]

  const handleDestinationClick = (destination) => {
    alert(`🌍 ${destination.name} Selected\n\nGreat choice! ${destination.flag} ${destination.name} is an amazing destination. This would integrate with the voice assistant to help plan your trip to ${destination.name}!`)
  }

  return (
    <div className="space-y-3">
      {destinations.map((destination) => (
        <div 
          key={destination.id}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => handleDestinationClick(destination)}
        >
          <span className="text-2xl">{destination.flag}</span>
          <div>
            <div className="font-semibold text-gray-800">{destination.name}</div>
            <div className="text-sm text-gray-600">{destination.price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DestinationSuggestions