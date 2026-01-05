import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Project from './pages/Project';
import JoinUs from './pages/JoinUs';
import './index.css';
import Publications from './pages/Publications';
import Member from './pages/Member';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="publications" element={<Publications />} />
          <Route path="project" element={<Project />} />
          <Route path="member" element={<Member />} />
          <Route path="join-us" element={<JoinUs />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
