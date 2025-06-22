import React, { createContext, useContext, useState, useCallback, useEffect, act } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const GroceryItemAdminContext = createContext();

export const useGroceryItemsAdmin = () => useContext(GroceryItemAdminContext);

export const GroceryItemAdminProvider = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeGroceryItemsCount, setActiveGroceryItemsCount] = useState(0);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

  // Fetch all grocery items
  const fetchGroceryItems = useCallback(async () => {
    console.log('Groceries Fetched');
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/grocery-items`);
      setGroceryItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch grocery items.');
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchActiveGroceryItemsCount();
  }, []);

  const fetchActiveGroceryItemsCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/grocery-items/active-count`);
      setActiveGroceryItemsCount(response.data.count);
    } catch (error) {
      toast.error('Failed to fetch active grocery items count.');
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Create a new grocery item
  const createGroceryItem = async (data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/grocery-items/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      const newItem = { ...data, image: imageUrl };
      const response = await axios.post(`${BASE_URL}/grocery-items`, newItem);
      const createdItem = response.data.item; // Expecting the backend to return the created item
      setGroceryItems((prevItems) => [...prevItems, createdItem]);
      toast.success('Grocery item created successfully.');
    } catch (error) {
      toast.error('Failed to create grocery item.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a grocery item
  const updateGroceryItem = async (id, data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/grocery-items/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      const updatedItem = { ...data, image: imageUrl };
      const response = await axios.put(`${BASE_URL}/grocery-items/${id}`, updatedItem);
      const updatedItemFromServer = response.data.item; // Expecting the backend to return the updated item
      setGroceryItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? updatedItemFromServer : item
        )
      );
      toast.success('Grocery item updated successfully.');
    } catch (error) {
      toast.error('Failed to update grocery item.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a grocery item
  const deleteGroceryItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/grocery-items/${id}`);
      setGroceryItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.success('Grocery item deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete grocery item.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle active status
  const toggleGroceryActiveStatus = async (id) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/grocery-items/${id}/active`);
      const updatedItem = response.data.item; // Expecting the backend to return the updated item
      setGroceryItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? updatedItem : item
        )
      );
      toast.success('Grocery item status updated.');
    } catch (error) {
      toast.error('Failed to update grocery item status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroceryItemAdminContext.Provider
      value={{
        groceryItems,
        activeGroceryItemsCount,
        fetchGroceryItems,
        createGroceryItem,
        updateGroceryItem,
        deleteGroceryItem,
        toggleGroceryActiveStatus,
        loading,
      }}
    >
      {children}
    </GroceryItemAdminContext.Provider>
  );
};