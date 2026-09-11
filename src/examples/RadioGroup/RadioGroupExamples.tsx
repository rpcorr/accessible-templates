import { useState } from 'react';
import { RadioGroup } from '../../components/FormControls/RadioGroup';
import { Tabs } from '../../components/Tab';

export function RadioGroupExamples() {
  const [selectedTheme, setSelectedTheme] = useState('system');

  return (
    <section>
      <Tabs
        tabs={[
          {
            id: 'basic-selection',
            label: 'Basic & Selection',
            content: (
              <>
                <h4>Basic Radio Group</h4>
                <RadioGroup
                  label="Choose a size"
                  name="size"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                />
                <h4>With Default Selection</h4>
                <RadioGroup
                  label="Preferred contact method"
                  name="contact"
                  defaultValue="email"
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'mail', label: 'Mail' },
                  ]}
                />
                <h4>Controlled Radio Group</h4>
                <RadioGroup
                  label="Choose a theme"
                  name="theme"
                  value={selectedTheme}
                  onChange={setSelectedTheme}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' },
                  ]}
                />
                <p>Selected theme: {selectedTheme}</p>
              </>
            ),
          },
          {
            id: 'states',
            label: 'States',
            content: (
              <>
                <h4>Disabled Option</h4>

                <RadioGroup
                  label="Choose a plan"
                  name="plan"
                  defaultValue="standard"
                  options={[
                    { value: 'basic', label: 'Basic' },
                    { value: 'standard', label: 'Standard' },
                    {
                      value: 'premium',
                      label: 'Premium (disabled)',
                      disabled: true,
                    },
                  ]}
                />

                <h4>Disabled Selected Option</h4>

                <RadioGroup
                  label="Choose a subscription"
                  name="subscription"
                  defaultValue="standard"
                  options={[
                    { value: 'basic', label: 'Basic' },
                    {
                      value: 'standard',
                      label: 'Standard (unavailable)',
                      disabled: true,
                    },
                    { value: 'premium', label: 'Premium' },
                  ]}
                />

                <h4>Disabled Group</h4>

                <RadioGroup
                  label="Choose an option"
                  name="disabled-group"
                  options={[
                    { value: 'one', label: 'Option One' },
                    { value: 'two', label: 'Option Two' },
                    { value: 'three', label: 'Option Three' },
                  ]}
                  disabled
                />

                <h4>Required Group</h4>

                <RadioGroup
                  label="Select your experience level"
                  name="experience"
                  options={[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                  ]}
                  required
                />
              </>
            ),
          },
          {
            id: 'layout-description',
            label: 'Layout & Description',
            content: (
              <>
                <h4>With Description</h4>

                <RadioGroup
                  label="Notification frequency"
                  name="notifications"
                  description="Choose how often you would like to receive notifications."
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'never', label: 'Never' },
                  ]}
                />

                <h4>Horizontal Radio Group</h4>

                <RadioGroup
                  label="Choose a size"
                  name="horizontal-size"
                  orientation="horizontal"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                />
              </>
            ),
          },
        ]}
      />
    </section>
  );
}
