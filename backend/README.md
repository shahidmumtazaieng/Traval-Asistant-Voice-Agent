# Backend Setup

## Environment Variables

Create a `.env` file in this directory with the following variables:

```env
# LiveKit Configuration
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-url

# Google Configuration
GOOGLE_API_KEY=your_google_api_key

# Deepgram Configuration
DEEPGRAM_API_KEY=your_deepgram_api_key

# Cartesia Configuration
CARTESIA_API_KEY=your_cartesia_api_key

# CORS Configuration
FRONTEND_ORIGIN=http://localhost:3000
```

## Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Option 1: Run the FastAPI server only
```bash
python main.py
```

### Option 2: Run the LiveKit voice agent only
```bash
python voice_agent.py
```

The voice agent will connect to LiveKit and handle voice processing using the STT → LLM → TTS pipeline.

## API Endpoints

- `GET /` - Health check endpoint
- `GET /api/health` - Health check endpoint
- `GET /api/token` - Generate LiveKit token
- `POST /session/start` - Start a new travel assistant session
- `POST /session/end` - End a travel assistant session
- `POST /travel/query` - Handle travel-related queries
- `GET /travel/destinations` - Get popular business travel destinations
- `GET /travel/services` - Get available travel services

## Development

The backend is structured to support both:
1. Traditional FastAPI REST API endpoints
2. LiveKit voice agent for real-time voice processing

The code is organized to avoid multiprocessing issues by conditionally importing LiveKit components only when needed.