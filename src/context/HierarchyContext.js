// HierarchyContext.js

import React, { createContext, useContext, useState } from 'react';

const HierarchyContext = createContext();

export const HierarchyProvider = ({ children }) => {
    const [hierarchicalPath, setHierarchicalPath] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [parentid, setParentId] = useState(null)
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

    const updateLevel = (level) =>{
        setLevel(level)
    }

    return (
        <HierarchyContext.Provider value={{ hierarchicalPath, updatePath, selectItem, selectedItemId, updateParent, parentid,updateLevel,level }}>
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
