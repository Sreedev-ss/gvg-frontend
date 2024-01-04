import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ReportingAnalyticsComp from "../../components/reportingAnalyticsComp/ReportingAnalyticsComp";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

const ReportingAndAnalytics = () => {
    return (
        
            <div className="flex h-[96vh] overflow-y-hidden">
                <AdminSidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />

                    <div className="flex-1  overflow-hidden">
                        <ReportingAnalyticsComp />
                    </div>
                </div>
            </div>
    )
}

export default ReportingAndAnalytics