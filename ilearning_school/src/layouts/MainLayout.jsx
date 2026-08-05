import { Outlet } from 'react-router-dom'; // Bắt buộc phải có
import Header from './Header'; // Hoặc đường dẫn đúng tới Header của bạn

export default function MainLayout() {
  return (
    <div className="layout-wrapper">
      <Header />
      
      <main className="main-content">
        {/* Outlet sẽ tự động render component Home (và Banner) ra đây */}
        <Outlet /> 
      </main>
    </div>
  );
}