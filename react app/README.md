# VoyageAI React App

A modern React-based travel agency website with AI-powered voice assistant functionality.

## Features

- 🎤 Voice-powered travel planning
- 🤖 AI-powered personalization
- 🌍 Interactive destination explorer
- 💰 Budget calculator
- 📅 Travel calendar
- 🎨 Modern, responsive design
- ✨ Smooth animations and transitions

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Anime.js** - Animation library
- **Typed.js** - Typewriter effects
- **ECharts** - Data visualization
- **p5.js** - Creative coding and particle systems
- **Web Speech API** - Voice recognition and synthesis

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── HeroSection.jsx # Hero area with typewriter
│   ├── AboutSection.jsx # About us section
│   ├── FeaturesSection.jsx # Feature cards
│   ├── DestinationsSection.jsx # Destination grid
│   ├── ReviewsSection.jsx # Customer testimonials
│   ├── ChatInterface.jsx # Voice chat UI
│   ├── TravelTools.jsx # Sidebar tools
│   ├── Calendar.jsx # Interactive calendar
│   ├── BudgetCalculator.jsx # Budget breakdown
│   ├── DestinationSuggestions.jsx # Quick destinations
│   ├── VoiceSettings.jsx # Voice configuration
│   ├── BackgroundAnimation.jsx # Animated background
│   └── VoiceAssistantButton.jsx # Floating voice button
├── pages/              # Page components
│   ├── HomePage.jsx   # Main landing page
│   └── VoiceAssistantPage.jsx # Voice assistant interface
├── hooks/              # Custom React hooks
│   ├── useVoiceAssistant.js # Voice recognition
│   ├── useScrollAnimations.js # Scroll-triggered animations
│   ├── useStatsCounter.js # Animated counters
│   └── useParticles.js # Particle system
├── App.jsx            # Main App component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Key Components

### Voice Assistant
- Uses Web Speech API for voice recognition
- Real-time chat interface with typing indicators
- Quick command buttons for common queries
- Voice settings for customization

### Interactive Features
- **Calendar**: Select travel dates
- **Budget Calculator**: Calculate trip costs
- **Destination Suggestions**: Quick destination picker
- **Travel Stats**: Interactive charts showing popular destinations

### Animations
- **Scroll Animations**: Elements animate in as you scroll
- **Typewriter Effect**: Hero text with typing animation
- **Particle System**: Floating particles in background
- **Hover Effects**: 3D transforms on cards and buttons

## Browser Support

- Modern browsers with Web Speech API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Voice features require microphone permission

## Deployment

The app can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any web server

## License

MIT License