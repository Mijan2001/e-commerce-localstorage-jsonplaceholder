// LocalStorageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context to hold the localStorage length
const LocalStorageContext = createContext();

// Provider component to provide the localStorage length to all components
export const LocalStorageProvider = ({ children }) => {
    const [storageLength, setStorageLength] = useState(0);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        // Get the length of items in localStorage
        const length = JSON.parse(localStorage.getItem('cart')) || [];
        setStorageLength(length);
    }, [flag]); // Empty dependency array to run only once when the component mounts

    return (
        <LocalStorageContext.Provider value={{ storageLength, flag, setFlag }}>
            {children}
        </LocalStorageContext.Provider>
    );
};

// Custom hook to use the context in other components
export const useLocalStorageLength = () => {
    return useContext(LocalStorageContext);
};
