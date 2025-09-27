// Test script to verify frontend configuration
const fs = require('fs');
const path = require('path');

console.log('Testing Frontend Configuration...');
console.log('==============================');

// Check if .env file exists
const envPath = path.join(__dirname, 'react app', '.env');
console.log(`Checking .env file at: ${envPath}`);

if (fs.existsSync(envPath)) {
  console.log('✓ .env file found');
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('Environment variables:');
  console.log(envContent);
  
  // Parse the environment variables
  const lines = envContent.split('\n');
  const envVars = {};
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
  
  console.log('\nParsed environment variables:');
  Object.keys(envVars).forEach(key => {
    console.log(`  ${key}: ${envVars[key]}`);
  });
  
  // Validate required variables
  if (envVars.VITE_LIVEKIT_URL) {
    console.log('\n✓ VITE_LIVEKIT_URL is set');
  } else {
    console.log('\n✗ VITE_LIVEKIT_URL is missing');
  }
  
  if (envVars.VITE_API_URL) {
    console.log('✓ VITE_API_URL is set');
  } else {
    console.log('✗ VITE_API_URL is missing');
  }
  
} else {
  console.log('✗ .env file not found');
}

console.log('\nTest completed.');