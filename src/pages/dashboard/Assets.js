import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import AssetsComponenet from '../../components/assetsComponents/AssetsComponent';
import { useHierarchy } from '../../context/HierarchyContext';
import { useParams } from 'react-router-dom';

const SPlantFacilities = () => {
    const { plantId } = useParams()
    console.log(plantId)
    const { updatePath, updateParent, updateLevel, selectItem, updatePlant } = useHierarchy();
    useEffect(() => {
        selectItem(null)
        updatePath([])
        updateParent(null)
        updateLevel(1)
        updatePlant(plantId)
    }, [])
    return (
        <div className="flex h-[96vh] overflow-y-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1  overflow-hidden">
                    <AssetsComponenet />
                </div>
            </div>
        </div>
    )
}

export default SPlantFacilities;
