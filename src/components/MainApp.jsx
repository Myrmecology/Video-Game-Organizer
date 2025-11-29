import React, { useState } from 'react'
import GameSearch from './GameSearch.jsx'
import ListManager from './ListManager.jsx'
import ListViewer from './ListViewer.jsx'
import '../styles/mainapp.css'

function MainApp() {
  const [currentView, setCurrentView] = useState('search')
  const [selectedList, setSelectedList] = useState(null)

  const handleViewChange = (view) => {
    setCurrentView(view)
    if (view !== 'viewList') {
      setSelectedList(null)
    }
  }

  const handleViewList = (list) => {
    setSelectedList(list)
    setCurrentView('viewList')
  }

  return (
    <div className="main-app">
      <header className="app-header">
        <h1 className="app-title">The Video Game Organizer</h1>
        <nav className="app-nav">
          <button 
            className={`nav-button ${currentView === 'search' ? 'active' : ''}`}
            onClick={() => handleViewChange('search')}
          >
            Search Games
          </button>
          <button 
            className={`nav-button ${currentView === 'lists' ? 'active' : ''}`}
            onClick={() => handleViewChange('lists')}
          >
            My Lists
          </button>
        </nav>
      </header>

      <main className="app-content">
        {currentView === 'search' && <GameSearch />}
        {currentView === 'lists' && <ListManager onViewList={handleViewList} />}
        {currentView === 'viewList' && selectedList && (
          <ListViewer list={selectedList} onBack={() => handleViewChange('lists')} />
        )}
      </main>
    </div>
  )
}

export default MainApp