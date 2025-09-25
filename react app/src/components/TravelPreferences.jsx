import { useState } from 'react'

const TravelPreferences = () => {
  const [preferences, setPreferences] = useState({
    budgetRange: 'medium',
    travelStyle: 'relaxed',
    groupType: 'solo',
    accommodation: 'hotel',
    transportation: 'flight',
    specialInterests: []
  })

  const interests = [
    'Beach', 'Mountains', 'Culture', 'Food', 'History', 
    'Adventure', 'Nightlife', 'Shopping', 'Nature', 'Wellness'
  ]

  const handleInterestToggle = (interest) => {
    setPreferences(prev => {
      const currentInterests = [...prev.specialInterests]
      if (currentInterests.includes(interest)) {
        return {
          ...prev,
          specialInterests: currentInterests.filter(i => i !== interest)
        }
      } else {
        return {
          ...prev,
          specialInterests: [...currentInterests, interest]
        }
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => setPreferences(prev => ({...prev, budgetRange: 'low'}))}
            className={`py-2 rounded-lg text-sm ${
              preferences.budgetRange === 'low' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Low
          </button>
          <button 
            onClick={() => setPreferences(prev => ({...prev, budgetRange: 'medium'}))}
            className={`py-2 rounded-lg text-sm ${
              preferences.budgetRange === 'medium' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Medium
          </button>
          <button 
            onClick={() => setPreferences(prev => ({...prev, budgetRange: 'high'}))}
            className={`py-2 rounded-lg text-sm ${
              preferences.budgetRange === 'high' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            High
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
        <select 
          value={preferences.travelStyle}
          onChange={(e) => setPreferences(prev => ({...prev, travelStyle: e.target.value}))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="relaxed">Relaxed</option>
          <option value="moderate">Moderate</option>
          <option value="packed">Packed Schedule</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
        <select 
          value={preferences.groupType}
          onChange={(e) => setPreferences(prev => ({...prev, groupType: e.target.value}))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="solo">Solo Travel</option>
          <option value="couple">Couple</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="group">Group Tour</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Preference</label>
        <select 
          value={preferences.accommodation}
          onChange={(e) => setPreferences(prev => ({...prev, accommodation: e.target.value}))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="hotel">Hotel</option>
          <option value="resort">Resort</option>
          <option value="airbnb">Airbnb</option>
          <option value="hostel">Hostel</option>
          <option value="camping">Camping</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Transportation</label>
        <select 
          value={preferences.transportation}
          onChange={(e) => setPreferences(prev => ({...prev, transportation: e.target.value}))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="flight">Flight</option>
          <option value="train">Train</option>
          <option value="car">Car Rental</option>
          <option value="bus">Bus</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Interests</label>
        <div className="flex flex-wrap gap-2">
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`px-3 py-1 rounded-full text-sm ${
                preferences.specialInterests.includes(interest)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TravelPreferences