import { useState } from 'react';
import { Switch } from '../../../components/FormControls/Switch';
import { Tabs } from '../../../components/ContentFeedback/Tab';

export function SwitchExamples() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <div>
                <h4>Basic Switch</h4>

                <Switch label="Enable notifications" />
              </div>

              <div>
                <h4>Default On</h4>

                <Switch label="Enable dark mode" defaultChecked />
              </div>

              <div>
                <h4>Controlled Switch</h4>

                <Switch
                  label="Enable notifications"
                  checked={notificationsEnabled}
                  onChange={setNotificationsEnabled}
                />

                <p>
                  Notifications: {notificationsEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>

              <div>
                <h4>With Description</h4>

                <Switch
                  label="Receive email updates"
                  description="Turn this on to receive occasional updates by email."
                />
              </div>

              <div>
                <h4>Colour Variants</h4>

                <div className="stack">
                  <Switch label="Default" colour="default" defaultChecked />

                  <Switch label="Success" colour="success" defaultChecked />

                  <Switch label="Warning" colour="warning" defaultChecked />

                  <Switch label="Error" colour="error" defaultChecked />

                  <Switch label="Info" colour="info" defaultChecked />
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'states',
          label: 'States',
          content: (
            <div className="stack">
              <div>
                <h4>Disabled Off</h4>

                <Switch label="Disabled switch" disabled />
              </div>

              <div>
                <h4>Disabled On</h4>

                <Switch label="Disabled switch" defaultChecked disabled />
              </div>

              <div>
                <h4>Required</h4>

                <Switch label="Accept notifications" required />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
