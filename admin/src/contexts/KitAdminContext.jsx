import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const KitAdminContext = createContext();

export const useKitsAdmin = () => useContext(KitAdminContext);

export const KitAdminProvider = ({ children }) => {
  const [kits, setKits] = useState([]);
  const [activeKitsCount, setActiveKitsCount] = useState(-1);
  const [loading, setLoading] = useState(false);

  const fetchKits = useCallback(async () => {
    console.log("Kits Fetch Called");
    setLoading(true);
    try {
      const response = await axiosInstance.get('/kits');
      setKits(response.data);
    } catch (error) {
      toast.error('Failed to fetch kits.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveKitsCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/kits/active-count');
      setActiveKitsCount(response.data.count);
    } catch (error) {
      toast.error('Failed to fetch active kits count.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveKitsCount();
  }, []);

  const createKit = async (data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axiosInstance.post('/kits/upload-image', formData);
        imageUrl = uploadResponse.data.url;
      }

      const newKit = { ...data, image: imageUrl };
      const response = await axiosInstance.post('/kits', newKit);
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

  const updateKit = async (id, data, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = data.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axiosInstance.post('/kits/upload-image', formData);
        imageUrl = uploadResponse.data.url;
      }

      const updatedKit = { ...data, image: imageUrl };
      const response = await axiosInstance.put(`/kits/${id}`, updatedKit);
      const updatedKitFromServer = response.data.item;
      setKits((prevKits) =>
        prevKits.map((kit) => (kit._id === id ? updatedKitFromServer : kit))
      );
      toast.success('Kit updated successfully.');
    } catch (error) {
      toast.error('Failed to update kit.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteKit = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/kits/${id}`);
      setKits((prevKits) => prevKits.filter((kit) => kit._id !== id));
      toast.success('Kit deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete kit.');
    } finally {
      setLoading(false);
    }
  };

  const toggleKitActiveStatus = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/kits/${id}/active`);
      const updatedKit = response.data.item;
      setKits((prevKits) =>
        prevKits.map((kit) => (kit._id === id ? updatedKit : kit))
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
        activeKitsCount,
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
