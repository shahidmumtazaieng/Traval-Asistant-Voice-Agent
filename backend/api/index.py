# Vercel serverless function entry point for FastAPI app
import os
import sys
from fastapi import FastAPI
from mangum import Mangum

# Add parent directory to path so we can import main
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the FastAPI app from main.py
from main import app

# Create a Mangum handler for AWS Lambda/Vercel compatibility
handler = Mangum(app, lifespan="off")