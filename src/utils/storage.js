import { STORAGE_KEYS } from './constants.js';

/**
 * Storage utility for managing lists and app data in localStorage
 */

// Get all lists from localStorage
export const getLists = () => {
  try {
    const listsData = localStorage.getItem(STORAGE_KEYS.LISTS);
    return listsData ? JSON.parse(listsData) : [];
  } catch (error) {
    console.error('Error reading lists from storage:', error);
    return [];
  }
};

// Save a new list
export const saveList = (list) => {
  try {
    const lists = getLists();
    const newList = {
      id: Date.now().toString(),
      title: list.title,
      items: list.items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    lists.push(newList);
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
    return newList;
  } catch (error) {
    console.error('Error saving list:', error);
    return null;
  }
};

// Update an existing list
export const updateList = (listId, updates) => {
  try {
    const lists = getLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    
    lists[listIndex] = {
      ...lists[listIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
    return lists[listIndex];
  } catch (error) {
    console.error('Error updating list:', error);
    return null;
  }
};

// Delete a list by ID
export const deleteList = (listId) => {
  try {
    const lists = getLists();
    const filteredLists = lists.filter(list => list.id !== listId);
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(filteredLists));
    return true;
  } catch (error) {
    console.error('Error deleting list:', error);
    return false;
  }
};

// Delete all lists
export const deleteAllLists = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error deleting all lists:', error);
    return false;
  }
};

// Get a single list by ID
export const getListById = (listId) => {
  try {
    const lists = getLists();
    return lists.find(list => list.id === listId) || null;
  } catch (error) {
    console.error('Error getting list:', error);
    return null;
  }
};

// Add item to a list
export const addItemToList = (listId, item) => {
  try {
    const lists = getLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    
    // Check if item already exists in the list
    const itemExists = lists[listIndex].items.some(
      existingItem => existingItem.id === item.id
    );
    
    if (itemExists) {
      return { success: false, message: 'Item already in list' };
    }
    
    lists[listIndex].items.push(item);
    lists[listIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
    return { success: true, list: lists[listIndex] };
  } catch (error) {
    console.error('Error adding item to list:', error);
    return { success: false, message: error.message };
  }
};

// Remove item from a list
export const removeItemFromList = (listId, itemId) => {
  try {
    const lists = getLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    
    lists[listIndex].items = lists[listIndex].items.filter(
      item => item.id !== itemId
    );
    lists[listIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
    return { success: true, list: lists[listIndex] };
  } catch (error) {
    console.error('Error removing item from list:', error);
    return { success: false, message: error.message };
  }
};