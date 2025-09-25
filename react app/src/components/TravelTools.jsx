import { useState } from 'react'
import Calendar from './Calendar'
import BudgetCalculator from './BudgetCalculator'
import DestinationSuggestions from './DestinationSuggestions'
import VoiceSettings from './VoiceSettings'
import TravelPreferences from './TravelPreferences'
import VoiceCommandHelp from './VoiceCommandHelp'

const TravelTools = () => {
  const [activeTab, setActiveTab] = useState('calendar')

  const tabs = [
    { id: 'calendar', label: '📅 Calendar', component: <Calendar /> },
    { id: 'budget', label: '💰 Budget', component: <BudgetCalculator /> },
    { id: 'destinations', label: '🌍 Destinations', component: <DestinationSuggestions /> },
    { id: 'voice', label: '🔊 Voice', component: <VoiceSettings /> },
    { id: 'preferences', label: '🎯 Preferences', component: <TravelPreferences /> },
    { id: 'help', label: '❓ Help', component: <VoiceCommandHelp /> }
  ]

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto mb-4 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap mr-2 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="travel-tool rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          {tabs.find(tab => tab.id === activeTab)?.label}
        </h3>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </>
  )
}

export default TravelTools