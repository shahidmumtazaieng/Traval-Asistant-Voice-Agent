# Business TravelVoice AI

An enterprise-level Voice AI Conversational Agent for business travel assistance, built with LiveKit, FastAPI (Python) backend, and React frontend. This application enables real-time, natural voice conversations with an AI business travel assistant optimized for low latency and high accuracy.

## Features

- **Real-time Voice Conversation**: Enterprise-grade voice communication with AI business travel assistant
- **Professional Assistant Interface**: Clean UI with customer support representative visualization
- **Optimized Voice Pipeline**: Low-latency STT → LLM → TTS with accuracy enhancements
- **Business Travel Focus**: Specialized in flight bookings, hotel reservations, and travel logistics
- **Turn-taking Logic**: Prevents overlapping speech for natural conversation flow
- **Performance Optimized**: Configured for minimal latency and maximum responsiveness
- **LiveKit Integration**: Real-time audio streaming with adaptive streaming

## Tech Stack

- **Backend**: FastAPI (Python) with performance optimizations
- **Frontend**: React with Vite and business travel-themed UI
- **Real-time Communication**: LiveKit Cloud Service
- **AI Services**: 
  - Google Gemini (LLM)
  - Deepgram (STT)
  - Cartesia (TTS)
  - Multilingual Turn Detection

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
- Context-aware LLM responses with business travel domain expertise

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

### Quick Start with Windows Batch Script

For Windows users, you can use the provided batch script to start all services:

1. Update the `.env` files with your credentials (see Manual Setup section below)
2. Run the development script:
   ```cmd
   start-dev.bat
   ```

This will automatically start:
- Backend API server
- Voice agent
- Frontend development server

Note: Make sure you have Python, Node.js, and LiveKit server installed and added to your PATH.

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

4. Create a `.env` file in the backend directory with your credentials:
   ```env
   # LiveKit Configuration
   LIVEKIT_API_KEY=devkey
   LIVEKIT_API_SECRET=secret
   LIVEKIT_URL=wss://your-livekit-url

   # Google Configuration (required)
   GOOGLE_API_KEY=your_google_api_key_here

   # Deepgram Configuration
   DEEPGRAM_API_KEY=your_deepgram_api_key_here

   # Cartesia Configuration
   CARTESIA_API_KEY=your_cartesia_api_key_here

   # CORS Configuration
   FRONTEND_ORIGIN=http://localhost:3000

   # Development Mode
   ENVIRONMENT=development
   ```

5. Run the backend API server:
   ```bash
   python main.py
   ```

6. In a separate terminal, run the LiveKit voice agent:
   ```bash
   python voice_agent.py
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
   # LiveKit Configuration
   VITE_LIVEKIT_URL=wss://your-livekit-url
   VITE_API_URL=http://localhost:8000

   # Development Mode
   NODE_ENV=development
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

## Vercel Deployment

This project is configured for deployment on Vercel with proper CORS handling. See detailed instructions in:
- [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)
- [CORS System Design](CORS_DESIGN.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

Key features:
- Separate deployment of frontend and backend
- Environment-based configuration
- Secure CORS implementation
- Vercel-specific optimizations

## Usage

1. Start both the backend API server and voice agent
2. Start the frontend development server
3. Open your browser to `http://localhost:3000`
4. Navigate to the voice assistant page
5. Click the microphone button to start speaking
6. The AI will respond with voice and text transcript
7. View travel insights in the dashboard panel

## Enterprise UI Features

### Travel Dashboard
- **Conversation Transcript**: Real-time display of user and AI interactions
- **Travel Insights Panel**: Shows business travel recommendations and tips
- **Connection Status**: Real-time quality and participant indicators
- **Responsive Design**: Works on desktop and mobile devices

### Visual Design
- Professional business travel-themed color scheme (blues and purples)
- Clean, modern interface with intuitive controls
- Animated feedback for speaking indicators
- Card-based layout for information organization

## Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application with optimizations
│   ├── voice_agent.py       # LiveKit voice agent implementation
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── react app/
│   ├── src/
│   │   ├── App.jsx          # Business travel-themed React component
│   │   └── App.css          # Business travel-themed styling
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
2. **AI Model (LLM)**: Google Gemini Pro with business travel domain expertise
3. **Text-to-Speech (TTS)**: Cartesia with professional voice
4. **Turn Detection**: Multilingual turn detection for natural conversation flow

### Turn-taking Logic

The application implements turn-taking logic to:
- Detect when the user finishes speaking (200ms endpointing)
- Trigger AI response generation with minimal delay
- Prevent overlapping speech between user and AI
- Allow interruptions for natural conversation flow

### Assistant Interface

The application features a professional customer support interface:
- Clean visualization with business-themed color scheme
- Audio visualization bars for real-time feedback
- Professional voice for business communication
- Responsive design for all device types