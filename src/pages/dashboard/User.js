import React from "react";
import UserComp from "../../components/userComp/UserComp";
import Navbar from "../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

const User = () => {
    return (
        <div className="flex h-[96vh] overflow-y-hidden">
            <AdminSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1  overflow-hidden">

                <UserComp />
                </div>
            </div>
        </div>

    )
}

export default User;