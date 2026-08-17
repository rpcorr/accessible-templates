import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ButtonsPage } from './pages/ButtonsPage';
import { ModalPage } from './pages/ModalPage';
import { DropdownPage } from './pages/DropdownPage';
import { NavigationPage } from './pages/NavigationPage';
import { navigationItems } from './data/navigationItems';

function getCurrentNavigationItems(path: string): typeof navigationItems {
  return navigationItems.map((item) => ({
    ...item,
    current: item.href === path ? true : undefined,
    children: item.children?.map((child) => ({
      ...child,
      current: child.href === path ? true : undefined,
    })),
  }));
}

function App() {
  const path = window.location.pathname;
  const currentNavigationItems = getCurrentNavigationItems(path);

  let page;

  switch (path) {
    case '/buttons':
      page = <ButtonsPage />;
      break;

    case '/modal':
      page = <ModalPage />;
      break;

    case '/dropdown':
      page = <DropdownPage />;
      break;

    case '/navigation':
      page = <NavigationPage />;
      break;

    default:
      page = <HomePage />;
  }

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <Navigation items={currentNavigationItems} />

      {page}
    </main>
  );
}

export default App;
