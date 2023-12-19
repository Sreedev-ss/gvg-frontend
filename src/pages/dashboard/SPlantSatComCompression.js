import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import SPlantSatComCompressionComponent from '../../components/sPlantSatComCompression/SPlantSatComCompressionComponent'

const SPlantFacilities = () => {
    return (
        <div className="flex h-[96vh] overflow-y-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1  overflow-hidden">
                    <SPlantSatComCompressionComponent/>
                </div>
            </div>
        </div>
    )
}

export default SPlantFacilities;
