import { useState } from 'react'

const VoiceSettings = () => {
  const [settings, setSettings] = useState({
    language: 'English (US)',
    voiceSpeed: 1,
    assistantVoice: 'Sarah (Female)',
    accent: 'American',
    responseLength: 'concise',
    travelFocus: 'leisure'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select 
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent</label>
        <select 
          value={settings.accent}
          onChange={(e) => handleSettingChange('accent', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option>American</option>
          <option>British</option>
          <option>Australian</option>
          <option>Irish</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Voice Speed</label>
        <input 
          type="range" 
          min="0.5" 
          max="2" 
          step="0.1" 
          value={settings.voiceSpeed}
          onChange={(e) => handleSettingChange('voiceSpeed', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">Current: {settings.voiceSpeed}x</div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assistant Voice</label>
        <select 
          value={settings.assistantVoice}
          onChange={(e) => handleSettingChange('assistantVoice', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option>Sarah (Female)</option>
          <option>Emma (Female)</option>
          <option>David (Male)</option>
          <option>James (Male)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Response Length</label>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleSettingChange('responseLength', 'short')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              settings.responseLength === 'short' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Short
          </button>
          <button 
            onClick={() => handleSettingChange('responseLength', 'concise')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              settings.responseLength === 'concise' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Concise
          </button>
          <button 
            onClick={() => handleSettingChange('responseLength', 'detailed')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              settings.responseLength === 'detailed' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Detailed
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Focus</label>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => handleSettingChange('travelFocus', 'leisure')}
            className={`py-2 rounded-lg text-sm ${
              settings.travelFocus === 'leisure' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Leisure
          </button>
          <button 
            onClick={() => handleSettingChange('travelFocus', 'business')}
            className={`py-2 rounded-lg text-sm ${
              settings.travelFocus === 'business' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Business
          </button>
          <button 
            onClick={() => handleSettingChange('travelFocus', 'adventure')}
            className={`py-2 rounded-lg text-sm ${
              settings.travelFocus === 'adventure' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Adventure
          </button>
          <button 
            onClick={() => handleSettingChange('travelFocus', 'luxury')}
            className={`py-2 rounded-lg text-sm ${
              settings.travelFocus === 'luxury' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Luxury
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceSettings