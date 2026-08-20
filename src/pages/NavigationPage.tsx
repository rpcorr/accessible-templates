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

      <h3>Keyboard Support</h3>

      <p>The navigation supports the following keyboard interactions.</p>

      <h4>Top-Level Navigation</h4>

      <table className="docTable">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tab</td>
            <td>Move between navigation controls and links</td>
          </tr>
          <tr>
            <td>Enter / Space</td>
            <td>Open a submenu</td>
          </tr>
          <tr>
            <td>Arrow Down</td>
            <td>Move into the submenu</td>
          </tr>
          <tr>
            <td>Arrow Right</td>
            <td>Open the submenu</td>
          </tr>
          <tr>
            <td>Arrow Left</td>
            <td>Close the submenu and return focus</td>
          </tr>
          <tr>
            <td>Escape</td>
            <td>Close the submenu and return focus</td>
          </tr>
        </tbody>
      </table>

      <h4>Submenus</h4>

      <table className="docTable">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Arrow Down</td>
            <td>Move to the next item</td>
          </tr>
          <tr>
            <td>Arrow Up</td>
            <td>Move to the previous item</td>
          </tr>
          <tr>
            <td>Home</td>
            <td>Move to the first item</td>
          </tr>
          <tr>
            <td>End</td>
            <td>Move to the last item</td>
          </tr>
          <tr>
            <td>Arrow Left</td>
            <td>Close the submenu and return focus</td>
          </tr>
          <tr>
            <td>Escape</td>
            <td>Close the submenu and return focus</td>
          </tr>
        </tbody>
      </table>
      <NavigationExamples />
    </PageLayout>
  );
}
