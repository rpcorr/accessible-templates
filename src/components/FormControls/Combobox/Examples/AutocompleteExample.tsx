import { useState } from 'react';
import { Combobox } from '..';
import { Tabs } from '../../../ContentFeedback/Tab';

const countryOptions = [
  { value: 'Canada', label: 'Canada' },
  { value: 'United States', label: 'United States' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Australia', label: 'Australia' },
];

export function AutocompleteExamples() {
  const [selectedCountry, setSelectedCountry] = useState('Canada');

  return (
    <Tabs
      tabs={[
        {
          id: 'inline-completion',
          label: 'Inline Completion',
          content: (
            <div className="stack">
              <div>
                <h4>Basic Autocomplete</h4>

                <Combobox
                  label="Choose a country"
                  placeholder="Start typing..."
                  options={countryOptions}
                  inlineCompletion
                />
              </div>

              <div>
                <h4>Controlled Autocomplete</h4>

                <Combobox
                  label="Select a country"
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  options={countryOptions}
                  inlineCompletion
                />

                <p>Selected country: {selectedCountry || 'None'}</p>
              </div>

              <div>
                <h4>Autocomplete with Description</h4>

                <Combobox
                  label="Find a country"
                  description="Start typing a country name. The remaining text will be suggested automatically."
                  placeholder="Type a country name"
                  options={countryOptions}
                  inlineCompletion
                />
              </div>
            </div>
          ),
        },
        {
          id: 'options',
          label: 'Options & States',
          content: (
            <div className="stack">
              <div>
                <h4>Disabled Option</h4>

                <Combobox
                  label="Choose a country"
                  options={[
                    { value: 'Canada', label: 'Canada' },
                    {
                      value: 'United States',
                      label: 'United States',
                      disabled: true,
                    },
                    { value: 'Mexico', label: 'Mexico' },
                    { value: 'Ireland', label: 'Ireland' },
                  ]}
                  inlineCompletion
                />
              </div>

              <div>
                <h4>Disabled Autocomplete</h4>

                <Combobox
                  label="Choose a country"
                  defaultValue="Canada"
                  disabled
                  options={countryOptions}
                  inlineCompletion
                />
              </div>

              <div>
                <h4>No Matching Suggestions</h4>

                <Combobox
                  label="Find a country"
                  placeholder="Try typing XYZ"
                  options={countryOptions}
                  inlineCompletion
                />
              </div>

              <div>
                <h4>Required Autocomplete</h4>

                <Combobox
                  label="Choose a country"
                  required
                  placeholder="Select a country"
                  options={countryOptions}
                  inlineCompletion
                />
              </div>
            </div>
          ),
        },
        {
          id: 'comparison',
          label: 'Combobox Comparison',
          content: (
            <div className="stack">
              <div>
                <h4>Standard Combobox</h4>

                <Combobox
                  label="Choose a country"
                  placeholder="Start typing..."
                  options={countryOptions}
                />

                <p>
                  Filters the available options as you type. Select an option
                  from the suggestion list.
                </p>
              </div>

              <div>
                <h4>Inline Autocomplete</h4>

                <Combobox
                  label="Choose a country"
                  placeholder="Start typing..."
                  options={countryOptions}
                  inlineCompletion
                />

                <p>
                  Suggests the remainder of the first matching option directly
                  in the input. Press ArrowRight to accept the completion.
                </p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
