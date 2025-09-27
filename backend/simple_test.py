#!/usr/bin/env python3
"""
Simple test script to check if backend API is accessible
"""

import requests
import time

def test_api():
    """Test if the backend API is running"""
    api_url = "http://localhost:8000"
    
    print("Testing if backend API is running...")
    
    try:
        # Test root endpoint
        print("1. Testing root endpoint...")
        response = requests.get(f"{api_url}/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ Root endpoint: {data}")
        else:
            print(f"   ✗ Root endpoint failed with status {response.status_code}")
            
        # Test health endpoint
        print("2. Testing health endpoint...")
        response = requests.get(f"{api_url}/api/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ Health endpoint: {data}")
        else:
            print(f"   ✗ Health endpoint failed with status {response.status_code}")
            
        # Test token endpoint
        print("3. Testing token endpoint...")
        response = requests.get(f"{api_url}/api/token", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ Token endpoint: {list(data.keys())}")
            if 'token' in data:
                print("   ✓ Token generated successfully")
                print(f"   Token preview: {data['token'][:20]}...")
            return True
        else:
            print(f"   ✗ Token endpoint failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("   ✗ Could not connect to backend API at", api_url)
        print("   Make sure the backend server is running:")
        print("   cd backend && python main.py")
        return False
    except requests.exceptions.Timeout:
        print("   ✗ Request timed out - backend might be slow to start")
        return False
    except Exception as e:
        print(f"   ✗ Error testing API: {e}")
        return False

if __name__ == "__main__":
    test_api()