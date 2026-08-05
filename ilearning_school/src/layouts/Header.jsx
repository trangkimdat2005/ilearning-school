import Logo from '../components/molecules/Logo/Logo';
import SearchBar from '../components/molecules/SearchBar/SearchBar';
import Navigation from '../components/molecules/Navigation/Navigation';
import HeaderActions from '../components/molecules/HeaderActions/HeaderActions';

export default function Header() {
  return (
    <header className="header">
      <div className="header-around">
        
        {/* Nhóm Logo và SearchBar */}
        <div className="header-left-center">
          <Logo />
          <SearchBar />
        </div>

        {/* Menu Điều hướng và Auth */}
        <Navigation />

        {/* Các nút Hỗ trợ / Mobile Menu */}
        <HeaderActions />

      </div>
    </header>
  );
}