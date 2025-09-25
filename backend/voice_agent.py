import asyncio
import logging
from typing import Optional
from livekit import rtc
from livekit.agents import (
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
    stt,
    tts,
    transcription,
    ipc_encodings
)
from livekit.agents.pipeline import VoicePipelineAgent
from livekit.agents.voice_assistant import VoiceAssistant
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Initialize Google Gemini
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")
    
genai.configure(api_key=GOOGLE_API_KEY)
gemini_model = genai.GenerativeModel('gemini-pro')

# Try to import Deepgram and Cartesia plugins
try:
    from livekit.plugins import deepgram
    DEEPGRAM_AVAILABLE = True
except ImportError as e:
    logger.error(f"Failed to import Deepgram plugin: {e}")
    DEEPGRAM_AVAILABLE = False

try:
    from livekit.plugins import cartesia
    CARTESIA_AVAILABLE = True
except ImportError as e:
    logger.error(f"Failed to import Cartesia plugin: {e}")
    CARTESIA_AVAILABLE = False

class OptimizedVoiceAgent:
    def __init__(self, ctx: JobContext):
        self.ctx = ctx
        self.system_prompt = "You are a friendly travel assistant. Help users plan trips, recommend destinations, and provide travel advice. Be concise and helpful. Respond in under 30 seconds."
        
        # Initialize Deepgram STT with low latency settings
        if DEEPGRAM_AVAILABLE:
            self.stt = deepgram.STT(
                model="nova-3",  # Use the latest model for better accuracy
                language="en-US",
                smart_format=True,
                endpointing=200,  # Lower endpointing for faster response (milliseconds)
                utterance_end_ms=800,  # Faster utterance detection
            )
        else:
            logger.error("Deepgram plugin not available, falling back to default STT")
            self.stt = stt.STT()  # Fallback to default STT
        
        # Initialize Cartesia TTS
        if CARTESIA_AVAILABLE:
            self.tts = cartesia.TTS(
                model="sonic-2",  # Use the latest model
                voice="f786b574-daa5-4673-aa0c-cbe3e8534c02",  # Default voice ID
            )
        else:
            logger.error("Cartesia plugin not available, falling back to default TTS")
            self.tts = tts.TTS()  # Fallback to default TTS
        
        # Initialize voice assistant with optimized settings
        self.assistant = VoiceAssistant(
            vad=None,  # Using default VAD
            stt=self.stt,
            llm=self._llm_stream,
            tts=self.tts,
            system_prompt=self.system_prompt,
            # Optimized settings for low latency
            allow_interruptions=True,  # Allow interruptions for natural conversation
            interrupt_speech_duration=0.6,  # Faster interruption detection
            interrupt_min_words=3,  # Minimum words before interruption allowed
            min_endpointing_delay=0.1,  # Faster endpointing
        )
        
    async def start(self):
        # Connect to room with optimized settings
        await self.ctx.connect(
            auto_subscribe=rtc.TrackSubscriptionPolicy.SUBSCRIBE_ALL,
            rtc_config=rtc.RtcConfiguration(
                ice_servers=[
                    rtc.IceServer(urls=["stun:stun.l.google.com:19302"])
                ]
            )
        )
        
        # Start the assistant
        self.assistant.start(ctx=self.ctx)
        logger.info("Optimized voice agent started")
        
        # Set up participant callbacks
        self.ctx.room.on("participant_connected", self._on_participant_connected)
        self.ctx.room.on("participant_disconnected", self._on_participant_disconnected)
        
        # Keep the agent running
        try:
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            logger.info("Agent shutting down...")
            
    def _on_participant_connected(self, participant: rtc.RemoteParticipant):
        logger.info(f"Participant connected: {participant.identity}")
        
    def _on_participant_disconnected(self, participant: rtc.RemoteParticipant):
        logger.info(f"Participant disconnected: {participant.identity}")
        
    async def _llm_stream(self, chat_ctx: rtc.ChatContext):
        """Generate streaming response from Google Gemini with optimized performance"""
        # Convert chat context to Gemini format
        messages = []
        for msg in chat_ctx.messages:
            if msg.role == "system":
                # Add system prompt as a user message at the beginning
                messages.append({"role": "user", "parts": [msg.content]})
                messages.append({"role": "model", "parts": ["Understood. I'll help as a travel assistant with concise responses."]})
            elif msg.role == "user":
                messages.append({"role": "user", "parts": [msg.content]})
            elif msg.role == "assistant":
                messages.append({"role": "model", "parts": [msg.content]})
        
        # Add system prompt if not present
        if not any(msg["role"] == "user" and "travel assistant" in str(msg["parts"]) for msg in messages):
            messages.insert(0, {"role": "user", "parts": [self.system_prompt]})
            messages.insert(1, {"role": "model", "parts": ["Understood. I'll help as a travel assistant with concise responses."]})
        
        try:
            # Create the chat session with optimized parameters
            chat = gemini_model.start_chat(history=messages[:-1])  # Exclude the last user message
            
            # Get response for the latest user message
            user_message = messages[-1]["parts"][0] if messages else ""
            if user_message:
                # Use optimized generation config for lower latency
                response = await asyncio.get_event_loop().run_in_executor(
                    None, 
                    lambda: chat.send_message(
                        user_message, 
                        stream=True,
                        generation_config=genai.GenerationConfig(
                            max_output_tokens=200,  # Limit response length for faster generation
                            temperature=0.7,  # Balanced creativity
                            top_p=0.9,
                            top_k=40,
                        )
                    )
                )
                
                # Stream response with minimal buffering
                for chunk in response:
                    if chunk.text:
                        yield chunk.text
        except Exception as e:
            logger.error(f"Error in LLM stream: {e}")
            yield "I'm sorry, I encountered an error. Could you please repeat that?"

async def entrypoint(ctx: JobContext):
    agent = OptimizedVoiceAgent(ctx)
    await agent.start()

def process_work(process: JobProcess):
    # Any initialization code can go here
    pass

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, process_fnc=process_work))