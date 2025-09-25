from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
import asyncio
import json
import logging
from typing import Dict
import uuid
from livekit.api import AccessToken, VideoGrants

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app with optimized settings
app = FastAPI(
    title="Enterprise TravelVoice AI",
    description="Voice AI Conversational Agent for Travel Assistance",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add CORS middleware with optimized settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

# In-memory storage for sessions (in production, use a database)
sessions: Dict[str, dict] = {}

# Health check endpoint
@app.get("/health", summary="Health Check", description="Check if the service is running")
async def health_check():
    return JSONResponse(
        content={"status": "healthy", "service": "TravelVoice AI Backend"},
        status_code=200
    )

# Root endpoint
@app.get("/", summary="API Root", description="Welcome message and API information")
async def root():
    return JSONResponse(
        content={
            "message": "Welcome to Enterprise TravelVoice AI API",
            "version": "1.0.0",
            "documentation": "/docs",
        },
        status_code=200
    )

# Token generation endpoint
@app.get("/api/token", summary="Generate LiveKit Token", description="Generate a token for LiveKit connection")
async def get_token():
    """Generate a token for LiveKit connection"""
    try:
        # Log the environment variables for debugging
        api_key = os.getenv("LIVEKIT_API_KEY", "devkey")
        api_secret = os.getenv("LIVEKIT_API_SECRET", "secret")
        logger.info(f"Generating token with API key: {api_key[:5]}...")  # Log first 5 chars for security
        
        # Create access token with optimized settings
        token = AccessToken(
            api_key=api_key,
            api_secret=api_secret,
        ).with_identity(f"user_{uuid.uuid4().hex}").with_grants(
            VideoGrants(
                room_join=True,
                room="travel-voice-room",
            )
        ).to_jwt()
        
        logger.info("Token generated successfully")
        return JSONResponse(
            content={"token": token, "room": "travel-voice-room"},
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error generating token: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate token")

# WebSocket endpoint for real-time communication
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time communication"""
    await websocket.accept()
    session_id = str(uuid.uuid4())
    sessions[session_id] = {"websocket": websocket, "transcript": []}
    
    try:
        # Send connection confirmation
        await websocket.send_text(json.dumps({"type": "connected", "session_id": session_id}))
        
        while True:
            data = await websocket.receive_text()
            # Process incoming messages
            await process_websocket_message(session_id, data, websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        if session_id in sessions:
            del sessions[session_id]

async def process_websocket_message(session_id: str, message: str, websocket: WebSocket):
    """Process incoming WebSocket messages"""
    try:
        data = json.loads(message)
        message_type = data.get("type")
        
        if message_type == "start_listening":
            # Notify client that listening has started
            await websocket.send_text(json.dumps({"type": "listening_started"}))
            
        elif message_type == "stop_listening":
            # Notify client that listening has stopped
            await websocket.send_text(json.dumps({"type": "listening_stopped"}))
            
        elif message_type == "user_transcript":
            # Handle user transcript
            transcript = data.get("transcript", "")
            sessions[session_id]["transcript"].append({"speaker": "user", "text": transcript})
            
            # Notify client that we're processing
            await websocket.send_text(json.dumps({"type": "processing_started"}))
            
            # Here you would typically call your LLM to generate a response
            # For now, we'll simulate a response with a delay
            await asyncio.sleep(1)  # Simulate processing time
            ai_response = f"I heard you say: {transcript}. This is a simulated response from the backend."
            sessions[session_id]["transcript"].append({"speaker": "ai", "text": ai_response})
            
            # Send AI response back to client
            await websocket.send_text(
                json.dumps({"type": "ai_response", "text": ai_response})
            )
            
        elif message_type == "text_message":
            # Handle text messages
            text_content = data.get("content", "")
            sessions[session_id]["transcript"].append({"speaker": "user", "text": text_content})
            
            # Notify client that we're processing
            await websocket.send_text(json.dumps({"type": "processing_started"}))
            
            # Simulate processing time
            await asyncio.sleep(1)  # Simulate processing time
            ai_response = f"I received your message: {text_content}. This is a simulated response."
            sessions[session_id]["transcript"].append({"speaker": "ai", "text": ai_response})
            
            # Send AI response back to client
            await websocket.send_text(
                json.dumps({"type": "ai_response", "text": ai_response})
            )
            
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        await websocket.send_text(json.dumps({"type": "error", "message": "Error processing message"}))

# Optimization: Add middleware for request compression
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host=os.getenv("HOST", "0.0.0.0"), 
        port=int(os.getenv("PORT", 8000)),
        log_level="info",
        workers=1,  # Adjust based on your server capacity
    )