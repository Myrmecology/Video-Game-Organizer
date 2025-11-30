import React, { useState } from 'react'
import { removeItemFromList, deleteList } from '../utils/storage.js'
import GameDetails from './GameDetails.jsx'
import '../styles/retrotheme.css'

function ListViewer({ list, onBack }) {
  const [currentList, setCurrentList] = useState(list)
  const [selectedGame, setSelectedGame] = useState(null)
  const [message, setMessage] = useState('')

  const handleRemoveItem = (itemId, itemName) => {
    if (window.confirm(`Remove "${itemName}" from this list?`)) {
      const result = removeItemFromList(currentList.id, itemId)
      
      if (result.success) {
        setCurrentList(result.list)
        showMessage('✓ Item removed', 'success')
      } else {
        showMessage('Failed to remove item', 'error')
      }
    }
  }

  const handleDeleteList = () => {
    if (window.confirm(`Delete the entire list "${currentList.title}"? This cannot be undone!`)) {
      const success = deleteList(currentList.id)
      if (success) {
        onBack()
      } else {
        showMessage('Failed to delete list', 'error')
      }
    }
  }

  const handleGameClick = (item) => {
    // Convert list item back to game format for GameDetails
    const game = {
      id: item.id,
      name: item.name,
      background_image: item.image,
      rating: item.rating,
      released: item.released
    }
    setSelectedGame(game)
  }

  const showMessage = (msg, type) => {
    setMessage({ text: msg, type })
    setTimeout(() => setMessage(''), 3000)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="list-viewer">
      <div style={{ marginBottom: '30px' }}>
        <button className="retro-button" onClick={onBack}>
          ← Back to Lists
        </button>
      </div>

      <h2 className="section-title">{currentList.title}</h2>
      
      <div style={{ 
        textAlign: 'center', 
        fontSize: '10px', 
        color: '#ff00ff', 
        marginBottom: '30px' 
      }}>
        <p>{currentList.items.length} {currentList.items.length === 1 ? 'item' : 'items'}</p>
        <p>Created: {formatDate(currentList.createdAt)}</p>
        {currentList.updatedAt !== currentList.createdAt && (
          <p>Last updated: {formatDate(currentList.updatedAt)}</p>
        )}
      </div>

      {message && (
        <div style={{
          textAlign: 'center',
          padding: '15px',
          marginBottom: '20px',
          color: message.type === 'success' ? '#00ff88' : '#ff1493',
          border: `2px solid ${message.type === 'success' ? '#00ff88' : '#ff1493'}`,
          background: message.type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 20, 147, 0.1)',
          fontSize: '12px'
        }}>
          {message.text}
        </div>
      )}

      {currentList.items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <p>This list is empty</p>
          <p>Search for games and add them to this list!</p>
        </div>
      ) : (
        <div className="games-grid">
          {currentList.items.map((item, index) => (
            <div key={item.id} className="game-card">
              <img
                src={item.image || 'https://via.placeholder.com/300x400/1a0a2e/00ffff?text=No+Image'}
                alt={item.name}
                className="game-card-image"
                loading="lazy"
                onClick={() => handleGameClick(item)}
                style={{ cursor: 'pointer' }}
              />
              <div className="game-card-content">
                <h3 
                  className="game-card-title"
                  onClick={() => handleGameClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {index + 1}. {item.name}
                </h3>
                <div className="game-card-meta">
                  {item.rating && <span className="game-card-rating">★ {item.rating.toFixed(1)}</span>}
                  {item.released && (
                    <span className="game-card-year">
                      {new Date(item.released).getFullYear()}
                    </span>
                  )}
                </div>
                <button
                  className="list-delete-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveItem(item.id, item.name)
                  }}
                  style={{ marginTop: '10px', width: '100%' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          className="retro-button-danger retro-button"
          onClick={handleDeleteList}
        >
          Delete This List
        </button>
      </div>

      {selectedGame && (
        <GameDetails
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  )
}

export default ListViewer