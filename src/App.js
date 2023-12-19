
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import SPlantFacilities from './pages/dashboard/SPlantfacilities';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/s-plant-facilities' element={<SPlantFacilities />} />
    </Routes>
  );
}

export default App;
