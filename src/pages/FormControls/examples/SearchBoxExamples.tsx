import { useState } from 'react';
import { Tabs } from '../../../components/ContentFeedback/Tab';
import { SearchBox } from '../../../components/FormControls/SearchBox';

export function SearchBoxExamples() {
  const [basicSearchResult, setBasicSearchResult] = useState('');
  const [roundedSearchResult, setRoundedSearchResult] = useState('');
  const [iconSearchResult, setIconSearchResult] = useState('');
  const [roundedIconSearchResult, setRoundedIconSearchResult] = useState('');
  const [descriptionSearchResult, setDescriptionSearchResult] = useState('');
  const [errorSearchResult, setErrorSearchResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [controlledValue, setControlledValue] = useState('');
  const [controlledSearchResult, setControlledSearchResult] = useState('');
  const [expandSearchResult, setExpandSearchResult] = useState('');
  const [iconInsideSearchResult, setIconInsideSearchResult] = useState('');
  const [roundedIconInsideSearchResult, setRoundedIconInsideSearchResult] =
    useState('');
  const [iconInsideExpandSearchResult, setIconInsideExpandSearchResult] =
    useState('');

  function handleErrorSearch(value: string) {
    if (!value.trim()) {
      setErrorMessage('Please enter a search term.');
      setErrorSearchResult('');
      return;
    }

    setErrorMessage('');
    setErrorSearchResult(value);
  }

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <section>
                <h4>Basic Search</h4>

                <SearchBox
                  label="Search"
                  name="basic-search"
                  placeholder="Enter a search term"
                  onSearch={setBasicSearchResult}
                />

                <p aria-live="polite">
                  {basicSearchResult
                    ? `Search submitted for: ${basicSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Rounded Search</h4>

                <SearchBox
                  label="Rounded search"
                  name="rounded-search"
                  placeholder="Search"
                  rounded
                  onSearch={setRoundedSearchResult}
                />

                <p aria-live="polite">
                  {roundedSearchResult
                    ? `Search submitted for: ${roundedSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>
            </div>
          ),
        },
        {
          id: 'icons',
          label: 'Icons',
          content: (
            <div className="stack">
              <section>
                <h4>Search with Icon</h4>

                <SearchBox
                  label="Search"
                  name="icon-search"
                  placeholder="Search"
                  showIcon
                  onSearch={setIconSearchResult}
                />

                <p aria-live="polite">
                  {iconSearchResult
                    ? `Search submitted for: ${iconSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Rounded Search with Icon</h4>

                <SearchBox
                  label="Rounded search"
                  name="rounded-icon-search"
                  placeholder="Search"
                  rounded
                  showIcon
                  onSearch={setRoundedIconSearchResult}
                />

                <p aria-live="polite">
                  {roundedIconSearchResult
                    ? `Search submitted for: ${roundedIconSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Search with Icon Inside</h4>

                <SearchBox
                  label="Search"
                  name="icon-inside-search"
                  placeholder="Search"
                  iconInside
                  onSearch={setIconInsideSearchResult}
                />

                <p aria-live="polite">
                  {iconInsideSearchResult
                    ? `Search submitted for: ${iconInsideSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Rounded Search with Icon Inside</h4>

                <SearchBox
                  label="Rounded search"
                  name="rounded-icon-inside-search"
                  placeholder="Search"
                  rounded
                  iconInside
                  onSearch={setRoundedIconInsideSearchResult}
                />

                <p aria-live="polite">
                  {roundedIconInsideSearchResult
                    ? `Search submitted for: ${roundedIconInsideSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>
            </div>
          ),
        },
        {
          id: 'states',
          label: 'States',
          content: (
            <div className="stack">
              <section>
                <h4>With Description</h4>

                <SearchBox
                  label="Search articles"
                  name="article-search"
                  placeholder="Search articles"
                  description="Enter a keyword or phrase to find relevant articles."
                  onSearch={setDescriptionSearchResult}
                />

                <p aria-live="polite">
                  {descriptionSearchResult
                    ? `Search submitted for: ${descriptionSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>With Error</h4>

                <SearchBox
                  label="Search"
                  name="error-search"
                  placeholder="Search"
                  error={errorMessage}
                  onSearch={handleErrorSearch}
                />

                <p aria-live="polite">
                  {errorSearchResult
                    ? `Search submitted for: ${errorSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Controlled</h4>

                <SearchBox
                  label="Controlled search"
                  name="controlled-search"
                  value={controlledValue}
                  placeholder="Type to update the value"
                  onChange={setControlledValue}
                  onSearch={setControlledSearchResult}
                />

                <p>
                  Current value:{' '}
                  <strong>{controlledValue || 'No search term entered'}</strong>
                </p>

                <p aria-live="polite">
                  {controlledSearchResult
                    ? `Search submitted for: ${controlledSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Disabled and Read Only</h4>

                <div className="stack">
                  <SearchBox
                    label="Disabled search"
                    name="disabled-search"
                    placeholder="Search is unavailable"
                    disabled
                  />

                  <SearchBox
                    label="Previous search"
                    name="readonly-search"
                    value="Accessibility"
                    readOnly
                  />
                </div>
              </section>
            </div>
          ),
        },
        {
          id: 'advanced',
          label: 'Advanced',
          content: (
            <div className="stack">
              <section>
                <h4>Expand on Focus</h4>

                <SearchBox
                  label="Search"
                  name="expand-search"
                  placeholder="Search"
                  expandOnFocus
                  showIcon
                  onSearch={setExpandSearchResult}
                />

                <p aria-live="polite">
                  {expandSearchResult
                    ? `Search submitted for: ${expandSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>

              <section>
                <h4>Icon Inside and Expand on Focus</h4>

                <SearchBox
                  label="Search"
                  name="icon-inside-expand-search"
                  placeholder="Search"
                  iconInside
                  expandOnFocus
                  onSearch={setIconInsideExpandSearchResult}
                />

                <p aria-live="polite">
                  {iconInsideExpandSearchResult
                    ? `Search submitted for: ${iconInsideExpandSearchResult}`
                    : 'No search submitted yet.'}
                </p>
              </section>
            </div>
          ),
        },
      ]}
    />
  );
}
