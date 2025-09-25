import requests
import json

def test_health_endpoint():
    """Test the health check endpoint"""
    try:
        response = requests.get("http://localhost:8000/health")
        print(f"Health check: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_token_endpoint():
    """Test the token generation endpoint"""
    try:
        response = requests.get("http://localhost:8000/api/token")
        print(f"Token endpoint: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Token generated: {data.get('token', 'No token found')[:20]}...")
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Token endpoint test failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing Voice AI Backend API")
    print("=" * 40)
    
    health_ok = test_health_endpoint()
    print()
    token_ok = test_token_endpoint()
    
    print()
    print("=" * 40)
    if health_ok and token_ok:
        print("All tests passed!")
    else:
        print("Some tests failed!")