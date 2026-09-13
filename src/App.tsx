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
import { BreadcrumbsPage } from './pages/BreadcrumbsPage';
import { PaginationPage } from './pages/PaginiationPage';
import { AlertPage } from './pages/AlertPage';
import { StatusPage } from './pages/StatusPage';
import { ProgressIndicatorPage } from './pages/ProgressIndicatorPage';
import { LoadingSpinnerPage } from './pages/LoadingSpinnerPage';
import { CheckboxPage } from './pages/CheckboxPage';
import { RadioGroupPage } from './pages/RadioGroupPage';
import { SelectPage } from './pages/SelectPage';
import { ComboboxPage } from './pages/ComboboxPage';
import { SwitchPage } from './pages/SwitchPage';
import { SliderPage } from './pages/SliderPage';
import { TextInputPage } from './pages/TextInputPage';

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
        <Route path="/breadcrumbs" element={<BreadcrumbsPage />} />
        <Route path="/pagination" element={<PaginationPage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/progress-indicator" element={<ProgressIndicatorPage />} />
        <Route path="/loading-spinner" element={<LoadingSpinnerPage />} />
        <Route path="/checkbox" element={<CheckboxPage />} />
        <Route path="/radio-group" element={<RadioGroupPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/combobox" element={<ComboboxPage />} />
        <Route path="/switch" element={<SwitchPage />} />
        <Route path="/slider" element={<SliderPage />} />
        <Route path="/text-input" element={<TextInputPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
