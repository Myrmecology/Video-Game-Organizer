import React, { useState, useEffect } from 'react'
import { searchGames, searchPlatforms } from '../api/rawg.js'
import GameCard from './GameCard.jsx'
import GameDetails from './GameDetails.jsx'
import { SEARCH_DEBOUNCE_MS } from '../utils/constants.js'

function GameSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('games') // 'games' or 'platforms'
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(() => {
      handleSearch()
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchType])

  const handleSearch = async () => {
    setLoading(true)
    setError(null)

    try {
      let data
      if (searchType === 'games') {
        data = await searchGames(searchQuery)
      } else {
        data = await searchPlatforms(searchQuery)
      }
      setResults(data.results || [])
    } catch (err) {
      setError('Failed to fetch results. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleGameClick = (game) => {
    setSelectedGame(game)
  }

  const handleCloseDetails = () => {
    setSelectedGame(null)
  }

  return (
    <div className="game-search">
      <div className="search-section">
        <h2 className="section-title">Search Video Games & Consoles</h2>
        
        <div className="search-type-toggle" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            className={`retro-button ${searchType === 'games' ? 'active' : ''}`}
            onClick={() => setSearchType('games')}
            style={{
              background: searchType === 'games' ? '#00ffff' : 'transparent',
              color: searchType === 'games' ? '#000000' : '#00ffff'
            }}
          >
            Games
          </button>
          <button
            className={`retro-button ${searchType === 'platforms' ? 'active' : ''}`}
            onClick={() => setSearchType('platforms')}
            style={{
              background: searchType === 'platforms' ? '#00ffff' : 'transparent',
              color: searchType === 'platforms' ? '#000000' : '#00ffff'
            }}
          >
            Consoles
          </button>
        </div>

        <input
          type="text"
          className="search-input"
          placeholder={`Search for ${searchType === 'games' ? 'video games' : 'consoles'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && results.length === 0 && searchQuery && (
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <p>No results found for "{searchQuery}"</p>
          <p>Try a different search term</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="games-grid">
          {results.map((item) => (
            <GameCard
              key={item.id}
              game={item}
              onClick={() => handleGameClick(item)}
            />
          ))}
        </div>
      )}

      {selectedGame && (
        <GameDetails
          game={selectedGame}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  )
}

export default GameSearch