import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VoiceAssistantPage from './pages/VoiceAssistantPage'
import Layout from './components/Layout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="voice-assistant" element={<VoiceAssistantPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App