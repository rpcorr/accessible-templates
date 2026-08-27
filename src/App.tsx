import { getCurrentNavigationItems } from './utils/navigation';
import { Routes, Route, useLocation } from 'react-router';

import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ButtonPage } from './pages/ButtonPage';
import { ModalPage } from './pages/ModalPage';
import { DropdownPage } from './pages/DropdownPage';
import { NavigationPage } from './pages/NavigationPage';
import { TooltipPage } from './pages/TooltipPage';
import { navigationItems } from './data/navigationItems';
import { TabsPage } from './pages/TabsPage';
import { AccordionPage } from './pages/AccordionPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const { pathname } = useLocation();

  const currentNavigationItems = getCurrentNavigationItems(
    navigationItems,
    pathname,
  );

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <Navigation items={currentNavigationItems} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/modal" element={<ModalPage />} />
        <Route path="/dropdown" element={<DropdownPage />} />
        <Route path="/navigation" element={<NavigationPage />} />
        <Route path="/tooltip" element={<TooltipPage />} />
        <Route path="/accordion" element={<AccordionPage />} />
        <Route path="/tab" element={<TabsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
