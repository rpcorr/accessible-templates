import { Tabs } from '../../components/Tab';

export function TabsExamples() {
  const horizontalTabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <p>
          This is the overview panel. It provides a general introduction to the
          content in this tab set.
        </p>
      ),
    },
    {
      id: 'details',
      label: 'Details',
      content: (
        <p>
          This panel contains additional details and supporting information.
        </p>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <p>This panel contains settings and configuration options.</p>,
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      content: (
        <p>
          This panel contains accessibility information, including keyboard
          support, screen reader behaviour, and ARIA implementation details.
        </p>
      ),
    },
    {
      id: 'advanced-settings',
      label: 'Advanced Settings',
      disabled: true,
      content: (
        <p>
          This panel contains advanced configuration options and additional
          settings.
        </p>
      ),
    },
    {
      id: 'documentation',
      label: 'Documentation',
      content: (
        <>
          <p>
            This panel contains documentation, usage examples, and
            implementation guidance for the component. It provides additional
            information to help developers understand how the Tabs component
            works and how it can be integrated into an accessible application.
          </p>

          <p>
            The Tabs component supports both horizontal and vertical
            orientations. Keyboard users can navigate between enabled tabs using
            the appropriate arrow keys, while screen reader users receive
            information about the selected tab and its position within the tab
            list.
          </p>

          <p>
            Each tab is associated with its corresponding tab panel using ARIA
            attributes. The active panel can receive keyboard focus so that its
            content can be accessed and read by screen reader users.
          </p>

          <h5>Accessibility Features</h5>

          <ul>
            <li>Keyboard navigation between enabled tabs</li>
            <li>Horizontal and vertical tab orientations</li>
            <li>Disabled tab support</li>
            <li>Screen reader support with NVDA</li>
            <li>Accessible tab and panel relationships</li>
            <li>Responsive behaviour at increased browser zoom levels</li>
            <li>Visible keyboard focus indicators</li>
          </ul>

          <p>
            The component is designed to remain usable at 100%, 200%, and 400%
            browser zoom. Long tab labels and panel content should wrap
            naturally without causing unnecessary horizontal scrolling.
          </p>
        </>
      ),
    },
  ];

  const verticalTabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: <p>This panel contains profile information.</p>,
    },
    {
      id: 'account',
      label: 'Account',
      content: <p>This panel contains account information.</p>,
    },
    {
      id: 'preferences',
      label: 'Preferences',
      content: <p>This panel contains user preferences.</p>,
    },
    {
      id: 'documentation',
      label: 'Documentation',
      content: (
        <>
          <p>
            This panel contains documentation, usage examples, and
            implementation guidance for the component. It provides additional
            information to help developers understand how the Tabs component
            works and how it can be integrated into an accessible application.
          </p>

          <p>
            The Tabs component supports both horizontal and vertical
            orientations. Keyboard users can navigate between enabled tabs using
            the appropriate arrow keys, while screen reader users receive
            information about the selected tab and its position within the tab
            list.
          </p>

          <p>
            Each tab is associated with its corresponding tab panel using ARIA
            attributes. The active panel can receive keyboard focus so that its
            content can be accessed and read by screen reader users.
          </p>

          <h5>Accessibility Features</h5>

          <ul>
            <li>Keyboard navigation between enabled tabs</li>
            <li>Horizontal and vertical tab orientations</li>
            <li>Disabled tab support</li>
            <li>Screen reader support with NVDA</li>
            <li>Accessible tab and panel relationships</li>
            <li>Responsive behaviour at increased browser zoom levels</li>
            <li>Visible keyboard focus indicators</li>
          </ul>

          <p>
            The component is designed to remain usable at 100%, 200%, and 400%
            browser zoom. Long tab labels and panel content should wrap
            naturally without causing unnecessary horizontal scrolling.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="stack">
      <div className="stack">
        <h4>Horizontal Tabs</h4>

        <Tabs tabs={horizontalTabs} />
      </div>

      <div className="stack">
        <h4>Vertical Tabs</h4>

        <Tabs tabs={verticalTabs} orientation="vertical" />
      </div>
    </div>
  );
}
