import { useState } from 'react';
import { Tabs } from '../../../ContentFeedback/Tab';
import { PasswordInput, type PasswordRequirement } from '..';

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 12 characters',
    validate: (password) => password.length >= 12,
  },
  {
    id: 'lowercase',
    label: 'At least one lowercase letter',
    validate: (password) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    label: 'At least one uppercase letter',
    validate: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    label: 'At least one number',
    validate: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'At least one special character',
    validate: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function PasswordInputExamples() {
  const [password, setPassword] = useState('');
  const [requirementsPassword, setRequirementsPassword] = useState('');
  const [checklistPassword, setChecklistPassword] = useState('');
  const [strengthPassword, setStrengthPassword] = useState('');

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
        {
          id: 'checklist',
          label: 'Checklist',
          content: (
            <div className="stack">
              <h4>Password Requirements – Checklist</h4>

              <p>
                Enter a password to see which requirements you have satisfied.
              </p>

              <PasswordInput
                label="Create a password"
                value={checklistPassword}
                onChange={setChecklistPassword}
                requirements={passwordRequirements}
                requirementDisplay="list"
                autoComplete="new-password"
              />
            </div>
          ),
        },
        {
          id: 'requirements',
          label: 'Single Message',
          content: (
            <div className="stack">
              <h4>Password Requirements – Single Message</h4>

              <p>
                Your password must meet all five requirements. The component
                displays the first unmet requirement.
              </p>

              <PasswordInput
                label="Create a password"
                value={requirementsPassword}
                onChange={setRequirementsPassword}
                requirements={passwordRequirements}
                requirementDisplay="message"
                autoComplete="new-password"
              />
            </div>
          ),
        },
        {
          id: 'strength',
          label: 'Password Strength',
          content: (
            <div className="stack">
              <h4>Password Strength Indicator</h4>

              <p>Enter a password to see an estimated strength rating.</p>

              <PasswordInput
                label="Create a password"
                value={strengthPassword}
                onChange={setStrengthPassword}
                showStrength
                autoComplete="new-password"
              />
            </div>
          ),
        },
      ]}
    />
  );
}
