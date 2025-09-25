"use client";

// Simplified audio visualizer as a fallback for LiveKit
export default function LiveKitVoiceAssistant({ audioTrack, state }) {
  // Determine visualization based on state
  const isActive = state === 'listening' || state === 'speaking';
  
  return (
    <div className="h-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="w-full h-12 mb-1 flex items-center justify-center">
          {!isActive && (
            <div className="text-center">
              <div className="text-xl mb-1">
                {state === 'disconnected' ? '🔇' : 
                 state === 'connecting' ? '🔄' : 
                 state === 'listening' ? '🎤' : 
                 state === 'speaking' ? '🔊' : '🎧'}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {state === 'disconnected' ? 'Not connected' : 
                 state === 'connecting' ? 'Connecting...' : 
                 state === 'listening' ? 'Listening...' : 
                 state === 'speaking' ? 'Speaking...' : 
                 'Connected'}
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-xs font-medium text-gray-700">
          {state === 'connecting' && 'Establishing secure connection...'}
          {state === 'listening' && 'Listening for your voice input'}
          {state === 'thinking' && 'Processing your request...'}
          {state === 'speaking' && 'Speaking response'}
          {state === 'disconnected' && 'Voice service disconnected'}
          {state === 'connected' && 'Ready for voice interaction'}
        </p>
      </div>
    </div>
  );
}