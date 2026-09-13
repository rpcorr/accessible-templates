import { useState } from 'react';
import { Tabs } from '../../components/Tab';
import { TextInput } from '../../components/FormControls/TextInput';

export function TextInputExamples() {
  const [name, setName] = useState('');

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <h4>Basic Text Input</h4>

              <TextInput label="Name" placeholder="Enter your name" />
            </div>
          ),
        },
        {
          id: 'types',
          label: 'Types',
          content: (
            <div className="stack">
              <h4>Input Types</h4>

              <TextInput
                label="Email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
              />

              <TextInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <TextInput
                label="Telephone"
                type="tel"
                placeholder="555-555-5555"
                autoComplete="tel"
              />

              <TextInput
                label="Website"
                type="url"
                placeholder="https://example.com"
              />
            </div>
          ),
        },
        {
          id: 'description',
          label: 'Description',
          content: (
            <div className="stack">
              <h4>With Description</h4>

              <TextInput
                label="Username"
                description="Choose a username that is between 3 and 20 characters."
              />
            </div>
          ),
        },
        {
          id: 'error',
          label: 'Error',
          content: (
            <div className="stack">
              <h4>With Error</h4>

              <TextInput
                label="Email"
                type="email"
                value="invalid-email"
                error="Please enter a valid email address."
              />
            </div>
          ),
        },
        {
          id: 'states',
          label: 'States',
          content: (
            <div className="stack">
              <h4>Required</h4>

              <TextInput label="First name" required />

              <h4>Disabled</h4>

              <TextInput
                label="Disabled input"
                defaultValue="This input is disabled"
                disabled
              />

              <h4>Read Only</h4>

              <TextInput
                label="Account number"
                defaultValue="123456789"
                readOnly
              />
            </div>
          ),
        },
        {
          id: 'limits',
          label: 'Limits',
          content: (
            <div className="stack">
              <h4>Character Limits</h4>

              <TextInput
                label="Username"
                minLength={3}
                maxLength={20}
                description="Must be between 3 and 20 characters."
              />
            </div>
          ),
        },
        {
          id: 'controlled',
          label: 'Controlled',
          content: (
            <div className="stack">
              <h4>Controlled Text Input</h4>

              <TextInput label="Name" value={name} onChange={setName} />

              <p>Current value: {name || 'Nothing entered'}</p>
            </div>
          ),
        },
      ]}
    />
  );
}
