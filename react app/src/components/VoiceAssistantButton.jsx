import { useNavigate } from 'react-router-dom'
import { useVoiceAssistant } from '../hooks/useVoiceAssistant'

const VoiceAssistantButton = () => {
  const navigate = useNavigate()
  const { isListening, toggleListening } = useVoiceAssistant()

  const handleClick = () => {
    if (window.location.pathname === '/voice-assistant') {
      toggleListening()
    } else {
      navigate('/voice-assistant')
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`voice-button fixed bottom-8 right-8 w-16 h-16 rounded-full text-white font-semibold shadow-lg z-50 transition-all ${
        isListening ? 'listening' : ''
      }`}
    >
      {isListening ? '⏹️' : '🎤'}
    </button>
  )
}

export default VoiceAssistantButton