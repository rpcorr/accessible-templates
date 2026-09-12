import { useState } from 'react';
import { Select } from '../../components/FormControls/Select';
import { Tabs } from '../../components/Tab';

export function SelectExamples() {
  const [selectedCountry, setSelectedCountry] = useState('canada');

  return (
    <section>
      <Tabs
        tabs={[
          {
            id: 'basic-selection',
            label: 'Basic & Selection',
            content: (
              <>
                <h4>Basic Select</h4>
                <Select
                  label="Choose a country"
                  name="country"
                  options={[
                    { value: 'canada', label: 'Canada' },
                    { value: 'usa', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                  ]}
                />

                <h4>With Placeholder</h4>
                <Select
                  label="Choose a department"
                  name="department"
                  placeholder="Select a department"
                  options={[
                    { value: 'sales', label: 'Sales' },
                    { value: 'support', label: 'Support' },
                    { value: 'development', label: 'Development' },
                  ]}
                />

                <h4>With Default Selection</h4>
                <Select
                  label="Choose a language"
                  name="language"
                  defaultValue="typescript"
                  options={[
                    { value: 'javascript', label: 'JavaScript' },
                    { value: 'typescript', label: 'TypeScript' },
                    { value: 'python', label: 'Python' },
                  ]}
                />

                <h4>Controlled Select</h4>
                <Select
                  label="Choose a country"
                  name="controlled-country"
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  options={[
                    { value: 'canada', label: 'Canada' },
                    { value: 'usa', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                  ]}
                />

                <p>Selected country: {selectedCountry}</p>
              </>
            ),
          },
          {
            id: 'states',
            label: 'States',
            content: (
              <>
                <h4>Disabled Option</h4>
                <Select
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

                <h4>Disabled Select</h4>
                <Select
                  label="Choose an option"
                  name="disabled-select"
                  defaultValue="option-one"
                  disabled
                  options={[
                    { value: 'option-one', label: 'Option One' },
                    { value: 'option-two', label: 'Option Two' },
                    { value: 'option-three', label: 'Option Three' },
                  ]}
                />

                <h4>Required Select</h4>
                <Select
                  label="Select your experience level"
                  name="experience"
                  placeholder="Choose your experience level"
                  required
                  options={[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                  ]}
                />

                <h4>With Error Message</h4>
                <Select
                  label="Choose a payment method"
                  name="payment"
                  error="Please select a payment method."
                  options={[
                    { value: 'credit-card', label: 'Credit card' },
                    { value: 'paypal', label: 'PayPal' },
                    { value: 'bank-transfer', label: 'Bank transfer' },
                  ]}
                />
              </>
            ),
          },
          {
            id: 'description',
            label: 'Description',
            content: (
              <>
                <h4>With Description</h4>
                <Select
                  label="Notification frequency"
                  name="notifications"
                  description="Choose how often you would like to receive notifications."
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'never', label: 'Never' },
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
