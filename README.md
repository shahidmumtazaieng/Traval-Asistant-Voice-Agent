# Enterprise TravelVoice AI

An enterprise-level Voice AI Conversational Agent for travel assistance, built with LiveKit, FastAPI (Python) backend, and React frontend. This application enables real-time, natural voice conversations with an AI travel assistant optimized for low latency and high accuracy.

## Features

- **Real-time Voice Conversation**: Enterprise-grade voice communication with AI travel assistant
- **Optimized Voice Pipeline**: Low-latency STT → LLM → TTS with accuracy enhancements
- **Travel-Focused UI**: Enterprise travel-themed interface with insights dashboard
- **Turn-taking Logic**: Prevents overlapping speech for natural conversation flow
- **Performance Optimized**: Configured for minimal latency and maximum responsiveness
- **LiveKit Integration**: Real-time audio streaming with adaptive streaming

## Tech Stack

- **Backend**: FastAPI (Python) with performance optimizations
- **Frontend**: React with Vite and travel-themed UI
- **Real-time Communication**: LiveKit Cloud Service
- **AI Services**: 
  - Google Gemini (LLM)
  - Deepgram (STT)
  - Cartesia (TTS)

## Prerequisites

- Python 3.8+
- Node.js 16+
- LiveKit Cloud Account (for development, you can use LiveKit Cloud or self-host)
- Docker (optional, for easy setup)

## Performance Optimizations

### Latency Reduction
- Optimized STT endpointing (200ms) for faster response
- Reduced utterance detection (800ms) for quicker processing
- Faster interruption detection (0.6s) for natural conversation
- Optimized Gemini generation parameters for quick responses

### Accuracy Enhancements
- Deepgram Nova-3 model for superior STT accuracy
- Smart formatting for better transcription quality
- Context-aware LLM responses with travel domain expertise

### Resource Efficiency
- Adaptive streaming for optimal bandwidth usage
- Resource limits in Docker Compose for consistent performance
- GZip compression for API responses
- Connection pooling and caching

## Setup

### Quick Start with Docker (Recommended)

1. Update the `.env` files with your credentials
2. Run the entire stack with Docker Compose:
   ```bash
   docker-compose up
   ```

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Update the `.env` file with your credentials:
   ```env
   # LiveKit Configuration
   LIVEKIT_URL=wss://your-livekit-url
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret

   # Deepgram Configuration (for STT)
   DEEPGRAM_API_KEY=your_deepgram_api_key

   # Cartesia Configuration (for TTS)
   CARTESIA_API_KEY=your_cartesia_api_key

   # Google Gemini Configuration
   GOOGLE_API_KEY=your_google_api_key

   # Application Configuration
   HOST=localhost
   PORT=8000
   ```

5. Run the backend:
   ```bash
   python main.py
   ```

6. In a separate terminal, run the LiveKit agent:
   ```bash
   python voice_agent.py dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd "react app"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_LIVEKIT_URL=wss://your-livekit-url
   ```

4. Run the frontend:
   ```bash
   npm run dev
   ```

### Windows Development Script

For Windows users, you can use the provided batch script to start all services:

1. Update the `.env` files with your credentials
2. Run the development script:
   ```cmd
   start-dev.bat
   ```

This will start:
- Backend API server
- Voice agent
- Frontend development server

Note: LiveKit is now using a cloud service, so there's no need to run a local LiveKit server.

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Click "Connect" to join the voice conversation
4. Speak naturally when prompted about travel topics
5. The AI will respond with voice and text transcript
6. View travel insights in the dashboard panel

## Enterprise UI Features

### Travel Dashboard
- **Conversation Transcript**: Real-time display of user and AI interactions
- **Travel Insights Panel**: Shows top destinations, flight tips, and hotel advice
- **Connection Status**: Real-time quality and participant indicators
- **Responsive Design**: Works on desktop and mobile devices

### Visual Design
- Professional travel-themed color scheme (blues and reds)
- Clean, modern interface with intuitive controls
- Animated feedback for speaking indicators
- Card-based layout for information organization

## Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application with optimizations
│   ├── voice_agent.py       # Optimized LiveKit voice agent
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── react app/
│   ├── src/
│   │   ├── App.jsx          # Travel-themed React component
│   │   └── App.css          # Travel-themed styling
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Frontend environment variables
├── livekit.yaml             # LiveKit server configuration (for local development)
├── docker-compose.yml       # Docker Compose with performance settings
├── start-dev.bat            # Windows development script
└── README.md
```

## Implementation Details

### Voice Pipeline

1. **Speech-to-Text (STT)**: Deepgram Nova-3 with optimized endpointing
2. **AI Model (LLM)**: Google Gemini Pro with travel domain expertise
3. **Text-to-Speech (TTS)**: Cartesia Sonic-2 with high-quality voices

### Turn-taking Logic

The application implements turn-taking logic to:
- Detect when the user finishes speaking (200ms endpointing)
- Trigger AI response generation with minimal delay
- Prevent overlapping speech between user and AI
- Allow interruptions for natural conversation flow