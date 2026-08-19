import { PageLayout } from '../components/PageLayout/PageLayout';
import { NavigationExamples } from '../examples';

export function NavigationPage() {
  return (
    <PageLayout title="Navigation">
      <p>
        Accessible responsive navigation with nested submenus, keyboard
        navigation, focus management, and a mobile navigation drawer.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>Uses semantic navigation landmarks and links.</li>
        <li>
          Supports keyboard navigation through top-level items and submenus.
        </li>
        <li>Supports nested submenus with focus management.</li>
        <li>
          Uses <code>aria-expanded</code> and <code>aria-controls</code> for
          submenu state.
        </li>
        <li>Provides a responsive mobile navigation drawer.</li>
        <li>Traps focus inside the mobile drawer while it is open.</li>
        <li>
          Uses <code>inert</code> to remove the closed mobile drawer from
          keyboard navigation.
        </li>
        <li>Supports Escape to close the mobile drawer and restore focus.</li>
      </ul>
      <NavigationExamples />
    </PageLayout>
  );
}
