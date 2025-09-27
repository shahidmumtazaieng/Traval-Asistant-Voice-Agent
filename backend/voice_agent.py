#!/usr/bin/env python3
"""
Voice Agent for Business Travel Assistant
This script runs the LiveKit voice agent that handles real-time voice processing.
"""

import asyncio
import logging
import os
import sys
from dotenv import load_dotenv
import argparse

# Load environment variables
load_dotenv(".env.local")
load_dotenv(".env")

# Configure logging first
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import LiveKit components
try:
    from livekit import agents
    from livekit.agents import AutoSubscribe, JobContext, WorkerOptions
    from livekit.plugins import cartesia, deepgram, silero, google
    
    # Only import turn detector if available
    try:
        from livekit.plugins.turn_detector.multilingual import MultilingualModel
        TURN_DETECTOR_AVAILABLE = True
    except ImportError:
        TURN_DETECTOR_AVAILABLE = False
        logger.warning("Turn detector not available, using default settings")
        
    LIVEKIT_AVAILABLE = True
except ImportError as e:
    logger.error(f"LiveKit import error: {e}")
    LIVEKIT_AVAILABLE = False

class BusinessTravelAssistant:
    def __init__(self) -> None:
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

async def entrypoint(ctx: JobContext):
    """Entrypoint for the LiveKit voice agent"""
    logger.info("Starting Business Travel Assistant voice agent")
    
    try:
        # Connect to the room first
        logger.info("Connecting to room...")
        await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)
        logger.info("Connected to room successfully")
        
        # Initialize components with error handling
        logger.info("Initializing STT component...")
        stt = deepgram.STT(model="nova-3", language="multi")
        
        logger.info("Initializing LLM component...")
        llm_agent = google.LLM(model="gemini-2.0-flash-exp")
        
        logger.info("Initializing TTS component...")
        tts = cartesia.TTS(model="sonic-2", voice="f786b574-daa5-4673-aa0c-cbe3e8534c02")
        
        logger.info("Loading VAD component...")
        vad = silero.VAD.load()
        
        # Create the agent session with all components
        session_args = {
            "stt": stt,
            "llm": llm_agent,
            "tts": tts,
            "vad": vad,
        }
        
        # Add turn detection if available
        if TURN_DETECTOR_AVAILABLE:
            logger.info("Initializing turn detection...")
            session_args["turn_detection"] = MultilingualModel()
        else:
            logger.warning("Running without turn detection")
        
        logger.info("Creating agent session...")
        session = agents.AgentSession(**session_args)
        
        # Start the session
        logger.info("Starting session...")
        await session.start(
            room=ctx.room,
            agent=BusinessTravelAssistant(),
        )
        
        # Generate initial reply
        logger.info("Generating initial reply...")
        await session.generate_reply(
            instructions="Welcome to your business travel assistant. How can I help with your travel plans today?"
        )
        
        logger.info("Business Travel Assistant voice agent started successfully")
        
        # Keep the agent running
        try:
            while True:
                await asyncio.sleep(1)
        except asyncio.CancelledError:
            logger.info("Voice agent shutting down...")
            await session.aclose()
        
    except Exception as e:
        logger.error(f"Error starting voice agent: {e}", exc_info=True)
        raise

def main():
    """Main entry point"""
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Business Travel Assistant Voice Agent")
    parser.add_argument("command", nargs="?", default="start", choices=["start", "dev"], 
                       help="Command to run (start or dev)")
    
    args = parser.parse_args()
    
    logger.info(f"Initializing Business Travel Assistant voice agent with command: {args.command}")
    
    if not LIVEKIT_AVAILABLE:
        logger.error("LiveKit components not available. Please check your installation.")
        sys.exit(1)
    
    try:
        # Run the agent with simplified options
        logger.info("Starting LiveKit worker...")
        agents.cli.run_app(WorkerOptions(
            entrypoint_fnc=entrypoint
        ))
    except Exception as e:
        logger.error(f"Failed to start voice agent: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()