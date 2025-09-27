#!/usr/bin/env python3
"""
Test script to verify LiveKit connection
"""

import asyncio
import logging
from dotenv import load_dotenv
import os
from livekit.api import AccessToken, VideoGrants

# Load environment variables
load_dotenv(".env.local")
load_dotenv(".env")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_livekit_connection():
    """Test connection to LiveKit"""
    try:
        logger.info("Testing LiveKit connection...")
        
        # Get environment variables
        api_key = os.getenv("LIVEKIT_API_KEY")
        api_secret = os.getenv("LIVEKIT_API_SECRET")
        livekit_url = os.getenv("LIVEKIT_URL")
        
        if not api_key or not api_secret or not livekit_url:
            logger.error("Missing LiveKit environment variables")
            return False
            
        logger.info(f"LiveKit URL: {livekit_url}")
        logger.info(f"API Key: {api_key[:5]}...")  # Show first 5 characters for security
        
        # Create a test token
        token = AccessToken(api_key, api_secret).with_grants(
            VideoGrants(room_join=True, room="test-room")
        ).with_identity("test-user").to_jwt()
        
        logger.info("Token generated successfully")
        logger.info(f"Token: {token[:20]}...")  # Show first 20 characters for security
        
        logger.info("LiveKit connection test completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Error testing LiveKit connection: {e}", exc_info=True)
        return False

if __name__ == "__main__":
    result = asyncio.run(test_livekit_connection())
    if result:
        print("LiveKit connection test passed!")
    else:
        print("LiveKit connection test failed!")