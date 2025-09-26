import { useState, useEffect, useRef } from 'react'

export const useBackendVoiceAssistant = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState([])
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [error, setError] = useState(null)
  
  const wsRef = useRef(null)

  // Get token from backend and connect to LiveKit
  const connectToVoiceService = async () => {
    try {
      setConnectionStatus('connecting')
      setError(null)
      
      // Get token from backend using environment variable for API URL
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const tokenResponse = await fetch(`${API_URL}/api/token`)
      if (!tokenResponse.ok) {
        throw new Error(`Failed to get token: ${tokenResponse.status} ${tokenResponse.statusText}`)
      }
      const tokenData = await tokenResponse.json()
      
      // Connect to WebSocket using the correct LiveKit URL from environment
      const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';
      const wsUrl = `${LIVEKIT_URL}?access_token=${tokenData.token}`
      
      wsRef.current = new WebSocket(wsUrl)
      
      wsRef.current.onopen = () => {
        console.log('Connected to voice service')
        setIsConnected(true)
        setConnectionStatus('connected')
        setError(null)
        
        // Add initial welcome message
        setMessages(prev => [
          ...prev,
          {
            type: 'assistant',
            content: 'Hello! I\'m your Enterprise Travel Assistant. How can I help you plan your next trip?'
          }
        ])
      }
      
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleMessageFromBackend(data)
        } catch (err) {
          console.error('Error parsing WebSocket message:', err)
          setError('Error processing response from voice service')
        }
      }
      
      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        const errorMessage = error.message || error.toString();
        setError('Connection error: ' + errorMessage)
        setConnectionStatus('error')
      }
      
      wsRef.current.onclose = (event) => {
        console.log('Disconnected from voice service', event.reason, 'Code:', event.code)
        setIsConnected(false)
        if (event.code !== 1000) { // Not a normal closure
          setError(`Connection closed: ${event.reason || 'Unknown reason'} (Code: ${event.code})`)
          setConnectionStatus('error')
        } else {
          setConnectionStatus('disconnected')
        }
      }
    } catch (err) {
      console.error('Error connecting to voice service:', err)
      setError(err.message || 'Failed to connect to voice service')
      setConnectionStatus('error')
    }
  }

  // Handle messages from backend
  const handleMessageFromBackend = (data) => {
    switch (data.type) {
      case 'user_transcript':
        const userMessage = { type: 'user', content: data.transcript }
        setMessages(prev => [...prev, userMessage])
        break
      case 'ai_response':
        const aiMessage = { type: 'assistant', content: data.text }
        setMessages(prev => [...prev, aiMessage])
        setIsSpeaking(true)
        break
      case 'listening_started':
        setIsListening(true)
        setIsSpeaking(false)
        break
      case 'listening_stopped':
        setIsListening(false)
        break
      case 'processing_started':
        setIsListening(false)
        setIsSpeaking(true)
        break
      case 'processing_stopped':
        setIsSpeaking(false)
        break
      default:
        console.log('Unknown message type:', data.type)
    }
  }

  // Start listening for user speech
  const startListening = async () => {
    if (!isConnected) {
      await connectToVoiceService()
      // Wait a bit for connection to establish
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    try {
      // Send start listening message to backend
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'start_listening' }))
      }
    } catch (err) {
      console.error('Error starting listening:', err)
      setError('Failed to start listening')
    }
  }

  // Stop listening for user speech
  const stopListening = () => {
    try {
      // Send stop listening message to backend
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'stop_listening' }))
      }
    } catch (err) {
      console.error('Error stopping listening:', err)
    }
  }

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return {
    isConnected,
    isListening,
    isSpeaking,
    messages,
    connectionStatus,
    error,
    connectToVoiceService,
    startListening,
    stopListening,
    toggleListening
  }
}