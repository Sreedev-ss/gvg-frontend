
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import SPlantFacilities from './pages/dashboard/SPlantfacilities';
import SPlantSatComCompression from './pages/dashboard/SPlantSatComCompression';
import Dummy from './pages/dashboard/Dummy';
import Assets from './pages/dashboard/Assets';
import Login from './pages/dashboard/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import { HierarchyProvider } from './context/HierarchyContext';

function App() {
  return (
    <HierarchyProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/east-assets' element={<Dashboard />} />
        <Route path='/s-plant-facilities' element={<SPlantFacilities />} />
        <Route path='/s-plant-sat-com-compression' element={<SPlantSatComCompression />} />
        <Route path='/dummy' element={<Dummy />} />
        <Route path='/assets' element={<Assets />} />
      </Routes>
    </HierarchyProvider>
  );
}

export default App;
