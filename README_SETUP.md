# Business Travel Voice Assistant - Setup Guide

## Prerequisites

1. Python 3.8 or higher
2. Node.js 14 or higher
3. npm (Node Package Manager)
4. Git

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

Make sure your `.env` file in the `backend` directory contains all required API keys:

```env
# LiveKit Configuration
LIVEKIT_URL=wss://traval-asistent-t0ab2743.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# Deepgram Configuration
DEEPGRAM_API_KEY=your_deepgram_api_key

# Cartesia Configuration
CARTESIA_API_KEY=your_cartesia_api_key

# Google Gemini Configuration
GOOGLE_API_KEY=your_google_api_key

# CORS Configuration
FRONTEND_ORIGIN=http://localhost:3000

# Development Mode
ENVIRONMENT=development
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd "react app"

# Install dependencies
npm install
```

### 4. Frontend Environment Configuration

Make sure your `.env` file in the `react app` directory contains:

```env
# LiveKit Configuration
VITE_LIVEKIT_URL=wss://traval-asistent-t0ab2743.livekit.cloud
VITE_API_URL=http://localhost:8000

# Development Mode
NODE_ENV=development
```

## Running the Application

### Option 1: Using Docker Compose (Recommended)

```bash
# From the root directory
docker-compose up
```

### Option 2: Manual Startup

You need to run three separate terminal windows:

**Terminal 1: Backend API Server**
```bash
# Run the provided batch file
start-backend-proper.bat
```

**Terminal 2: Voice Agent**
```bash
# Run the provided batch file
start-voice-agent-proper.bat
```

**Terminal 3: Frontend**
```bash
cd "react app"
npm run dev
```

### Option 3: Manual Startup (Command Line)

**Terminal 1: Backend API Server**
```bash
cd backend
python main.py
```

**Terminal 2: Voice Agent**
```bash
cd backend
set RUN_AGENT=true
python voice_agent.py dev
```

**Terminal 3: Frontend**
```bash
cd "react app"
npm run dev
```

## Troubleshooting

### Common Issues and Solutions

1. **"Connection closed: Unknown reason (Code: 1006)" Error**
   - Ensure the voice agent is running
   - Check that all environment variables are correctly set
   - Verify that the LiveKit credentials are valid
   - Make sure no firewall is blocking the connections

2. **ModuleNotFoundError**
   - Ensure you've activated the virtual environment
   - Reinstall dependencies with `pip install -r requirements.txt`

3. **Port Conflicts**
   - Make sure ports 8000 (backend) and 3000 (frontend) are not in use
   - You can change the ports in the configuration files if needed

4. **CORS Errors**
   - Check that `FRONTEND_ORIGIN` in the backend `.env` matches your frontend URL
   - Ensure the backend server is running when accessing the frontend

### Testing the Backend API

You can test if the backend is working properly:

```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test token generation
curl http://localhost:8000/api/token
```

### Testing the Voice Agent

To verify the voice agent is working:

1. Check the terminal where you started the voice agent for any error messages
2. Look for log messages indicating successful connection to LiveKit
3. Ensure all required API keys are properly configured

## Architecture Overview

The application consists of three main components:

1. **Frontend** (React) - User interface for the voice assistant
2. **Backend API** (FastAPI) - REST API that serves the frontend and generates LiveKit tokens
3. **Voice Agent** (LiveKit Agents) - Real-time voice processing component

The communication flow:
1. Frontend requests a token from the backend
2. Backend generates and returns a LiveKit token
3. Frontend connects to LiveKit using the token
4. LiveKit routes the voice connection to the Voice Agent
5. Voice Agent processes voice input and generates responses

## API Endpoints

### Backend Endpoints

- `GET /` - Health check
- `GET /api/health` - Health check
- `GET /api/token` - Generate LiveKit token
- `POST /session/start` - Start a new session
- `POST /session/end` - End a session
- `POST /travel/query` - Process travel queries
- `GET /travel/destinations` - Get popular destinations
- `GET /travel/services` - Get available services

## Environment Variables

### Backend

| Variable | Description | Required |
|----------|-------------|----------|
| `LIVEKIT_URL` | LiveKit server URL | Yes |
| `LIVEKIT_API_KEY` | LiveKit API key | Yes |
| `LIVEKIT_API_SECRET` | LiveKit API secret | Yes |
| `DEEPGRAM_API_KEY` | Deepgram API key | Yes |
| `CARTESIA_API_KEY` | Cartesia API key | Yes |
| `GOOGLE_API_KEY` | Google API key | Yes |
| `FRONTEND_ORIGIN` | Frontend origin for CORS | Yes |

### Frontend

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_LIVEKIT_URL` | LiveKit server URL | Yes |
| `VITE_API_URL` | Backend API URL | Yes |