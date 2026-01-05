import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import People from './pages/People';
import Knowledge from './pages/Knowledge';
import JoinUs from './pages/JoinUs';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="people" element={<People />} />
          <Route path="knowledge-contributions" element={<Knowledge />} />
          <Route path="join-us" element={<JoinUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
