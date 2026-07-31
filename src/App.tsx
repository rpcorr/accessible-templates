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
      children: [
        {
          id: 'web',
          label: 'Web Development',
          href: '#',
        },
        {
          id: 'accessibility',
          label: 'Accessibility',
          children: [
            {
              id: 'wcag',
              label: 'WCAG',
              href: '#',
            },
            {
              id: 'audits',
              label: 'Accessibility Audits',
              href: '#',
            },
          ],
        },
      ],
    },
    {
      id: 'services',
      label: 'Services',
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
