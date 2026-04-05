import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SajuInputPage from './pages/SajuInputPage';
import SajuResultPage from './pages/SajuResultPage';
import GunghapInputPage from './pages/GunghapInputPage';
import GunghapResultPage from './pages/GunghapResultPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saju" element={<SajuInputPage />} />
        <Route path="/saju/result" element={<SajuResultPage />} />
        <Route path="/gunghap" element={<GunghapInputPage />} />
        <Route path="/gunghap/result" element={<GunghapResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
