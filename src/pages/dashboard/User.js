import React from "react";
import UserComp from "../../components/userComp/UserComp";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const User = () => {
    return (
        <div className="flex h-[96vh] overflow-y-hidden">
            <Sidebar />

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