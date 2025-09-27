import { useEffect, useRef, useState } from 'react'
import { useBackendVoiceAssistant } from '../hooks/useBackendVoiceAssistant'
import ChatInterface from '../components/ChatInterface'
import TravelTools from '../components/TravelTools'
import BackgroundAnimation from '../components/BackgroundAnimation'

const VoiceAssistantPage = () => {
  const { 
    isConnected, 
    isListening, 
    messages, 
    connectionStatus, 
    error, 
    connectToVoiceService, 
    toggleListening 
  } = useBackendVoiceAssistant()

  useEffect(() => {
    // Auto-connect to voice service when component mounts
    connectToVoiceService()
  }, [])

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 font-serif">Meet Your AI Travel Assistant</h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            Simply speak your travel dreams and watch as our AI creates the perfect journey for you. No typing, no searching - just natural conversation.
          </p>
        </div>

        {/* Connection Status */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {connectionStatus !== 'connected' && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            <strong>Status:</strong> {connectionStatus}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Voice Interface */}
          <div className="lg:col-span-2">
            <ChatInterface 
              messages={messages}
              isListening={isListening}
              onToggleListening={toggleListening}
              onSendMessage={(text) => {
                // For text messages, we would need to send them to the backend
                // This would require implementing a text-based chat endpoint
              }}
            />
          </div>

          {/* Travel Tools Sidebar */}
          <div className="space-y-6">
            <TravelTools />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceAssistantPage