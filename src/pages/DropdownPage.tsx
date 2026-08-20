import { PageLayout } from '../components/PageLayout/PageLayout';
import { DropdownExamples } from '../examples';

export function DropdownPage() {
  return (
    <PageLayout title="Dropdown">
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

      <h3>Keyboard Support</h3>

      <p>
        The accessible dropdown supports the following keyboard interactions.
      </p>

      <h4>Trigger</h4>

      <table className="docTable">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Enter / Space</td>
            <td>Open the menu</td>
          </tr>
          <tr>
            <td>Arrow Down</td>
            <td>Open the menu and focus the first item</td>
          </tr>
          <tr>
            <td>Arrow Up</td>
            <td>Open the menu and focus the last item</td>
          </tr>
        </tbody>
      </table>

      <h4>Menu Items</h4>

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
            <td>Enter / Space</td>
            <td>Activate the focused item</td>
          </tr>
          <tr>
            <td>Escape</td>
            <td>Close the menu and return focus to the trigger</td>
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
            <td>Arrow Right</td>
            <td>Open the submenu</td>
          </tr>
          <tr>
            <td>Arrow Left</td>
            <td>Close the submenu and return focus to the parent item</td>
          </tr>
          <tr>
            <td>Enter / Space</td>
            <td>Open the submenu</td>
          </tr>
          <tr>
            <td>Escape</td>
            <td>Close the submenu and return focus to the parent item</td>
          </tr>
        </tbody>
      </table>

      <DropdownExamples />
    </PageLayout>
  );
}
