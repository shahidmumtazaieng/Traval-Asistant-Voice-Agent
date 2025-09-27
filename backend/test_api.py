#!/usr/bin/env python3
"""
Test script to verify backend API is working
"""

import requests
import os

def test_api():
    """Test the backend API endpoints"""
    api_url = "http://localhost:8000"
    
    try:
        # Test health endpoint
        print("Testing health endpoint...")
        response = requests.get(f"{api_url}/api/health")
        if response.status_code == 200:
            data = response.json()
            print(f"Health check passed: {data}")
        else:
            print(f"Health check failed with status {response.status_code}")
            
        # Test token endpoint
        print("Testing token endpoint...")
        response = requests.get(f"{api_url}/api/token")
        if response.status_code == 200:
            data = response.json()
            print(f"Token endpoint passed: {list(data.keys())}")
            if 'token' in data:
                print("Token generated successfully")
                return data['token']
            else:
                print("Token not found in response")
        else:
            print(f"Token endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"Error testing API: {e}")

if __name__ == "__main__":
    test_api()