import { getCurrentNavigationItems } from './utils/navigation';
import { Routes, Route, useLocation } from 'react-router';

import { Navigation } from './components/Navigations/Navigation';
import { ToastProvider } from './components/ContentFeedback/Toast';

import { HomePage } from './pages/HomePage';
import { ComponentPage } from './pages/ComponentPage';
import { navigationItems } from './data/navigationItems';

import { ButtonPage } from './pages/ButtonsActions/ButtonPage';

import { DropdownPage } from './pages/OverlaysMenus/DropdownPage';
import { MenuButtonPage } from './pages/OverlaysMenus/MenuButtonPage';
import { ModalPage } from './pages/OverlaysMenus/ModalPage';
import { PopoverPage } from './pages/OverlaysMenus/PopoverPage';
import { TooltipPage } from './pages/OverlaysMenus/TooltipPage';

import { BreadcrumbsPage } from './pages/Navigations/BreadcrumbsPage';
import { NavigationPage } from './pages/Navigations/NavigationPage';
import { PaginationPage } from './pages/Navigations/PaginiationPage';

import { AccordionPage } from './pages/ContentFeedback/AccordionPage';
import { AlertPage } from './pages/ContentFeedback/AlertPage';
import { DisclosurePage } from './pages/ContentFeedback/DisclosurePage';
import { LoadingSpinnerPage } from './pages/ContentFeedback/LoadingSpinnerPage';
import { ProgressIndicatorPage } from './pages/ContentFeedback/ProgressIndicatorPage';
import { StatusPage } from './pages/ContentFeedback/StatusPage';
import { TabsPage } from './pages/ContentFeedback/TabsPage';
import { ToastPage } from './pages/ContentFeedback/ToastPage';

import { CheckboxPage } from './pages/FormControls/CheckboxPage';
import { ComboboxPage } from './pages/FormControls/ComboboxPage';
import { DatePickerPage } from './pages/FormControls/DatePickerPage';
import { FileUploadPage } from './pages/FormControls/FileUploadPage';
import { NumberInputPage } from './pages/FormControls/NumberInputPage';
import { RadioGroupPage } from './pages/FormControls/RadioGroupPage';
import { SearchBoxPage } from './pages/FormControls/SearchBoxPage';
import { SearchComboboxPage } from './pages/FormControls/SearchComboboxPage';
import { SelectPage } from './pages/FormControls/SelectPage';
import { SliderPage } from './pages/FormControls/SliderPage';
import { SwitchPage } from './pages/FormControls/SwitchPage';
import { TextareaPage } from './pages/FormControls/TextareaPage';
import { TextInputPage } from './pages/FormControls/TextInputPage';
import { TimePickerPage } from './pages/FormControls/TimePickerPage';

import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const { pathname } = useLocation();

  const currentNavigationItems = getCurrentNavigationItems(
    navigationItems,
    pathname,
  );

  return (
    <ToastProvider>
      <main className="container stack">
        <h1>Accessible Library</h1>

        <Navigation items={currentNavigationItems} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentPage />} />

          <Route path="/buttons-actions/button" element={<ButtonPage />} />

          <Route path="/overlays-menus/modal" element={<ModalPage />} />
          <Route path="/overlays-menus/dropdown" element={<DropdownPage />} />
          <Route path="/overlays-menus/tooltip" element={<TooltipPage />} />
          <Route path="/overlays-menus/popover" element={<PopoverPage />} />
          <Route
            path="/overlays-menus/menu-button"
            element={<MenuButtonPage />}
          />

          <Route path="/navigations/navigation" element={<NavigationPage />} />
          <Route
            path="/navigations/breadcrumbs"
            element={<BreadcrumbsPage />}
          />
          <Route path="/navigations/pagination" element={<PaginationPage />} />

          <Route
            path="/content-feedback/accordion"
            element={<AccordionPage />}
          />
          <Route path="/content-feedback/alert" element={<AlertPage />} />
          <Route
            path="/content-feedback/disclosure"
            element={<DisclosurePage />}
          />
          <Route
            path="/content-feedback/loading-spinner"
            element={<LoadingSpinnerPage />}
          />
          <Route
            path="/content-feedback/progress-indicator"
            element={<ProgressIndicatorPage />}
          />
          <Route path="/content-feedback/status" element={<StatusPage />} />
          <Route path="/content-feedback/tab" element={<TabsPage />} />
          <Route path="/content-feedback/toast" element={<ToastPage />} />

          <Route path="/form-controls/checkbox" element={<CheckboxPage />} />
          <Route path="/form-controls/combobox" element={<ComboboxPage />} />
          <Route
            path="/form-controls/date-picker"
            element={<DatePickerPage />}
          />
          <Route
            path="/form-controls/file-upload"
            element={<FileUploadPage />}
          />
          <Route
            path="/form-controls/number-input"
            element={<NumberInputPage />}
          />
          <Route
            path="/form-controls/radio-group"
            element={<RadioGroupPage />}
          />
          <Route
            path="/form-controls/search-combobox"
            element={<SearchComboboxPage />}
          />
          <Route path="/form-controls/select" element={<SelectPage />} />
          <Route path="/form-controls/search-box" element={<SearchBoxPage />} />
          <Route path="/form-controls/slider" element={<SliderPage />} />
          <Route path="/form-controls/switch" element={<SwitchPage />} />
          <Route path="/form-controls/textarea" element={<TextareaPage />} />
          <Route path="/form-controls/text-input" element={<TextInputPage />} />
          <Route
            path="/form-controls/time-picker"
            element={<TimePickerPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </ToastProvider>
  );
}

export default App;
