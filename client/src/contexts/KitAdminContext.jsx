import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const KitAdminContext = createContext();

export const useKitsAdmin = () => useContext(KitAdminContext);

export const KitAdminProvider = ({ children }) => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

  // Fetch all kits
  const fetchKits = useCallback(async () => {
    console.log("Kits Fetch Called")
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/kits`);
      setKits(response.data);
    } catch (error) {
      toast.error('Failed to fetch kits.');
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Create a new kit
  const createKit = async (data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/kits/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      const newKit = { ...data, image: imageUrl };
      const response = await axios.post(`${BASE_URL}/kits`, newKit);
      const createdKit = response.data.item;
      setKits((prevKits) => [...prevKits, createdKit]);
      toast.success('Kit created successfully.');
    } catch (error) {
      toast.error('Failed to create kit.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a kit
  const updateKit = async (id, data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${BASE_URL}/kits/upload-image`, formData);
        imageUrl = uploadResponse.data.url;
      }

      const updatedKit = { ...data, image: imageUrl };
      const response = await axios.put(`${BASE_URL}/kits/${id}`, updatedKit);
      const updatedKitFromServer = response.data.item;
      setKits((prevKits) =>
        prevKits.map((kit) =>
          kit._id === id ? updatedKitFromServer : kit
        )
      );
      toast.success('Kit updated successfully.');
    } catch (error) {
      toast.error('Failed to update kit.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a kit
  const deleteKit = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/kits/${id}`);
      setKits((prevKits) => prevKits.filter((kit) => kit._id !== id));
      toast.success('Kit deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete kit.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle active status
  const toggleKitActiveStatus = async (id) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/kits/${id}/active`);
      const updatedKit = response.data.item;
      setKits((prevKits) =>
        prevKits.map((kit) =>
          kit._id === id ? updatedKit : kit
        )
      );
      toast.success('Kit status updated.');
    } catch (error) {
      toast.error('Failed to update kit status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KitAdminContext.Provider
      value={{
        kits,
        fetchKits,
        createKit,
        updateKit,
        deleteKit,
        toggleKitActiveStatus,
        loading,
      }}
    >
      {children}
    </KitAdminContext.Provider>
  );
};