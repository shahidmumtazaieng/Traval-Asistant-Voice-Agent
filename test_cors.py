#!/usr/bin/env python3
"""
CORS Configuration Test Script

This script helps verify that your CORS configuration is working correctly
for the Vercel deployment of TravelVoice AI.
"""

import requests
import os
from urllib.parse import urljoin

def test_cors_configuration(backend_url, frontend_origin):
    """
    Test CORS configuration by making a preflight request
    """
    print(f"Testing CORS configuration...")
    print(f"Backend URL: {backend_url}")
    print(f"Frontend Origin: {frontend_origin}")
    print("-" * 50)
    
    # Test health endpoint
    health_url = urljoin(backend_url, "/api/health")
    print(f"Testing health endpoint: {health_url}")
    
    try:
        # Make a preflight OPTIONS request
        preflight_response = requests.options(
            health_url,
            headers={
                "Origin": frontend_origin,
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "Content-Type"
            }
        )
        
        print(f"Preflight request status: {preflight_response.status_code}")
        
        # Check CORS headers in preflight response
        cors_headers = [
            "access-control-allow-origin",
            "access-control-allow-methods",
            "access-control-allow-headers"
        ]
        
        print("\nCORS Headers in Preflight Response:")
        for header in cors_headers:
            value = preflight_response.headers.get(header, "NOT SET")
            print(f"  {header}: {value}")
        
        # Make actual GET request
        print(f"\nMaking actual GET request to health endpoint...")
        actual_response = requests.get(
            health_url,
            headers={"Origin": frontend_origin}
        )
        
        print(f"Actual request status: {actual_response.status_code}")
        
        # Check CORS headers in actual response
        print("\nCORS Headers in Actual Response:")
        for header in cors_headers:
            value = actual_response.headers.get(header, "NOT SET")
            print(f"  {header}: {value}")
            
        # Check response content
        print(f"\nResponse content: {actual_response.json()}")
        
        print("\n" + "=" * 50)
        print("CORS TEST SUMMARY")
        print("=" * 50)
        
        # Determine if CORS is working
        allow_origin = actual_response.headers.get("access-control-allow-origin", "")
        if allow_origin == frontend_origin or allow_origin == "*":
            print("✅ CORS is configured correctly!")
        else:
            print("❌ CORS may not be configured correctly.")
            print(f"   Expected access-control-allow-origin to be '{frontend_origin}' or '*'")
            print(f"   But got: '{allow_origin}'")
            
    except Exception as e:
        print(f"❌ Error testing CORS: {e}")

if __name__ == "__main__":
    # Get configuration from environment variables or use defaults
    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
    frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
    
    test_cors_configuration(backend_url, frontend_origin)