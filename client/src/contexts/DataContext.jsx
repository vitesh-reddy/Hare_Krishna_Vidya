import React, { createContext, useContext, useState } from 'react';
   import axios from 'axios';

   const DataContext = createContext();

   export const useData = () => useContext(DataContext);

   export const DataProvider = ({ children }) => {
     const [kits, setKits] = useState([]);
     const [groceryItems, setGroceryItems] = useState([]);
     const [isLoading, setIsLoading] = useState({ kits: false, groceryItems: false });
     const [error, setError] = useState({ kits: null, groceryItems: null });

     const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

     const fetchKits = async () => {
       try {
         setIsLoading(prev => ({ ...prev, kits: true }));
         setError(prev => ({ ...prev, kits: null }));
         console.log("fetching kits");
         const res = await axios.get(`${BASE_URL}/kits/active`);
         setKits(res.data);
       } catch (err) {
         console.error('Error fetching kits:', err);
         setError(prev => ({ ...prev, kits: err.message }));
       } finally {
         setIsLoading(prev => ({ ...prev, kits: false }));
       }
     };
     
     const fetchGroceryItems = async () => {
       try {
         setIsLoading(prev => ({ ...prev, groceryItems: true }));
         setError(prev => ({ ...prev, groceryItems: null }));
         console.log("fetching items");
         const res = await axios.get(`${BASE_URL}/grocery-items/active`);
         setGroceryItems(res.data);
       } catch (err) {
         console.error('Error fetching grocery items:', err);
         setError(prev => ({ ...prev, groceryItems: err.message }));
       } finally {
         setIsLoading(prev => ({ ...prev, groceryItems: false }));
       }
     };
     
     const getKitById = (kitId) => {
       console.log("fetching kit by id");
       return kits.find((kit) => kit._id === kitId) || null;
     };
     
     const getGroceryItemById = (itemId) => {
       console.log("fetching item by id");
       return groceryItems.find((item) => item._id === itemId) || null;
     };

     return (
       <DataContext.Provider
         value={{
           kits,
           groceryItems,
           isLoading,
           error,
           fetchKits,
           fetchGroceryItems,
           getKitById,
           getGroceryItemById,
         }}
       >
         {children}
       </DataContext.Provider>
     );
   };