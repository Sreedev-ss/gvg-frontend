import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import DashboardComponent from '../../components/dashboardComp/DashboardComponent'
import Navbar from '../../components/navbar/Navbar'

const Dashboard = () => {
    return (
        <div className="flex h-[96vh] overflow-y-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1  overflow-hidden">
                    <DashboardComponent />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
