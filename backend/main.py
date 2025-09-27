import os
import sys
from dotenv import load_dotenv

# Load environment variables first

load_dotenv(".env")  # Also try to load .env if .env.local doesn't exist

# Only import FastAPI components at module level
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Dict, Any
from pydantic import BaseModel

# Import LiveKit API components for token generation
from livekit.api import AccessToken, VideoGrants
import uuid
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Business Travel Assistant API", version="1.0.0")

# Add CORS middleware to allow frontend connections
frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

# Configure CORS origins
if frontend_origin == "*":
    # Development - allow all origins
    origins = ["*"]
    logger.info("CORS configured for development (allowing all origins)")
else:
    # Production - allow specific origin
    origins = [frontend_origin]
    logger.info(f"CORS configured for production (allowing origin: {frontend_origin})")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class SessionRequest(BaseModel):
    user_id: str
    preferences: Dict[str, Any] = {}

class SessionResponse(BaseModel):
    session_id: str
    status: str
    message: str

class TravelQuery(BaseModel):
    query: str
    context: Dict[str, Any] = {}

class TravelResponse(BaseModel):
    response: str
    action_required: bool = False
    action_type: str = ""

# Define the Assistant class without LiveKit dependencies
class Assistant:
    def __init__(self) -> None:
        # Enhanced system prompt for business travel assistant
        self.instructions = """You are a professional business travel assistant. 
        Your role is to help business travelers with:
        1. Flight bookings and itinerary management
        2. Hotel reservations and recommendations
        3. Transportation arrangements (taxis, rideshares, car rentals)
        4. Travel expense tracking and reporting
        5. Visa and documentation guidance
        6. Weather updates for destinations
        7. Currency conversion and payment methods
        8. Business meeting scheduling across time zones
        9. Local business services and facilities
        10. Emergency assistance during travel
        
        Always be concise, professional, and helpful. 
        Ask clarifying questions when needed.
        Focus on business travel needs specifically."""

# Only import LiveKit when needed (inside functions)
def get_livekit_components():
    """Safely import LiveKit components to avoid multiprocessing issues"""
    try:
        from livekit import agents
        from livekit.agents import AgentSession, Agent, RoomInputOptions, WorkerOptions
        from livekit.plugins import (
            cartesia,
            deepgram,
            silero,
            google,
        )
        from livekit.plugins.turn_detector.multilingual import MultilingualModel
        return agents, AgentSession, Agent, RoomInputOptions, cartesia, deepgram, silero, MultilingualModel, google, WorkerOptions
    except ImportError as e:
        print(f"LiveKit import error: {e}")
        return None, None, None, None, None, None, None, None, None, None

async def entrypoint(ctx):
    """LiveKit agent entrypoint - only called when RUN_AGENT=true"""
    # Import LiveKit components only when needed
    agents, AgentSession, Agent, RoomInputOptions, cartesia, deepgram, silero, MultilingualModel, google, _ = get_livekit_components()
    
    if not agents:
        print("LiveKit components not available")
        return
    
    class LiveKitAssistant(Agent):
        def __init__(self) -> None:
            super().__init__(instructions="""You are a professional business travel assistant. 
            Your role is to help business travelers with:
            1. Flight bookings and itinerary management
            2. Hotel reservations and recommendations
            3. Transportation arrangements (taxis, rideshares, car rentals)
            4. Travel expense tracking and reporting
            5. Visa and documentation guidance
            6. Weather updates for destinations
            7. Currency conversion and payment methods
            8. Business meeting scheduling across time zones
            9. Local business services and facilities
            10. Emergency assistance during travel
            
            Always be concise, professional, and helpful. 
            Ask clarifying questions when needed.
            Focus on business travel needs specifically.""")

    session = AgentSession(
        stt=deepgram.STT(model="nova-3", language="multi"),
        llm=google.LLM(model="gemini-2.0-flash-exp"),
        tts=cartesia.TTS(model="sonic-2", voice="f786b574-daa5-4673-aa0c-cbe3e8534c02"),
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )

    await session.start(
        room=ctx.room,
        agent=LiveKitAssistant(),
        room_input_options=RoomInputOptions(),
    )

    await session.generate_reply(
        instructions="Welcome to your business travel assistant. How can I help with your travel plans today?"
    )

