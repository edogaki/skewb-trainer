import { useState } from 'react';
import './App.css'
import NSCenterTrainer from './NSCenterTrainer'
import NSCornerTrainer from './NSCornerTrainer'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="toolbar">
        <h1 className="toolbar-title">Skewb Trainer</h1>
        <div className="toolbar-buttons">
          <button
            className="mute-button"
            onClick={() => {
              setIsMuted((v) => !v);
            }}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button
            className="dark-mode-button"
            onClick={() => {
              setIsDarkMode((v) => !v);
            }}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
      <NSCenterTrainer 
        isMuted={isMuted}
      />
      <br />
      <br />
      <NSCornerTrainer
        isMuted={isMuted}
      />
    </div>
  )
}

export default App
