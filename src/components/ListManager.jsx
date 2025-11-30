import React, { useState, useEffect } from 'react'
import { getLists, saveList, deleteList, deleteAllLists } from '../utils/storage.js'
import '../styles/retrotheme.css'

function ListManager({ onViewList }) {
  const [lists, setLists] = useState([])
  const [newListTitle, setNewListTitle] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = () => {
    const allLists = getLists()
    setLists(allLists)
  }

  const handleCreateList = (e) => {
    e.preventDefault()
    
    if (!newListTitle.trim()) {
      showMessage('Please enter a list title', 'error')
      return
    }

    const newList = saveList({
      title: newListTitle,
      items: []
    })

    if (newList) {
      loadLists()
      setNewListTitle('')
      setShowCreateForm(false)
      showMessage('✓ List created successfully!', 'success')
    } else {
      showMessage('Failed to create list', 'error')
    }
  }

  const handleDeleteList = (listId, listTitle) => {
    if (window.confirm(`Are you sure you want to delete "${listTitle}"?`)) {
      const success = deleteList(listId)
      if (success) {
        loadLists()
        showMessage('✓ List deleted', 'success')
      } else {
        showMessage('Failed to delete list', 'error')
      }
    }
  }

  const handleDeleteAllLists = () => {
    if (window.confirm('Are you sure you want to delete ALL lists? This cannot be undone!')) {
      const success = deleteAllLists()
      if (success) {
        loadLists()
        showMessage('✓ All lists deleted', 'success')
      } else {
        showMessage('Failed to delete lists', 'error')
      }
    }
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
    <div className="list-manager">
      <h2 className="section-title">My Lists</h2>

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

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        {!showCreateForm ? (
          <button 
            className="retro-button"
            onClick={() => setShowCreateForm(true)}
            style={{ fontSize: '12px', padding: '15px 30px' }}
          >
            + Create New List
          </button>
        ) : (
          <div className="list-create-form">
            <h3 className="section-title" style={{ fontSize: '14px', marginBottom: '20px' }}>
              Create New List
            </h3>
            <form onSubmit={handleCreateList}>
              <input
                type="text"
                className="list-input"
                placeholder="Enter list title (e.g., My Top 100 Favorite Games)"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                autoFocus
                maxLength={100}
              />
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button type="submit" className="retro-button">
                  Create List
                </button>
                <button 
                  type="button" 
                  className="retro-button-danger retro-button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setNewListTitle('')
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {lists.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>No lists created yet</p>
          <p>Create your first list to organize your favorite games!</p>
        </div>
      ) : (
        <>
          <div className="lists-grid">
            {lists.map((list) => (
              <div key={list.id} className="list-card">
                <div onClick={() => onViewList(list)} style={{ cursor: 'pointer' }}>
                  <h3 className="list-card-title">{list.title}</h3>
                  <div className="list-card-info">
                    <span className="list-card-count">
                      {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="list-card-date">
                      Created: {formatDate(list.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="list-card-actions">
                  <button
                    className="list-delete-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteList(list.id, list.title)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {lists.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                className="retro-button-danger retro-button"
                onClick={handleDeleteAllLists}
              >
                Delete All Lists
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ListManager