import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ButtonsPage } from './pages/ButtonsPage';
import { ModalPage } from './pages/ModalPage';
import { DropdownPage } from './pages/DropdownPage';
import { NavigationPage } from './pages/NavigationPage';
import { navigationItems } from './data/navigationItems';
import { Routes, Route, useLocation } from 'react-router';

function App() {
  const { pathname } = useLocation();

  const currentNavigationItems = navigationItems.map((item) => ({
    ...item,
    current: item.href === pathname,
    children: item.children?.map((child) => ({
      ...child,
      current: child.href === pathname,
    })),
  }));

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <Navigation items={currentNavigationItems} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buttons" element={<ButtonsPage />} />
        <Route path="/modal" element={<ModalPage />} />
        <Route path="/dropdown" element={<DropdownPage />} />
        <Route path="/navigation" element={<NavigationPage />} />
      </Routes>
    </main>
  );
}

export default App;
