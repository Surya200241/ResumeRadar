import { useState } from 'react';
import SideBar from './component/SideBar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import History from './component/History';
import Admin from './component/Admin';
import Login from './component/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-shrink-0 box-border flex-col md:flex-row">
      <SideBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
