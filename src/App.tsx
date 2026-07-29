import { Navigation } from './components/Navigation';
import { ButtonExamples, ModalExamples } from './examples';
import { DropdownExamples } from './examples/Dropdown/DropdownExamples';

function App() {
  const navigationItems = [
    { label: 'Home', href: '#', current: true },
    { label: 'Products', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
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
