import { useState, useEffect, useRef } from 'react'

const ChatInterface = ({ messages, isListening, onToggleListening, onSendMessage }) => {
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Custom Bar Visualizer Component
  const BarVisualizer = ({ state, barCount = 7 }) => {
    const isActive = state === 'listening' || state === 'speaking'
    
    return (
      <div className="flex items-end justify-center h-32 gap-2">
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            className={`w-4 rounded-t transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-t from-blue-500 to-purple-500 animate-pulse' 
                : 'bg-gray-300'
            }`}
            style={{
              height: isActive 
                ? `${Math.random() * 80 + 20}%` 
                : '40%',
              animationDelay: isActive ? `${index * 0.1}s` : '0s'
            }}
          />
        ))}
      </div>
    )
  }

  // Custom Voice Control Component
  const VoiceControlBar = ({ isListening, onToggle }) => {
    return (
      <div className="flex justify-center">
        <button
          onClick={onToggle}
          className={`w-16 h-16 rounded-full text-white text-2xl transition-all duration-300 transform hover:scale-110 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          }`}
        >
          {isListening ? '⏹️' : '🎤'}
        </button>
      </div>
    )
  }

  return (
    <div className="voice-interface rounded-3xl p-8 h-full">
      {/* Assistant Introduction with Customer Support Image */}
      <div className="text-center mb-8">
        <div className="assistant-avatar w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
          {/* Customer Support Representative Image */}
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
            <span className="text-6xl">👩‍💼</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hello! I'm your Business Travel Assistant</h2>
        <p className="text-gray-600">I'm here to help you with all your business travel needs. Just click the microphone and start talking!</p>
      </div>

      {/* Voice Assistant Visualization */}
      <div className="mb-8">
        <div className="visualizer-container bg-gray-50 rounded-2xl p-6 mb-6">
          <BarVisualizer 
            state={isListening ? 'listening' : 'connected'} 
            barCount={7} 
          />
        </div>
        
        {/* Voice Assistant Controls */}
        <div className="control-section text-center mb-6">
          <VoiceControlBar 
            isListening={isListening}
            onToggle={onToggleListening}
          />
          <p className="text-gray-600 mt-4">
            {isListening ? 'Listening... Click to stop' : 'Click to start speaking'}
          </p>
        </div>
        
        {/* Conversation History */}
        <div className="conversation bg-gray-50 rounded-2xl p-4 h-64 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="message mb-3 p-3 rounded-lg bg-white shadow-sm">
              <strong className={`message-${msg.type} ${msg.type === 'assistant' ? 'text-blue-600' : 'text-green-600'}`}>
                {msg.type === 'assistant' ? 'Assistant: ' : 'You: '}
              </strong>
              <span className="message-text">{msg.content}</span>
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

      {/* Quick Commands */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Try saying:</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <button 
            onClick={() => onSendMessage('Book a flight to New York next week')}
            className="command-button px-4 py-3 rounded-xl text-left bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            ✈️ Book a flight to New York next week
          </button>
          <button 
            onClick={() => onSendMessage('Find business hotels in London')}
            className="command-button px-4 py-3 rounded-xl text-left bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            🏨 Find business hotels in London
          </button>
          <button 
            onClick={() => onSendMessage('What documents do I need for Japan?')}
            className="command-button px-4 py-3 rounded-xl text-left bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            📋 What documents do I need for Japan?
          </button>
          <button 
            onClick={() => onSendMessage('Schedule a meeting in Tokyo')}
            className="command-button px-4 py-3 rounded-xl text-left bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            📅 Schedule a meeting in Tokyo
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface