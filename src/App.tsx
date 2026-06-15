import './App.css'
import NSCenterTrainer from './NSCenterTrainer'
// import NSCornerTrainer from './NSCornerTrainer'
import { useLocalStorage } from './utils/useLocalStorage';

interface GlobalOptions {
  isDarkMode: boolean,
  isMuted: boolean,
}

function App() {
  const [globalOptions, setGlobalOptions] = useLocalStorage<GlobalOptions>("globalOptions", {
    isDarkMode: false,
    isMuted: false,
  }, true);
  return (
    <div className={`app ${globalOptions.isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="toolbar">
        <h1 className="toolbar-title">Skewb Trainer</h1>
        <div className="toolbar-buttons">
          <button
            className="mute-button"
            onClick={() => {
              setGlobalOptions((opts) => { return {...opts, isMuted: !opts.isMuted} })
            }}
          >
            {globalOptions.isMuted ? "Unmute" : "Mute"}
          </button>
          <button
            className="dark-mode-button"
            onClick={() => {
              setGlobalOptions((opts) => { return {...opts, isDarkMode: !opts.isDarkMode} })
            }}
          >
            {globalOptions.isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
      <NSCenterTrainer 
        isMuted={globalOptions.isMuted}
      />
      {/*
      <br />
      <br />
      <NSCornerTrainer
        isMuted={isMuted}
      />
      */}
    </div>
  )
}

export default App
