import { PageLayout } from '../components/PageLayout/PageLayout';
import { DropdownExamples } from '../examples';

export function DropdownPage() {
  return (
    <PageLayout title="Dropdown Examples">
      <p>
        Accessible dropdown menus with keyboard navigation, nested submenus,
        typeahead support, focus management, and responsive behaviour.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>Uses semantic menu and menu item roles.</li>
        <li>Supports keyboard navigation with Arrow, Home, and End keys.</li>
        <li>Supports nested submenus with multiple levels.</li>
        <li>Manages focus when opening and closing menus and submenus.</li>
        <li>Supports typeahead navigation.</li>
        <li>Supports disabled menu items and semantic separators.</li>
        <li>Adapts nested menus to smaller screen sizes.</li>
      </ul>
      <DropdownExamples />
    </PageLayout>
  );
}
