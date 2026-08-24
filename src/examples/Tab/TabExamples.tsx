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
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      content: (
        <p>This panel should not be accessible because the tab is disabled.</p>
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
  ];

  return (
    <div className="stack">
      <h3>Examples</h3>

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
