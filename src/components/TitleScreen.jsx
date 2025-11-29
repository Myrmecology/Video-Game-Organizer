import React from 'react'
import '../styles/titlescreen.css'

function TitleScreen({ onStart }) {
  return (
    <div className="title-screen">
      <div className="title-main">
        <div className="title-line-1">
          <span className="title-word-the">The </span>
          <span className="title-word-video">Video </span>
          <span className="title-word-game">Game</span>
        </div>
        <div className="title-line-2">of</div>
        <div className="title-line-3">
          <span className="title-word-organizer">Organizer</span>
          <span className="title-trademark">™</span>
        </div>
      </div>

      <div className="title-copyright">
        <div className="copyright-line">
          <span className="copyright-year">TM & ©1981</span> Neural Node & Code
        </div>
        <div className="copyright-line">
          Justin's Video GAMES
        </div>
        <div className="copyright-line">
          Licensed & Controlled by Neural Node & Code
        </div>
        <div className="copyright-line">
          Video Games Organizer and Time Machine
        </div>
      </div>

      <button className="press-start" onClick={onStart}>
        PRESS START
      </button>
    </div>
  )
}

export default TitleScreen