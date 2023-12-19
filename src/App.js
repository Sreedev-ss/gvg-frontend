
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import SPlantFacilities from './pages/dashboard/SPlantfacilities';
import SPlantSatComCompression from './pages/dashboard/SPlantSatComCompression';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/s-plant-facilities' element={<SPlantFacilities />} />
      <Route path='/s-plant-sat-com-compression' element={<SPlantSatComCompression />} />
    </Routes>
  );
}

export default App;
