import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import AdminDashboardComp from '../../components/adminDashboardComp/AdminDashboardComp';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import { useHierarchy } from '../../context/HierarchyContext';

const AdminDashboard = () => {
  const { updatePath, updateParent, updateLevel, selectItem,updatePlant } = useHierarchy();
  useEffect(() => {
    selectItem(null)
    updatePath([])
    updateParent(null)
    updateLevel(1)
    updatePlant("")
  }, [])
  return (
    <div className="flex h-[96vh] overflow-y-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1  overflow-hidden">
          <AdminDashboardComp />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
