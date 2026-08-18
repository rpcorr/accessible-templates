import { Navigation } from '../../components/Navigation';

export function NavigationExamples() {
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
    <>
      <h2>Navigation Examples</h2>
      <Navigation items={navigationItems} />
    </>
  );
}
