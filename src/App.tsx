import { lazy, Suspense } from 'react';
import { getCurrentNavigationItems } from './utils/navigation';
import { Routes, Route, useLocation } from 'react-router';

import { Navigation } from './components/Navigations/Navigation';
import { ToastProvider } from './components/ContentFeedback/Toast';
import { navigationItems } from './data/navigationItems';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const ComponentPage = lazy(() =>
  import('./pages/ComponentPage').then((m) => ({ default: m.ComponentPage })),
);

const ButtonPage = lazy(() =>
  import('./pages/ButtonsActions/ButtonPage').then((m) => ({
    default: m.ButtonPage,
  })),
);

const CardPage = lazy(() =>
  import('./pages/DataDisplay/CardPage').then((m) => ({ default: m.CardPage })),
);
const ListPage = lazy(() =>
  import('./pages/DataDisplay/ListPage').then((m) => ({
    default: m.ListPage,
  })),
);
const StatisticPage = lazy(() => import('./pages/DataDisplay/StatisticPage'));
const TablePage = lazy(() =>
  import('./pages/DataDisplay/TablePage').then((m) => ({
    default: m.TablePage,
  })),
);

const ContextMenuPage = lazy(() =>
  import('./pages/OverlaysMenus/ContextMenuPage').then((m) => ({
    default: m.ContextMenuPage,
  })),
);
const DropdownPage = lazy(() =>
  import('./pages/OverlaysMenus/DropdownPage').then((m) => ({
    default: m.DropdownPage,
  })),
);
const MenuButtonPage = lazy(() =>
  import('./pages/OverlaysMenus/MenuButtonPage').then((m) => ({
    default: m.MenuButtonPage,
  })),
);
const ModalPage = lazy(() =>
  import('./pages/OverlaysMenus/ModalPage').then((m) => ({
    default: m.ModalPage,
  })),
);
const PopoverPage = lazy(() =>
  import('./pages/OverlaysMenus/PopoverPage').then((m) => ({
    default: m.PopoverPage,
  })),
);
const TooltipPage = lazy(() =>
  import('./pages/OverlaysMenus/TooltipPage').then((m) => ({
    default: m.TooltipPage,
  })),
);

const BreadcrumbsPage = lazy(() =>
  import('./pages/Navigations/BreadcrumbsPage').then((m) => ({
    default: m.BreadcrumbsPage,
  })),
);
const CarouselPage = lazy(() =>
  import('./pages/Navigations/CarouselPage').then((m) => ({
    default: m.CarouselPage,
  })),
);
const MultiItemCarouselPage = lazy(() =>
  import('./pages/Navigations/MultiItemCarouselPage').then((m) => ({
    default: m.MultiItemCarouselPage,
  })),
);
const NavigationPage = lazy(() =>
  import('./pages/Navigations/NavigationPage').then((m) => ({
    default: m.NavigationPage,
  })),
);
const PaginationPage = lazy(() =>
  import('./pages/Navigations/PaginiationPage').then((m) => ({
    default: m.PaginationPage,
  })),
);
const SkipLinkPage = lazy(() =>
  import('./pages/Navigations/SkipLinkPage').then((m) => ({
    default: m.SkipLinkPage,
  })),
);

const AccordionPage = lazy(() =>
  import('./pages/ContentFeedback/AccordionPage').then((m) => ({
    default: m.AccordionPage,
  })),
);
const AlertPage = lazy(() =>
  import('./pages/ContentFeedback/AlertPage').then((m) => ({
    default: m.AlertPage,
  })),
);
const BadgePage = lazy(() => import('./pages/ContentFeedback/BadgePage'));
const DisclosurePage = lazy(() =>
  import('./pages/ContentFeedback/DisclosurePage').then((m) => ({
    default: m.DisclosurePage,
  })),
);
const LoadingSpinnerPage = lazy(() =>
  import('./pages/ContentFeedback/LoadingSpinnerPage').then((m) => ({
    default: m.LoadingSpinnerPage,
  })),
);
const ProgressIndicatorPage = lazy(() =>
  import('./pages/ContentFeedback/ProgressIndicatorPage').then((m) => ({
    default: m.ProgressIndicatorPage,
  })),
);
const StatusPage = lazy(() =>
  import('./pages/ContentFeedback/StatusPage').then((m) => ({
    default: m.StatusPage,
  })),
);
const TabsPage = lazy(() =>
  import('./pages/ContentFeedback/TabsPage').then((m) => ({
    default: m.TabsPage,
  })),
);
const ToastPage = lazy(() =>
  import('./pages/ContentFeedback/ToastPage').then((m) => ({
    default: m.ToastPage,
  })),
);

