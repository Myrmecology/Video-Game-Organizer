import React, { useState, useEffect } from 'react'
import { getGameDetails, getGameScreenshots, getGameTrailers } from '../api/rawg.js'
import { getLists, addItemToList } from '../utils/storage.js'
import '../styles/retrotheme.css'

function GameDetails({ game, onClose }) {
  const [details, setDetails] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [trailers, setTrailers] = useState([])
  const [loading, setLoading] = useState(true)
  const [lists, setLists] = useState([])
  const [showListSelector, setShowListSelector] = useState(false)
  const [addMessage, setAddMessage] = useState('')

  useEffect(() => {
    fetchDetails()
    setLists(getLists())
  }, [game.id])

  const fetchDetails = async () => {
    setLoading(true)
    try {
      const [detailsData, screenshotsData, trailersData] = await Promise.all([
        getGameDetails(game.id),
        getGameScreenshots(game.id),
        getGameTrailers(game.id)
      ])

      setDetails(detailsData)
      setScreenshots(screenshotsData)
      setTrailers(trailersData)
    } catch (error) {
      console.error('Error fetching game details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToList = (listId) => {
    const gameItem = {
      id: game.id,
      name: game.name,
      image: game.background_image || game.image_background,
      rating: game.rating,
      released: game.released
    }

    const result = addItemToList(listId, gameItem)
    
    if (result.success) {
      setAddMessage('✓ Added to list!')
    } else {
      setAddMessage('Already in this list')
    }

    setTimeout(() => {
      setAddMessage('')
      setShowListSelector(false)
    }, 2000)
  }

  const stripHtmlTags = (html) => {
    if (!html) return ''
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="loading">Loading game details...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          CLOSE
        </button>

        <div className="game-details">
          <div className="game-details-header">
            <h2 className="game-details-title">{details?.name || game.name}</h2>
            <div className="game-details-meta">
              {details?.released && <span>Released: {details.released}</span>}
              {details?.rating && <span> | Rating: ★ {details.rating.toFixed(1)}</span>}
              {details?.metacritic && <span> | Metacritic: {details.metacritic}</span>}
            </div>
          </div>

          {(details?.background_image || game.background_image) && (
            <img
              src={details?.background_image || game.background_image}
              alt={details?.name || game.name}
              className="game-details-image"
            />
          )}

          {details?.description && (
            <div className="game-details-description">
              {stripHtmlTags(details.description)}
            </div>
          )}

          {details?.platforms && details.platforms.length > 0 && (
            <div className="game-details-section">
              <h3 className="game-details-section-title">Platforms</h3>
              <div className="platforms-list">
                {details.platforms.map((p) => (
                  <span key={p.platform.id} className="platform-tag">
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {details?.genres && details.genres.length > 0 && (
            <div className="game-details-section">
              <h3 className="game-details-section-title">Genres</h3>
              <div className="platforms-list">
                {details.genres.map((genre) => (
                  <span key={genre.id} className="platform-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {trailers && trailers.length > 0 && (
            <div className="game-details-section">
              <h3 className="game-details-section-title">Trailers</h3>
              {trailers.map((trailer, index) => (
                <div key={index} className="video-container">
                  <video controls>
                    <source src={trailer.data.max || trailer.data['480']} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          )}

          {screenshots && screenshots.length > 0 && (
            <div className="game-details-section">
              <h3 className="game-details-section-title">Screenshots</h3>
              <div className="screenshots-grid">
                {screenshots.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt="Game screenshot"
                    className="screenshot-item"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="game-details-section">
            {!showListSelector ? (
              <button 
                className="add-to-list-button"
                onClick={() => setShowListSelector(true)}
              >
                Add to List
              </button>
            ) : (
              <div style={{ marginTop: '20px' }}>
                <h3 className="game-details-section-title">Select a List</h3>
                {addMessage && (
                  <div style={{ 
                    textAlign: 'center', 
                    color: addMessage.includes('✓') ? '#00ff88' : '#ff1493',
                    fontSize: '12px',
                    marginBottom: '15px'
                  }}>
                    {addMessage}
                  </div>
                )}
                {lists.length === 0 ? (
                  <p style={{ fontSize: '10px', color: '#ff00ff', textAlign: 'center' }}>
                    No lists created yet. Create a list first in the "My Lists" section.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {lists.map((list) => (
                      <button
                        key={list.id}
                        className="retro-button"
                        onClick={() => handleAddToList(list.id)}
                        style={{ width: '100%' }}
                      >
                        {list.title} ({list.items.length} items)
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="retro-button"
                  onClick={() => setShowListSelector(false)}
                  style={{ width: '100%', marginTop: '15px' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetails