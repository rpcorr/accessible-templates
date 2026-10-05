import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { MenuButtonExamples } from './examples/MenuButtonExamples';

export function MenuButtonPage() {
  return (
    <PageLayout
      title="Menu Button"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Menu Button</BreadcrumbItem>
        </>
      }
    >
      <p>
        Accessible menu buttons with keyboard navigation, typeahead support,
        focus management, Escape key handling, and support for disabled menu
        items.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses <code>aria-haspopup="menu"</code> to identify the button as
          controlling a menu.
        </li>
        <li>
          Uses <code>aria-expanded</code> to communicate the menu's open or
          closed state.
        </li>
        <li>
          Uses <code>aria-controls</code> to associate the button with its menu.
        </li>
        <li>
          Uses the semantic <code>menu</code> and <code>menuitem</code> roles.
        </li>
        <li>Moves focus into the menu when it opens.</li>
        <li>
          Skips disabled menu items during keyboard navigation and typeahead.
        </li>
        <li>Supports typeahead navigation by matching menu item labels.</li>
        <li>Restores focus to the menu button when the menu closes.</li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Enter or Space opens and closes the menu.</li>
        <li>Arrow Down opens the menu and moves focus to the first item.</li>
        <li>Arrow Up opens the menu and moves focus to the last item.</li>
        <li>Arrow Down moves focus to the next menu item.</li>
        <li>Arrow Up moves focus to the previous menu item.</li>
        <li>Home moves focus to the first enabled menu item.</li>
        <li>End moves focus to the last enabled menu item.</li>
        <li>Type characters to move focus to a matching enabled menu item.</li>
        <li>
          Type multiple characters quickly to match a menu item by label prefix.
        </li>
        <li>Repeated characters cycle through matching menu items.</li>
        <li>Escape closes the menu and returns focus to the button.</li>
        <li>Tab closes the menu and continues normal page navigation.</li>
      </ul>

      <MenuButtonExamples />
    </PageLayout>
  );
}
