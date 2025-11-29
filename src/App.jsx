import React, { useState } from 'react'
import TitleScreen from './components/TitleScreen.jsx'
import MainApp from './components/MainApp.jsx'

function App() {
  const [showTitleScreen, setShowTitleScreen] = useState(true)

  const handleStart = () => {
    setShowTitleScreen(false)
  }

  return (
    <div className="app">
      {showTitleScreen ? (
        <TitleScreen onStart={handleStart} />
      ) : (
        <MainApp />
      )}
    </div>
  )
}

export default App