import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; 
import toast from 'react-hot-toast';

const GroceryItemAdminContext = createContext();

export const useGroceryItemsAdmin = () => useContext(GroceryItemAdminContext);

export const GroceryItemAdminProvider = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeGroceryItemsCount, setActiveGroceryItemsCount] = useState(-1);

  const fetchGroceryItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/grocery-items');
      setGroceryItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch grocery items.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveGroceryItemsCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/grocery-items/active-count');
      setActiveGroceryItemsCount(response.data.count);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch active grocery items count.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveGroceryItemsCount();
  }, [fetchActiveGroceryItemsCount]);

  const createGroceryItem = async (data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axiosInstance.post('/grocery-items/upload-image', formData);
        imageUrl = uploadResponse.data.url;
      }

      const newItem = { ...data, image: imageUrl };
      const response = await axiosInstance.post('/grocery-items', newItem);
      const createdItem = response.data.item;

      setGroceryItems((prevItems) => [...prevItems, createdItem]);
      toast.success('Grocery item created successfully.');
    } catch (error) {
      toast.error('Failed to create grocery item.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateGroceryItem = async (id, data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axiosInstance.post('/grocery-items/upload-image', formData);
        imageUrl = uploadResponse.data.url;
      }

      const updatedItem = { ...data, image: imageUrl };
      const response = await axiosInstance.put(`/grocery-items/${id}`, updatedItem);
      const updatedItemFromServer = response.data.item;

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

  const deleteGroceryItem = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/grocery-items/${id}`);
      setGroceryItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.success('Grocery item deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete grocery item.');
    } finally {
      setLoading(false);
    }
  };

  const toggleGroceryActiveStatus = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/grocery-items/${id}/active`);
      const updatedItem = response.data.item;

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
