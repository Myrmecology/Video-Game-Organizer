import React from 'react'
import '../styles/retrotheme.css'

function GameCard({ game, onClick }) {
  const getImageUrl = () => {
    if (game.background_image) {
      return game.background_image
    }
    if (game.image_background) {
      return game.image_background
    }
    return 'https://via.placeholder.com/300x400/1a0a2e/00ffff?text=No+Image'
  }

  const getRating = () => {
    if (game.rating) {
      return game.rating.toFixed(1)
    }
    if (game.metacritic) {
      return (game.metacritic / 20).toFixed(1)
    }
    return 'N/A'
  }

  const getYear = () => {
    if (game.released) {
      return new Date(game.released).getFullYear()
    }
    if (game.year_start) {
      return game.year_start
    }
    return 'Unknown'
  }

  return (
    <div className="game-card" onClick={onClick}>
      <img
        src={getImageUrl()}
        alt={game.name}
        className="game-card-image"
        loading="lazy"
      />
      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        <div className="game-card-meta">
          <span className="game-card-rating">★ {getRating()}</span>
          <span className="game-card-year">{getYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default GameCard