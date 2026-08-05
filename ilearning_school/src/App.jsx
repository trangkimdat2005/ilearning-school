import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage/ContactPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nhóm trang dùng MainLayout (có Header và Banner) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Trang liên hệ riêng cho mobile */}
        <Route path="/lien-he" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}