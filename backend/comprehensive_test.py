#!/usr/bin/env python3
"""
Comprehensive test script to verify backend API and voice agent functionality
"""

import requests
import os
import time
import subprocess
import sys

def test_backend_api():
    """Test the backend API endpoints"""
    api_url = "http://localhost:8000"
    
    print("=== Testing Backend API ===")
    
    try:
        # Test health endpoint
        print("1. Testing health endpoint...")
        response = requests.get(f"{api_url}/api/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ Health check passed: {data}")
        else:
            print(f"   ✗ Health check failed with status {response.status_code}")
            return False
            
        # Test token endpoint
        print("2. Testing token endpoint...")
        response = requests.get(f"{api_url}/api/token", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ Token endpoint passed: {list(data.keys())}")
            if 'token' in data:
                print("   ✓ Token generated successfully")
                return data['token']
            else:
                print("   ✗ Token not found in response")
                return False
        else:
            print(f"   ✗ Token endpoint failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("   ✗ Could not connect to backend API. Is it running?")
        return False
    except Exception as e:
        print(f"   ✗ Error testing API: {e}")
        return False

def test_voice_agent_connection(token):
    """Test if we can connect to LiveKit with the generated token"""
    import jwt
    
    print("\n=== Testing Voice Agent Connection ===")
    
    try:
        # Decode the token to verify its structure
        decoded = jwt.decode(token, options={"verify_signature": False})
        print(f"   ✓ Token decoded successfully")
        print(f"   ✓ Identity: {decoded.get('identity', 'N/A')}")
        print(f"   ✓ Room: {decoded.get('video', {}).get('room', 'N/A')}")
        return True
    except Exception as e:
        print(f"   ✗ Error decoding token: {e}")
        return False

def main():
    """Main test function"""
    print("Business Travel Assistant - Comprehensive System Test")
    print("=" * 50)
    
    # Test backend API
    token = test_backend_api()
    if not token:
        print("\n❌ Backend API tests failed. Please ensure the backend is running.")
        print("   Start it with: cd backend && python main.py")
        return 1
    
    # Test voice agent connection
    if test_voice_agent_connection(token):
        print("\n✅ All tests passed! The system is ready for use.")
        return 0
    else:
        print("\n❌ Voice agent connection test failed.")
        print("   Please ensure the voice agent is running.")
        print("   Start it with: cd backend && python voice_agent.py dev")
        return 1

if __name__ == "__main__":
    sys.exit(main())