import { useState } from 'react';
import { Combobox } from '../../components/FormControls/Combobox';
import { Tabs } from '../../components/Tab';

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

export function ComboboxExamples() {
  const [selectedCountry, setSelectedCountry] = useState('Canada');

  return (
    <Tabs
      tabs={[
        {
          id: 'basic-filtering',
          label: 'Basic & Filtering',
          content: (
            <div className="stack">
              <div>
                <h4>Basic Combobox</h4>

                <Combobox
                  label="Choose a country"
                  name="country"
                  placeholder="Start typing..."
                  options={countryOptions}
                />
              </div>

              <div>
                <h4>Type to Filter</h4>

                <Combobox
                  label="Find a country"
                  placeholder="Type a country name"
                  options={countryOptions}
                />
              </div>

              <div>
                <h4>Default Value</h4>

                <Combobox
                  label="Country"
                  defaultValue="Canada"
                  options={countryOptions}
                />
              </div>

              <div>
                <h4>Controlled Combobox</h4>

                <Combobox
                  label="Select a country"
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  options={countryOptions}
                />

                <p>Selected country: {selectedCountry || 'None'}</p>
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
                />
              </div>

              <div>
                <h4>Disabled Combobox</h4>

                <Combobox
                  label="Choose a country"
                  defaultValue="Canada"
                  disabled
                  options={countryOptions}
                />
              </div>

              <div>
                <h4>No Results</h4>

                <Combobox
                  label="Find a country"
                  placeholder="Type something like XYZ"
                  options={countryOptions}
                />
              </div>

              <div>
                <h4>Required</h4>

                <Combobox
                  label="Choose a country"
                  required
                  placeholder="Select a country"
                  options={countryOptions}
                />
              </div>
            </div>
          ),
        },
        {
          id: 'description',
          label: 'Description',
          content: (
            <div className="stack">
              <div>
                <h4>With Description</h4>

                <Combobox
                  label="Choose a country"
                  description="Type part of a country name to filter the available options."
                  placeholder="Start typing..."
                  options={countryOptions}
                />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
