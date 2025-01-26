import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import WorkOrdersPage from './pages/WorkOrder';
import MaterialPage from './pages/Material';
import Stages from './pages/Stages';

function App() {
  return (
    <div className="w-screen h-screen flex bg-gray-50 ">
      <Sidebar />
      <div className="overflow-x-scroll">
        <Header />
        <main className="pt-16 p-6  overflow-x-scroll">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workorder" element={<WorkOrdersPage />} />
            <Route path="/materials" element={<MaterialPage />} />
            <Route path="/stages" element={<Stages />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
