import { useState } from 'react';
import { Checkbox } from '../../../components/FormControls/Checkbox';

export function CheckboxExamples() {
  const [controlledChecked, setControlledChecked] = useState(false);

  return (
    <div className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <h4>Basic Checkbox</h4>
        <Checkbox label="I agree to the terms and conditions" />
      </div>

      <div className="stack">
        <h4>Checked Checkbox</h4>
        <Checkbox label="Email notifications" defaultChecked />
      </div>

      <div className="stack">
        <h4>Disabled Checkbox</h4>
        <Checkbox label="This option is unavailable" disabled />
      </div>

      <div className="stack">
        <h4>Disabled Checked Checkbox</h4>
        <Checkbox
          label="This option is already selected"
          defaultChecked
          disabled
        />
      </div>

      <div className="stack">
        <h4>Required Checkbox</h4>
        <Checkbox label="I agree to the privacy policy" required />
      </div>

      <div className="stack">
        <h4>Checkbox with Description</h4>
        <Checkbox
          label="Receive email updates"
          description="You can unsubscribe from these notifications at any time."
        />
      </div>

      <div className="stack">
        <h4>Controlled Checkbox</h4>
        <Checkbox
          label="Enable notifications"
          checked={controlledChecked}
          onChange={(event) => setControlledChecked(event.target.checked)}
        />

        <p>Notifications are {controlledChecked ? 'enabled' : 'disabled'}.</p>
      </div>

      <div className="stack">
        <h4>Indeterminate Checkbox</h4>
        <Checkbox label="Select all options" indeterminate />
      </div>
    </div>
  );
}
