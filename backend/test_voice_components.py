#!/usr/bin/env python3
"""
Test script to verify voice components initialization
"""

import asyncio
import logging
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(".env.local")
load_dotenv(".env")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_components():
    """Test initialization of voice components"""
    try:
        logger.info("Testing component initialization...")
        
        # Import LiveKit components
        from livekit.plugins import cartesia, deepgram, silero, google
        
        # Test STT
        logger.info("Testing STT initialization...")
        stt = deepgram.STT(model="nova-3", language="multi")
        logger.info("STT initialized successfully")
        
        # Test LLM
        logger.info("Testing LLM initialization...")
        llm = google.LLM(model="gemini-2.0-flash-exp")
        logger.info("LLM initialized successfully")
        
        # Test TTS
        logger.info("Testing TTS initialization...")
        tts = cartesia.TTS(model="sonic-2", voice="f786b574-daa5-4673-aa0c-cbe3e8534c02")
        logger.info("TTS initialized successfully")
        
        # Test VAD
        logger.info("Testing VAD initialization...")
        vad = silero.VAD.load()
        logger.info("VAD initialized successfully")
        
        logger.info("All components initialized successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Error initializing components: {e}", exc_info=True)
        return False

if __name__ == "__main__":
    result = asyncio.run(test_components())
    if result:
        print("All components initialized successfully!")
    else:
        print("Component initialization failed!")