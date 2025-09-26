# Vercel Deployment Guide

This guide explains how to deploy the TravelVoice AI application on Vercel with proper CORS configuration.

## Prerequisites

1. Vercel account (https://vercel.com)
2. GitHub/GitLab/Bitbucket account for code hosting
3. API keys for:
   - LiveKit
   - Deepgram
   - Cartesia
   - Google Gemini

## Deployment Steps

### 1. Frontend Deployment (React App)

1. Navigate to the `react app` directory:
   ```bash
   cd "react app"
   ```

2. Update the `.env.production` file with your actual API URLs:
   ```env
   VITE_API_URL=https://your-backend-domain.vercel.app
   VITE_LIVEKIT_URL=wss://your-livekit-url
   ```

3. Deploy to Vercel:
   ```bash
   # Install Vercel CLI if not already installed
   npm install -g vercel
   
   # Deploy the frontend
   vercel --prod
   ```

### 2. Backend Deployment (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Update the `vercel.json` file with your frontend domain:
   ```json
   {
     "env": {
       "FRONTEND_ORIGIN": "https://your-frontend-domain.vercel.app"
     }
   }
   ```

3. Set environment variables in Vercel dashboard:
   - LIVEKIT_URL
   - LIVEKIT_API_KEY
   - LIVEKIT_API_SECRET
   - DEEPGRAM_API_KEY
   - CARTESIA_API_KEY
   - GOOGLE_API_KEY
   - HOST (should be 0.0.0.0)
   - PORT (should be 8000)

4. Deploy to Vercel:
   ```bash
   # From the backend directory
   vercel --prod
   ```

## CORS Configuration

The application is configured with proper CORS settings:

- Frontend uses environment variables for API URLs
- Backend allows specified origins via the `FRONTEND_ORIGIN` environment variable
- Default CORS settings allow all origins for development

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_LIVEKIT_URL=ws://localhost:7880
```

### Backend (Vercel Environment Variables)
```env
LIVEKIT_URL=wss://your-livekit-url
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
DEEPGRAM_API_KEY=your_deepgram_api_key
CARTESIA_API_KEY=your_cartesia_api_key
GOOGLE_API_KEY=your_google_api_key
HOST=0.0.0.0
PORT=8000
FRONTEND_ORIGIN=https://your-frontend-domain.vercel.app
```

## Notes

1. WebSocket connections may require additional configuration on Vercel
2. For production, replace wildcard CORS settings with specific domains
3. Ensure all API keys are properly secured and not exposed in client-side code
4. The voice agent (`voice_agent.py`) needs to run separately as a background service