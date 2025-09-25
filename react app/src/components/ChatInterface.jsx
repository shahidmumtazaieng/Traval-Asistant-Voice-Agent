import { useState, useEffect, useRef } from 'react'
import { useVoiceAssistant } from '../hooks/useVoiceAssistant'

const ChatInterface = ({ messages, isListening, onToggleListening, onSendMessage }) => {
  const [isTyping, setIsTyping] = useState(false)
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)
  const { speakText } = useVoiceAssistant()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onSendMessage(inputText)
      setInputText('')
    }
  }

  const quickCommands = [
    { text: 'Find me a beach vacation', icon: '🏖️' },
    { text: 'Plan a trip to Tokyo', icon: '🗼' },
    { text: 'Best time to visit Paris', icon: '🥐' },
    { text: 'Family-friendly resorts', icon: '👨‍👩‍👧‍👦' }
  ]

  return (
    <div className="voice-interface rounded-3xl p-8 h-full">
      {/* Assistant Introduction */}
      <div className="text-center mb-8">
        <div className="assistant-avatar w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <img src="/resources/assistant-avatar.png" alt="AI Assistant" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hello! I'm your travel assistant</h2>
        <p className="text-gray-600">I'm here to help you plan the perfect trip. Just click the microphone and start talking!</p>
      </div>

      {/* Chat Interface */}
      <div className="mb-8">
        <div className="space-y-4 h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-2xl">
          {messages.map((message, index) => (
            <div key={index} className={`chat-bubble p-4 ${
              message.type === 'user' ? 'user-message' : 'assistant-message'
            }`}>
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <span className="ml-2 text-sm text-gray-500">Assistant is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Voice Controls */}
      <div className="text-center mb-8">
        <button
          onClick={onToggleListening}
          className={`w-20 h-20 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-white text-2xl hover:shadow-xl transition-all mb-4 ${
            isListening ? 'listening' : ''
          }`}
        >
          {isListening ? '⏹️' : '🎤'}
        </button>
        <p className="text-gray-600 mb-4">Click to start speaking</p>
        
        {/* Waveform Visualization */}
        {isListening && (
          <div className="waveform">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        )}
      </div>

     

      {/* Quick Commands */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Try saying:</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickCommands.map((cmd, index) => (
            <button 
              key={index}
              onClick={() => {
                onSendMessage(cmd.text)
                setInputText(cmd.text)
              }}
              className="command-button px-4 py-3 rounded-xl text-left"
            >
              {cmd.icon} {cmd.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatInterface