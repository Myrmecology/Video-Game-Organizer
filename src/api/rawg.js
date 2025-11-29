import { RAWG_BASE_URL } from '../utils/constants.js';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

/**
 * RAWG API integration for game and console data
 */

// Search for games
export const searchGames = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page=${page}&page_size=20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

// Get game details by ID
export const getGameDetails = async (gameId) => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games/${gameId}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch game details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

// Get game screenshots
export const getGameScreenshots = async (gameId) => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch screenshots');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    throw error;
  }
};

// Get game trailers
export const getGameTrailers = async (gameId) => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games/${gameId}/movies?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trailers');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trailers:', error);
    throw error;
  }
};

// Search for platforms/consoles
export const searchPlatforms = async (query) => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/platforms?key=${API_KEY}&search=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch platforms');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching platforms:', error);
    throw error;
  }
};

// Get platform details
export const getPlatformDetails = async (platformId) => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/platforms/${platformId}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch platform details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching platform details:', error);
    throw error;
  }
};

// Get trending games
export const getTrendingGames = async () => {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending games');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending games:', error);
    throw error;
  }
};