# Vercel Deployment Checklist

## Frontend Deployment (React App)

### Files Created/Modified:
- [x] `vercel.json` - Vercel configuration for static site deployment
- [x] `.env` - Development environment variables
- [x] `.env.production` - Production environment variables
- [x] Updated `useBackendVoiceAssistant.js` to use environment variables

### Deployment Steps:
1. Push code to GitHub/GitLab/Bitbucket
2. Import project to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` - Backend API URL
   - `VITE_LIVEKIT_URL` - LiveKit WebSocket URL
4. Deploy

## Backend Deployment (FastAPI)

### Files Created/Modified:
- [x] `vercel.json` - Vercel configuration for Python API
- [x] `api/index.py` - Vercel entry point with Mangum adapter
- [x] `api/test.py` - Simple test endpoint
- [x] `requirements-vercel.txt` - Minimal requirements for Vercel
- [x] Updated `main.py` with improved CORS and health check endpoint

### Deployment Steps:
1. Push code to GitHub/GitLab/Bitbucket
2. Import project to Vercel
3. Set environment variables in Vercel dashboard:
   - `LIVEKIT_URL` - LiveKit WebSocket URL
   - `LIVEKIT_API_KEY` - LiveKit API Key
   - `LIVEKIT_API_SECRET` - LiveKit API Secret
   - `DEEPGRAM_API_KEY` - Deepgram API Key
   - `CARTESIA_API_KEY` - Cartesia API Key
   - `GOOGLE_API_KEY` - Google API Key
   - `FRONTEND_ORIGIN` - Frontend domain for CORS
4. Deploy

## CORS Configuration

The application now properly handles CORS with:
1. Environment-based origin configuration
2. Proper preflight request handling
3. Secure headers in frontend configuration

## WebSocket Considerations

Note that WebSocket connections may require additional configuration on Vercel as they have limitations with long-running connections. For production deployments, consider:
1. Using a dedicated WebSocket service
2. Deploying the voice agent separately
3. Using serverless WebSocket providers

## Testing Deployment

After deployment:
1. Visit the frontend URL
2. Check that API calls work (`/api/health` endpoint)
3. Verify CORS headers are properly set
4. Test token generation endpoint
5. Confirm environment variables are correctly set

## Troubleshooting

Common issues:
1. CORS errors - Check FRONTEND_ORIGIN environment variable
2. API connection failures - Verify VITE_API_URL in frontend
3. Missing environment variables - Check Vercel dashboard settings
4. WebSocket connection issues - May require alternative deployment approach