const CheckboxPage = lazy(() =>
  import('./pages/FormControls/CheckboxPage').then((m) => ({
    default: m.CheckboxPage,
  })),
);
const ComboboxPage = lazy(() =>
  import('./pages/FormControls/ComboboxPage').then((m) => ({
    default: m.ComboboxPage,
  })),
);
const DatePickerPage = lazy(() =>
  import('./pages/FormControls/DatePickerPage').then((m) => ({
    default: m.DatePickerPage,
  })),
);
const DateRangePickerPage = lazy(() =>
  import('./pages/FormControls/DateRangePickerPage').then((m) => ({
    default: m.DateRangePickerPage,
  })),
);
const FileUploadPage = lazy(() =>
  import('./pages/FormControls/FileUploadPage').then((m) => ({
    default: m.FileUploadPage,
  })),
);
const NumberInputPage = lazy(() =>
  import('./pages/FormControls/NumberInputPage').then((m) => ({
    default: m.NumberInputPage,
  })),
);
const RadioGroupPage = lazy(() =>
  import('./pages/FormControls/RadioGroupPage').then((m) => ({
    default: m.RadioGroupPage,
  })),
);
const SearchBoxPage = lazy(() =>
  import('./pages/FormControls/SearchBoxPage').then((m) => ({
    default: m.SearchBoxPage,
  })),
);
const SearchComboboxPage = lazy(() =>
  import('./pages/FormControls/SearchComboboxPage').then((m) => ({
    default: m.SearchComboboxPage,
  })),
);
const SelectPage = lazy(() =>
  import('./pages/FormControls/SelectPage').then((m) => ({
    default: m.SelectPage,
  })),
);

const SignatureFieldPage = lazy(() =>
  import('./pages/FormControls/SignatureFieldPage').then((m) => ({
    default: m.SignatureFieldPage,
  })),
);
const SliderPage = lazy(() =>
  import('./pages/FormControls/SliderPage').then((m) => ({
    default: m.SliderPage,
  })),
);
const SwitchPage = lazy(() =>
  import('./pages/FormControls/SwitchPage').then((m) => ({
    default: m.SwitchPage,
  })),
);
const TextareaPage = lazy(() =>
  import('./pages/FormControls/TextareaPage').then((m) => ({
    default: m.TextareaPage,
  })),
);
const TextInputPage = lazy(() =>
  import('./pages/FormControls/TextInputPage').then((m) => ({
    default: m.TextInputPage,
  })),
);
const TimePickerPage = lazy(() =>
  import('./pages/FormControls/TimePickerPage').then((m) => ({
    default: m.TimePickerPage,
  })),
);

const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
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

        <Suspense fallback={<p>Loading component...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<ComponentPage />} />

            <Route path="/buttons-actions/button" element={<ButtonPage />} />

            <Route path="/data-display/card" element={<CardPage />} />
            <Route path="/data-display/list" element={<ListPage />} />
            <Route path="/data-display/statistic" element={<StatisticPage />} />
            <Route path="/data-display/table" element={<TablePage />} />

            <Route
              path="/overlays-menus/context-menu"
              element={<ContextMenuPage />}
            />
            <Route path="/overlays-menus/dropdown" element={<DropdownPage />} />
            <Route path="/overlays-menus/modal" element={<ModalPage />} />
            <Route path="/overlays-menus/popover" element={<PopoverPage />} />
            <Route path="/overlays-menus/tooltip" element={<TooltipPage />} />
            <Route
              path="/overlays-menus/menu-button"
              element={<MenuButtonPage />}
            />

            <Route
              path="/navigations/navigation"
              element={<NavigationPage />}
            />
            <Route
              path="/navigations/breadcrumbs"
              element={<BreadcrumbsPage />}
            />
            <Route path="/navigations/carousel" element={<CarouselPage />} />
            <Route
              path="/navigations/multi-item-carousel"
              element={<MultiItemCarouselPage />}
            />
            <Route
              path="/navigations/pagination"
              element={<PaginationPage />}
            />
            <Route path="/navigations/skip-link" element={<SkipLinkPage />} />

            <Route
              path="/content-feedback/accordion"
              element={<AccordionPage />}
            />
            <Route path="/content-feedback/alert" element={<AlertPage />} />
            <Route path="/content-feedback/badge" element={<BadgePage />} />
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
              path="/form-controls/date-range-picker"
              element={<DateRangePickerPage />}
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
            <Route
              path="/form-controls/search-box"
              element={<SearchBoxPage />}
            />
            <Route
              path="/form-controls/signature-field"
              element={<SignatureFieldPage />}
            />
            <Route path="/form-controls/slider" element={<SliderPage />} />
            <Route path="/form-controls/switch" element={<SwitchPage />} />
            <Route path="/form-controls/textarea" element={<TextareaPage />} />
            <Route
              path="/form-controls/text-input"
              element={<TextInputPage />}
            />
            <Route
              path="/form-controls/time-picker"
              element={<TimePickerPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </ToastProvider>
  );
}

export default App;
