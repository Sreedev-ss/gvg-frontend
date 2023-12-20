import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DummyComp from '../../components/dummy/DummyComp'

const Dummy = () => {
    return (
        
            <div className="flex h-[96vh] overflow-y-hidden">
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />

                    <div className="flex-1  overflow-hidden">
                        <DummyComp />
                    </div>
                </div>
            </div>
    )
}

export default Dummy
