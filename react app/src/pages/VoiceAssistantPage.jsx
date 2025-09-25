import { useEffect, useRef, useState } from 'react'
import { useVoiceAssistant } from '../hooks/useVoiceAssistant'
import ChatInterface from '../components/ChatInterface'
import TravelTools from '../components/TravelTools'
import BackgroundAnimation from '../components/BackgroundAnimation'

const VoiceAssistantPage = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      content: `Hi there! I'm excited to help you plan your next adventure. What kind of trip are you looking for? You can say things like:
        • "I want to go to Paris in December"
        • "Find me a beach vacation under $2000"
        • "Plan a family trip to Disney World"
        • "What are the best ski resorts in Europe?"`
    }
  ])

  const { isListening, transcript, toggleListening, speakText } = useVoiceAssistant()

  useEffect(() => {
    if (transcript) {
      addMessage('user', transcript)
      processVoiceCommand(transcript)
    }
  }, [transcript])

  const addMessage = (type, content) => {
    setChatMessages(prev => [...prev, { type, content }])
  }

  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    let response = ""
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      response = "Hello! I'm excited to help you plan your perfect trip. Where would you like to go?"
    } else if (lowerCommand.includes('beach') || lowerCommand.includes('beach vacation')) {
      response = "I love beach destinations! Are you looking for something tropical like Bali or the Maldives, or would you prefer the Mediterranean?"
    } else if (lowerCommand.includes('europe') || lowerCommand.includes('paris') || lowerCommand.includes('london')) {
      response = "Europe is amazing! I can help you plan a trip to Paris, London, Rome, or any other European destination. When are you thinking of traveling?"
    } else if (lowerCommand.includes('asia') || lowerCommand.includes('japan') || lowerCommand.includes('tokyo')) {
      response = "Asia offers incredible experiences! From the temples of Japan to the beaches of Thailand, I can help you plan the perfect Asian adventure."
    } else if (lowerCommand.includes('family') || lowerCommand.includes('kids')) {
      response = "Family trips are wonderful! I can suggest family-friendly destinations with activities for all ages. Are you looking for theme parks, beaches, or cultural experiences?"
    } else if (lowerCommand.includes('budget') || lowerCommand.includes('cheap') || lowerCommand.includes('affordable')) {
      response = "I understand budget is important! I can help you find great destinations that offer excellent value. What's your approximate budget range?"
    } else if (lowerCommand.includes('luxury') || lowerCommand.includes('premium')) {
      response = "Luxury travel is my specialty! I can recommend exclusive resorts, private tours, and premium experiences. What type of luxury experience are you looking for?"
    } else if (lowerCommand.includes('thank you') || lowerCommand.includes('thanks')) {
      response = "You're very welcome! I'm here to help make your travel dreams come true. Is there anything else you'd like to know about your trip?"
    } else {
      response = "That's exciting! I'd love to help you plan that trip. Could you tell me more details about your destination, travel dates, and preferences?"
    }
    
    setTimeout(() => {
      addMessage('assistant', response)
      speakText(response)
    }, 1500)
  }

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Voice Interface */}
          <div className="lg:col-span-2">
            <ChatInterface 
              messages={chatMessages}
              isListening={isListening}
              onToggleListening={toggleListening}
              onSendMessage={processVoiceCommand}
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