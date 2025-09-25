# Voice AI Conversational Agent Architecture

```mermaid
graph TB
    A[User] --> B[React Frontend]
    B --> C[LiveKit Client SDK]
    C --> D[LiveKit Server]
    D --> E[Voice Agent - Python]
    E --> F[STT - Deepgram]
    E --> G[LLM - OpenAI GPT]
    E --> H[TTS - OpenAI]
    H --> D
    D --> C
    C --> B
    B --> I[User Interface]
    A --> J[Microphone/Audio]
    J --> C
    C --> K[Speakers/Audio]
    K --> A
    
    subgraph Frontend
        B
        C
        I
    end
    
    subgraph Backend
        D
        E
        F
        G
        H
    end
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#f3e5f5
    style D fill:#e8f5e8
    style E fill:#e8f5e8
    style F fill:#fff3e0
    style G fill:#fff3e0
    style H fill:#fff3e0
    style I fill:#f1f8e9
    style J fill:#e1f5fe
    style K fill:#e1f5fe
```

## Component Descriptions

1. **User**: Interacts with the system through voice and UI
2. **React Frontend**: Web interface built with React and Vite
3. **LiveKit Client SDK**: Handles real-time audio streaming in the browser
4. **LiveKit Server**: Manages WebRTC connections and media routing
5. **Voice Agent**: Python service that orchestrates the voice pipeline
6. **STT (Deepgram)**: Converts speech to text
7. **LLM (OpenAI GPT)**: Generates conversational responses
8. **TTS (OpenAI)**: Converts text to speech
9. **User Interface**: Displays conversation transcript
10. **Microphone/Audio**: Audio input device
11. **Speakers/Audio**: Audio output device

## Data Flow

1. User speaks into microphone
2. Audio captured by React frontend
3. Audio streamed to LiveKit Server via WebRTC
4. Voice Agent receives audio stream
5. STT converts audio to text
6. LLM generates response based on conversation history
7. TTS converts response text to audio
8. Audio streamed back through LiveKit Server
9. Frontend plays audio through speakers
10. Transcript displayed in UI