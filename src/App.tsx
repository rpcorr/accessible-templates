import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ButtonsPage } from './pages/ButtonsPage';
import { ModalPage } from './pages/ModalPage';
import { DropdownPage } from './pages/DropdownPage';
import { NavigationPage } from './pages/NavigationPage';

function App() {
  const path = window.location.pathname;

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

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      current: path === '/',
    },
    {
      id: 'components',
      label: 'Components',
      children: [
        {
          id: 'buttons',
          label: 'Buttons',
          href: '/buttons',
          current: path === '/buttons',
        },
        {
          id: 'modal',
          label: 'Modal Dialog',
          href: '/modal',
          current: path === '/modal',
        },
        {
          id: 'dropdown',
          label: 'Dropdown',
          href: '/dropdown',
          current: path === '/dropdown',
        },
        {
          id: 'navigation',
          label: 'Navigation',
          href: '/navigation',
          current: path === '/navigation',
        },
      ],
    },
  ];

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <Navigation items={navigationItems} />

      {page}
    </main>
  );
}

export default App;
