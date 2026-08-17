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

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      {page}
    </main>
  );
}

export default App;