# FastAPI routes
@app.get("/")
async def root():
    return {"message": "Business Travel Assistant API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/token")
async def get_token():
    """Generate a token for LiveKit connection"""
    try:
        # Log the environment variables for debugging
        api_key = os.getenv("LIVEKIT_API_KEY")
        api_secret = os.getenv("LIVEKIT_API_SECRET")
        
        if not api_key or not api_secret:
            logger.error("LIVEKIT_API_KEY or LIVEKIT_API_SECRET not found in environment variables")
            return {"error": "LiveKit API credentials not configured"}
            
        logger.info(f"Generating token with API key: {api_key[:5]}...")  # Log first 5 chars for security
        
        # Create access token with optimized settings
        token = AccessToken(
            api_key=api_key,
            api_secret=api_secret,
        ).with_identity(f"user_{uuid.uuid4().hex}").with_grants(
            VideoGrants(
                room_join=True,
                room="business-travel-room",
            )
        ).to_jwt()
        
        logger.info("Token generated successfully")
        return {"token": token, "room": "business-travel-room"}
    except Exception as e:
        logger.error(f"Error generating token: {e}")
        return {"error": f"Failed to generate token: {str(e)}"}

@app.post("/session/start", response_model=SessionResponse)
async def start_session(request: SessionRequest):
    """Initialize a new travel assistant session"""
    return SessionResponse(
        session_id=f"session_{request.user_id}",
        status="active",
        message="Travel assistant session started successfully"
    )

@app.post("/session/end", response_model=SessionResponse)
async def end_session(request: SessionRequest):
    """End the current travel assistant session"""
    return SessionResponse(
        session_id=f"session_{request.user_id}",
        status="inactive",
        message="Travel assistant session ended successfully"
    )

@app.post("/travel/query", response_model=TravelResponse)
async def handle_travel_query(query: TravelQuery):
    """Handle travel-related queries"""
    return TravelResponse(
        response=f"I understand you're asking about: {query.query}. I'll help you with that as a business travel assistant.",
        action_required=False
    )

@app.get("/travel/destinations")
async def get_popular_destinations():
    """Get list of popular business travel destinations"""
    return {
        "destinations": [
            {"name": "New York", "country": "USA", "business_index": 9.5},
            {"name": "London", "country": "UK", "business_index": 9.3},
            {"name": "Tokyo", "country": "Japan", "business_index": 9.0},
            {"name": "Singapore", "country": "Singapore", "business_index": 9.2},
            {"name": "Frankfurt", "country": "Germany", "business_index": 8.8},
        ]
    }

@app.get("/travel/services")
async def get_travel_services():
    """Get list of available travel services"""
    return {
        "services": [
            {"id": "flights", "name": "Flight Booking", "description": "Book business class flights"},
            {"id": "hotels", "name": "Hotel Reservations", "description": "Reserve business-friendly hotels"},
            {"id": "transport", "name": "Transportation", "description": "Arrange airport transfers and local transport"},
            {"id": "visa", "name": "Visa Assistance", "description": "Get visa requirements and assistance"},
            {"id": "expenses", "name": "Expense Tracking", "description": "Track and report travel expenses"},
        ]
    }

if __name__ == "__main__":
    # If running directly, start the LiveKit agent
    if os.getenv("RUN_AGENT", "false").lower() == "true":
        # Import LiveKit components only when needed for the agent
        agents, _, _, _, _, _, _, _, _, WorkerOptions = get_livekit_components()
        if agents and WorkerOptions:
            agents.cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
        else:
            print("LiveKit components not available. Cannot start agent.")
            sys.exit(1)
    else:
        # Otherwise run the FastAPI server
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)