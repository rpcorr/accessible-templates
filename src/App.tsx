import { getCurrentNavigationItems } from './utils/navigation';
import { Routes, Route, useLocation } from 'react-router';

import { Navigation } from './components/Navigations/Navigation';
import { HomePage } from './pages/HomePage';
import { ButtonPage } from './pages/ButtonsActions/ButtonPage';
import { ModalPage } from './pages/OverlaysMenus/ModalPage';
import { DropdownPage } from './pages/OverlaysMenus/DropdownPage';
import { NavigationPage } from './pages/Navigations/NavigationPage';
import { TooltipPage } from './pages/OverlaysMenus/TooltipPage';
import { navigationItems } from './data/navigationItems';
import { TabsPage } from './pages/ContentFeedback/TabsPage';
import { AccordionPage } from './pages/ContentFeedback/AccordionPage';
import { BreadcrumbsPage } from './pages/Navigations/BreadcrumbsPage';
import { PaginationPage } from './pages/Navigations/PaginiationPage';
import { AlertPage } from './pages/ContentFeedback/AlertPage';
import { StatusPage } from './pages/ContentFeedback/StatusPage';
import { ProgressIndicatorPage } from './pages/ContentFeedback/ProgressIndicatorPage';
import { LoadingSpinnerPage } from './pages/ContentFeedback/LoadingSpinnerPage';
import { CheckboxPage } from './pages/FormControls/CheckboxPage';
import { RadioGroupPage } from './pages/FormControls/RadioGroupPage';
import { SelectPage } from './pages/FormControls/SelectPage';
import { ComboboxPage } from './pages/FormControls/ComboboxPage';
import { SwitchPage } from './pages/FormControls/SwitchPage';
import { SliderPage } from './pages/FormControls/SliderPage';
import { TextInputPage } from './pages/FormControls/TextInputPage';

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
        <Route path="/buttons-actions/button" element={<ButtonPage />} />
        <Route path="/overlays-menus/modal" element={<ModalPage />} />
        <Route path="/overlays-menus/dropdown" element={<DropdownPage />} />
        <Route path="/overlays-menus/tooltip" element={<TooltipPage />} />
        <Route path="/navigations/navigation" element={<NavigationPage />} />
        <Route path="/content-feedback/accordion" element={<AccordionPage />} />
        <Route path="/content-feedback/tab" element={<TabsPage />} />
        <Route path="/navigations/breadcrumbs" element={<BreadcrumbsPage />} />
        <Route path="/navigations/pagination" element={<PaginationPage />} />
        <Route path="/content-feedback/alert" element={<AlertPage />} />
        <Route path="/content-feedback/status" element={<StatusPage />} />
        <Route
          path="/content-feedback/progress-indicator"
          element={<ProgressIndicatorPage />}
        />
        <Route
          path="/content-feedback/loading-spinner"
          element={<LoadingSpinnerPage />}
        />
        <Route path="/form-controls/checkbox" element={<CheckboxPage />} />
        <Route path="/form-controls/radio-group" element={<RadioGroupPage />} />
        <Route path="/form-controls/select" element={<SelectPage />} />
        <Route path="/form-controls/combobox" element={<ComboboxPage />} />
        <Route path="/form-controls/switch" element={<SwitchPage />} />
        <Route path="/form-controls/slider" element={<SliderPage />} />
        <Route path="/form-controls/text-input" element={<TextInputPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
