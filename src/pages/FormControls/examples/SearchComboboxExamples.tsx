import { useState } from 'react';
import { SearchCombobox } from '../../../components/FormControls/SearchCombox/SearchCombobox';

const cities = [
  { value: 'toronto', label: 'Toronto' },
  { value: 'ottawa', label: 'Ottawa' },
  { value: 'montreal', label: 'Montreal' },
  { value: 'vancouver', label: 'Vancouver' },
  { value: 'calgary', label: 'Calgary' },
  { value: 'edmonton', label: 'Edmonton' },
  { value: 'winnipeg', label: 'Winnipeg' },
  { value: 'halifax', label: 'Halifax' },
];

export function SearchComboboxExamples() {
  const [basicValue, setBasicValue] = useState('');
  const [filteredValue, setFilteredValue] = useState('');
  const [noResultsValue, setNoResultsValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [showError, setShowError] = useState(false);

  function handleValidate() {
    setShowError(!errorValue);
  }

  return (
    <div>
      <section>
        <h4>Basic Search</h4>

        <p>
          Enter a city name and use the arrow keys to navigate the suggestions.
          Press Enter to select a result.
        </p>

        <SearchCombobox
          label="Search cities"
          options={cities}
          value={basicValue}
          onChange={setBasicValue}
          placeholder="Search cities"
          description="Start typing to see matching cities."
        />
      </section>
      <section>
        <h4>Search with Filtering</h4>

        <p>
          Results are filtered as you type. Try entering part of a city name.
        </p>

        <SearchCombobox
          label="Find a Canadian city"
          options={cities}
          value={filteredValue}
          onChange={setFilteredValue}
          placeholder="Type a city"
        />
      </section>
      <section>
        <h4>No Results</h4>

        <p>
          Enter a value that does not match any available result to see the
          no-results state.
        </p>

        <SearchCombobox
          label="Search cities"
          options={cities}
          value={noResultsValue}
          onChange={setNoResultsValue}
          placeholder="Try something like London"
          description="For example, try entering 'London' to see the no-results message."
        />
      </section>
      <section>
        <h4>Required and Error</h4>

        <p>
          Leave the field empty and select Validate to see the associated error
          message.
        </p>

        <SearchCombobox
          label="Choose a city"
          options={cities}
          value={errorValue}
          onChange={(value) => {
            setErrorValue(value);
            setShowError(false);
          }}
          placeholder="Select a city"
          required
          error={showError ? 'Please select a city.' : undefined}
        />

        <button type="button" onClick={handleValidate}>
          Validate
        </button>
      </section>
    </div>
  );
}
