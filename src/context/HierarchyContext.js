// HierarchyContext.js

import React, { createContext, useContext, useState } from 'react';

const HierarchyContext = createContext();

export const HierarchyProvider = ({ children }) => {
    const [hierarchicalPath, setHierarchicalPath] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [parentid, setParentId] = useState('657d9cc91a95c5b61f5d90b5')
    const [plantId, setPlantId] = useState("")
    const [level, setLevel] = useState(1)
    const selectItem = (itemId) => {
        setSelectedItemId(itemId);
    };

    const updatePath = (newPath) => {
        setHierarchicalPath(newPath);
    };

    const updateParent = (id) => {
        setParentId(id)
    }

    const updateLevel = (level) => {
        setLevel(level)
    }

    const updatePlant = (id) => {
        setPlantId(id)
    }

    return (
        <HierarchyContext.Provider value={{ hierarchicalPath, updatePath, selectItem, selectedItemId, updateParent, parentid, updateLevel, level, updatePlant, plantId }}>
            {children}
        </HierarchyContext.Provider>
    );
};

export const useHierarchy = () => {
    const context = useContext(HierarchyContext);
    if (!context) {
        throw new Error('useHierarchy must be used within a HierarchyProvider');
    }
    return context;
};
