import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import SPlantFacilitiesComponent from '../../components/s_plant_facilities/S_PlantFacilitiesComponent'

const SPlantFacilities = () => {
    return (
        <div className="flex h-[96vh] overflow-y-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1  overflow-hidden">
                    <SPlantFacilitiesComponent/>
                </div>
            </div>
        </div>
    )
}

export default SPlantFacilities;
