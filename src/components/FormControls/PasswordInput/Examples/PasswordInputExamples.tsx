import { useState } from 'react';
import { Tabs } from '../../../ContentFeedback/Tab';
import { PasswordInput } from '..';

export function PasswordInputExamples() {
  const [password, setPassword] = useState('');

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <h4>Basic Password Input</h4>

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
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

              <PasswordInput
                label="New password"
                description="Use at least 8 characters."
                autoComplete="new-password"
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

              <PasswordInput
                label="Password"
                value="short"
                error="Password must contain at least 8 characters."
                autoComplete="new-password"
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

              <PasswordInput label="Password" required />

              <h4>Disabled</h4>

              <PasswordInput
                label="Disabled password"
                defaultValue="ExamplePassword123"
                disabled
              />

              <h4>Read Only</h4>

              <PasswordInput
                label="Read-only password"
                defaultValue="ExamplePassword123"
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

              <PasswordInput
                label="Password"
                minLength={8}
                maxLength={20}
                description="Must be between 8 and 20 characters."
              />
            </div>
          ),
        },
        {
          id: 'controlled',
          label: 'Controlled',
          content: (
            <div className="stack">
              <h4>Controlled Password Input</h4>

              <PasswordInput
                label="Password"
                value={password}
                onChange={setPassword}
              />

              <p>Password length: {password.length}</p>
            </div>
          ),
        },
      ]}
    />
  );
}
