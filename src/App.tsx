import { Navigation } from './components/Navigation';
import { ButtonExamples, ModalExamples } from './examples';
import { DropdownExamples } from './examples/Dropdown/DropdownExamples';

function App() {
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      href: '#',
      current: true,
    },
    {
      id: 'products',
      label: 'Products',
      href: '#',
    },
    {
      id: 'services',
      label: 'Services',
      href: '#',
    },
    {
      id: 'about',
      label: 'About',
      href: '#',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#',
    },
  ];

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <ButtonExamples />

      <ModalExamples />

      <DropdownExamples />

      <h2>Navigation</h2>

      <Navigation items={navigationItems} />
    </main>
  );
}

export default App;
