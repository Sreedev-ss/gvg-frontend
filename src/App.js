
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
import ProtectedRoute from './authentication/ProtectedRoute';

function App() {
  return (
    <HierarchyProvider>
      <Routes>
        <Route path='/authentication/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path='*' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        {/* <Route path='/east-assets' element={<Dashboard />} /> */}
        {/* <Route path='/s-plant-facilities' element={<SPlantFacilities />} />
        <Route path='/s-plant-sat-com-compression' element={<SPlantSatComCompression />} /> */}
        <Route path='/asset' element={<ProtectedRoute><Dummy /></ProtectedRoute>} />
        <Route path='/assets' element={<Assets />} />

        
      </Routes>
    </HierarchyProvider>
  );
}

export default App;
