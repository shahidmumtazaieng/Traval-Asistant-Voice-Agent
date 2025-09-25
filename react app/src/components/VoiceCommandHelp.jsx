import { useState } from 'react'

const VoiceCommandHelp = () => {
  const [activeCategory, setActiveCategory] = useState('general')

  const categories = [
    { id: 'general', label: 'General', icon: '💬' },
    { id: 'destinations', label: 'Destinations', icon: '🌍' },
    { id: 'planning', label: 'Trip Planning', icon: '📅' },
    { id: 'budget', label: 'Budget & Costs', icon: '💰' },
    { id: 'activities', label: 'Activities', icon: '🎉' }
  ]

  const commands = {
    general: [
      { command: "Hello / Hi", description: "Greet the assistant and start a conversation" },
      { command: "What can you help me with?", description: "Get an overview of available assistance" },
      { command: "Thank you / Thanks", description: "Express gratitude for the assistance" },
      { command: "Repeat that", description: "Ask the assistant to repeat the last response" },
      { command: "Stop / Cancel", description: "Interrupt the current response or action" }
    ],
    destinations: [
      { command: "I want to go to [destination]", description: "Express interest in a specific destination" },
      { command: "Where should I go in [month/season]?", description: "Get recommendations for a specific time period" },
      { command: "Best beaches in [region]", description: "Find beach destinations in a specific area" },
      { command: "Top cities to visit in [country]", description: "Get city recommendations for a country" },
      { command: "Family-friendly destinations", description: "Find destinations suitable for families" }
    ],
    planning: [
      { command: "Plan a trip to [destination]", description: "Start planning a trip to a specific location" },
      { command: "How many days should I spend in [destination]?", description: "Get recommendations on trip duration" },
      { command: "What's the best time to visit [destination]?", description: "Learn about the optimal visiting season" },
      { command: "Create an itinerary for [duration]", description: "Generate a day-by-day travel plan" },
      { command: "What should I pack for [destination/type of trip]?", description: "Get packing suggestions" }
    ],
    budget: [
      { command: "Find a vacation under [amount]", description: "Search for trips within a specific budget" },
      { command: "How much does a trip to [destination] cost?", description: "Get cost estimates for a destination" },
      { command: "Ways to save money while traveling", description: "Get tips for budget-conscious travel" },
      { command: "Compare prices for [destinations]", description: "Get cost comparisons between destinations" },
      { command: "Best value destinations", description: "Find destinations that offer good value for money" }
    ],
    activities: [
      { command: "What to do in [destination]", description: "Get activity recommendations for a location" },
      { command: "Best restaurants in [city]", description: "Find top dining options" },
      { command: "Adventure activities", description: "Discover thrilling experiences" },
      { command: "Cultural experiences", description: "Find museums, historical sites, etc." },
      { command: "Romantic activities for couples", description: "Get suggestions for romantic experiences" }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Commands List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {categories.find(cat => cat.id === activeCategory)?.label} Commands
        </h3>
        
        <div className="space-y-3">
          {commands[activeCategory].map((cmd, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-800">"{cmd.command}"</div>
              <div className="text-sm text-gray-600 mt-1">{cmd.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Speak clearly and at a natural pace</li>
          <li>• Use specific details like dates, budgets, and preferences</li>
          <li>• Ask follow-up questions to get more detailed information</li>
          <li>• Say "Stop" or click the stop button to interrupt at any time</li>
        </ul>
      </div>
    </div>
  )
}

export default VoiceCommandHelp