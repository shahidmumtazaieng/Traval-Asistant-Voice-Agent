#!/usr/bin/env python3
"""
Diagnostic script to check the environment and dependencies
"""

import sys
import os

print("=== Python Environment Diagnostic ===")
print(f"Python version: {sys.version}")
print(f"Python executable: {sys.executable}")
print(f"Current working directory: {os.getcwd()}")

print("\n=== Environment Variables ===")
important_vars = [
    "PATH",
    "PYTHONPATH",
    "VIRTUAL_ENV",
    "LIVEKIT_URL",
    "LIVEKIT_API_KEY",
    "LIVEKIT_API_SECRET"
]

for var in important_vars:
    value = os.environ.get(var, "Not set")
    if var in ["LIVEKIT_API_KEY", "LIVEKIT_API_SECRET"] and value != "Not set":
        # Mask sensitive information
        value = f"{value[:5]}...{value[-5:]}" if len(value) > 10 else "***"
    print(f"{var}: {value}")

print("\n=== Installed Packages ===")
try:
    import pkg_resources
    installed_packages = [d.project_name for d in pkg_resources.working_set]
    required_packages = [
        "fastapi",
        "uvicorn",
        "livekit",
        "livekit-agents",
        "livekit-api",
        "livekit-plugins-deepgram",
        "livekit-plugins-google",
        "livekit-plugins-cartesia",
        "livekit-plugins-silero",
        "livekit-plugins-turn-detector",
        "python-dotenv",
        "pydantic"
    ]
    
    for package in required_packages:
        if package in installed_packages:
            print(f"✓ {package}")
        else:
            print(f"✗ {package} (NOT INSTALLED)")
            
except Exception as e:
    print(f"Error checking packages: {e}")

print("\n=== Testing Imports ===")
modules_to_test = [
    "fastapi",
    "uvicorn",
    "livekit",
    "livekit.agents",
    "livekit.api",
    "dotenv"
]

for module in modules_to_test:
    try:
        __import__(module)
        print(f"✓ {module}")
    except ImportError as e:
        print(f"✗ {module}: {e}")

print("\n=== Network Test ===")
try:
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', 8000))
    if result == 0:
        print("✗ Port 8000 is already in use")
    else:
        print("✓ Port 8000 is available")
    sock.close()
except Exception as e:
    print(f"Error testing network: {e}")

print("\nDiagnostic completed.")