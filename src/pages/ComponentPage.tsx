import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { SearchBox } from '../components/FormControls/SearchBox/SearchBox';
import styles from './ComponentPage.module.css';

type ComponentCategory =
  | 'Buttons & Actions'
  | 'Content & Feedback'
  | 'Data Display'
  | 'Form Controls'
  | 'Navigation'
  | 'Overlays & Menus';

type ComponentItem = {
  name: string;
  path: string;
  description: string;
};

type ComponentGroup = {
  category: ComponentCategory;
  description: string;
  components: ComponentItem[];
};

const componentGroups: ComponentGroup[] = [
  {
    category: 'Buttons & Actions',
    description:
      'Accessible components for triggering actions, submitting forms, and interacting with interface controls.',
    components: [
      {
        name: 'Button',
        path: '/buttons-actions/button',
        description:
          'An accessible button for triggering an action or submitting a form.',
      },
    ],
  },
  {
    category: 'Content & Feedback',
    description:
      'Accessible components for presenting information, communicating status, and providing feedback about user actions or system processes.',
    components: [
      {
        name: 'Accordion',
        path: '/content-feedback/accordion',
        description:
          'An expandable and collapsible section for showing and hiding related content.',
      },
      {
        name: 'Alert',
        path: '/content-feedback/alert',
        description:
          'A component for communicating important messages and feedback to users.',
      },
      {
        name: 'Badge',
        path: '/content-feedback/badge',
        description:
          'A compact label for identifying categories, statuses, and other contextual information.',
      },
      {
        name: 'Disclosure',
        path: '/content-feedback/disclosure',
        description:
          'An interactive control that allows users to show or hide related content.',
      },
      {
        name: 'Loading Spinner',
        path: '/content-feedback/loading-spinner',
        description:
          'A visual indicator that communicates that an operation is in progress.',
      },
      {
        name: 'Progress Indicator',
        path: '/content-feedback/progress-indicator',
        description:
          'A component for communicating the progress of an operation or task.',
      },
      {
        name: 'Status',
        path: '/content-feedback/status',
        description:
          'A component for communicating the current status of an item or process.',
      },
      {
        name: 'Tabs',
        path: '/content-feedback/tab',
        description:
          'An accessible component for organizing related content into selectable sections, with keyboard navigation, horizontal and vertical orientations, and responsive scrolling on smaller screens.',
      },
      {
        name: 'Toast',
        path: '/content-feedback/toast',
        description:
          "A temporary notification for communicating dynamic information or feedback without interrupting the user's current task.",
      },
    ],
  },
  {
    category: 'Data Display',
    description:
      'Accessible components for presenting structured information in a clear, organized, and usable format.',
    components: [
      {
        name: 'Area Chart',
        path: '/data-display/area-chart',
        description:
          'An accessible chart for displaying numerical values and emphasizing changes in magnitude over time or across categories using filled areas, with support for multiple overlapping data series, positive and negative values, optional grid lines, a series legend, and an accessible data table.',
      },
      {
        name: 'Bar Chart',
        path: '/data-display/bar-chart',
        description:
          'An accessible chart for comparing numerical values across categories, with vertical and horizontal orientations, single-series and grouped bar charts for comparing multiple datasets, category labels, numerical values, a series legend, optional grid lines and a numerical axis, and an accessible data table that supports both single and grouped datasets.',
      },
      {
        name: 'Donut Chart',
        path: '/data-display/donut-chart',
        description:
          'An accessible chart for displaying proportions across categories, with standard and exploded layouts, a hollow centre, and a visible legend showing category labels, numerical values, and percentages.',
      },
      {
        name: 'Line Chart',
        path: '/data-display/line-chart',
        description:
          'An accessible chart for displaying trends and changes in numerical values over time or across categories, with support for multiple data series, distinct line styles and markers, a series legend, axis labels, grid lines, and an accessible data table.',
      },
      {
        name: 'Pie Chart',
        path: '/data-display/pie-chart',
        description:
          'An accessible chart for displaying proportions across categories, with standard and exploded layouts, category labels, numerical values and percentages, an accessible legend, and a semantic data table.',
      },
      {
        name: 'Stacked Bar Chart',
        path: '/data-display/stacked-bar-chart',
        description:
          'An accessible chart for comparing category totals and individual contributions using stacked bar segments, with support for multiple datasets, positive and negative values, a series legend, optional grid lines, a numerical axis, and an accessible data table with category values and totals.',
      },
      {
        name: 'Card',
        path: '/data-display/card',
        description:
          'A flexible content container for presenting related information, with optional headers and footers, default and elevated variants, and support for custom content.',
      },
      {
        name: 'List',
        path: '/data-display/list',
        description:
          'An accessible component for presenting related items in ordered or unordered lists, with configurable list markers, custom styling, and support for rich content.',
      },
      {
        name: 'Statistic',
        path: '/data-display/statistic',
        description:
          'A component for presenting key numbers, measurements, and summary information, with optional descriptions and support for use in cards and dashboards.',
      },
      {
        name: 'Table',
        path: '/data-display/table',
        description:
          'An accessible data table for displaying structured information, with support for sorting, striped rows, horizontal scrolling, frozen columns, and empty states.',
      },
    ],
  },
  {
    category: 'Form Controls',
    description:
      'Accessible form controls for collecting, entering, selecting, and editing user input.',
    components: [
      {
        name: 'Checkbox',
        path: '/form-controls/checkbox',
        description:
          'A control that allows users to select or deselect one or more options.',
      },
      {
        name: 'Colour Picker',
        path: '/form-controls/colour-picker',
        description:
          'A control that allows users to select a colour using a native colour picker or enter a HEX colour value.',
      },
      {
        name: 'Combobox',
        path: '/form-controls/combobox',
        description:
          'An editable input that allows users to filter and select from a list of options.',
      },
      {
        name: 'Date Picker',
        path: '/form-controls/date-picker',
        description:
          'A control that allows users to enter or select a date from a calendar.',
      },
      {
        name: 'Date Range Picker',
        path: '/form-controls/date-range-picker',
        description:
          'A control that allows users to enter or select a start date and end date from a calendar.',
      },
      {
        name: 'File Upload',
        path: '/form-controls/file-upload',
        description: 'A control for selecting one or more files to upload.',
      },
      {
        name: 'Number Input',
        path: '/form-controls/number-input',
        description:
          'A single-line input for entering and editing numeric values.',
      },
      {
        name: 'Password Input',
        path: '/form-controls/password-input',
        description:
          'A password input that allows users to enter and edit passwords, with the option to show or hide the entered value.',
      },
      {
        name: 'Radio Group',
        path: '/form-controls/radio-group',
        description:
          'A group of mutually exclusive options where users can select one choice.',
      },
      {
        name: 'Search Box',
        path: '/form-controls/search-box',
        description:
          'A search input that allows users to enter and submit a search query.',
      },
      {
        name: 'Search Combobox',
        path: '/form-controls/search-combobox',
        description:
          'A search input that filters and presents matching suggestions for users to select.',
      },
      {
        name: 'Select',
        path: '/form-controls/select',
        description:
          'A control that allows users to choose an option from a list.',
      },
      {
        name: 'Signature Field',
        path: '/form-controls/signature-field',
        description:
          'A control that allows users to draw a signature using a mouse, finger, or stylus, or enter a typed signature as an alternative.',
      },
      {
        name: 'Slider',
        path: '/form-controls/slider',
        description:
          'A control that allows users to select a numeric value within a defined range.',
      },
      {
        name: 'Switch',
        path: '/form-controls/switch',
        description:
          'A control for toggling a setting between on and off states.',
      },
      {
        name: 'Text Input',
        path: '/form-controls/text-input',
        description: 'A single-line input for entering and editing text.',
      },
      {
        name: 'Textarea',
        path: '/form-controls/textarea',
        description: 'A multi-line input for entering and editing longer text.',
      },
      {
        name: 'Time Picker',
        path: '/form-controls/time-picker',
        description: 'A control that allows users to enter or select a time.',
      },
    ],
  },
  {
    category: 'Navigation',
    description:
      'Accessible components that help users understand their location, move between pages, and navigate interface content.',
    components: [
      {
        name: 'Breadcrumbs',
        path: '/navigations/breadcrumbs',
        description:
          "A navigational trail that communicates the user's location within a website or application.",
      },
      {
        name: 'Carousel',
        path: '/navigations/carousel',
        description:
          'A component for navigating between slides of content, images, or cards with accessible controls and screen-reader support.',
      },
      {
        name: 'Multi-Item Carousel',
        path: '/navigations/multi-item-carousel',
        description:
          'A carousel that displays multiple items at once, allowing users to browse collections of content or cards with accessible controls.',
      },
      {
        name: 'Navigation',
        path: '/navigations/navigation',
        description:
          'A component for providing links to pages or sections of an application.',
      },
      {
        name: 'Pagination',
        path: '/navigations/pagination',
        description:
          'A control for navigating between pages of related content.',
      },
      {
        name: 'Skip Link',
        path: '/navigations/skip-link',
        description:
          'Keyboard-accessible links that let users bypass repeated content and jump directly to the main content or another important page section.',
      },
      {
        name: 'Tree View',
        path: '/navigations/tree-view',
        description:
          'A hierarchical navigation component that allows users to explore expandable and collapsible parent and child items using keyboard navigation and optional single or multiple selection.',
      },
    ],
  },
  {
    category: 'Overlays & Menus',
    description:
      'Accessible components for displaying additional content, presenting actions, and managing temporary interface layers.',
    components: [
      {
        name: 'Context Menu',
        path: '/overlays-menus/context-menu',
        description:
          'A menu opened by right-click, the Context Menu key, or Shift+F10, with keyboard navigation and typeahead support.',
      },
      {
        name: 'Dropdown',
        path: '/overlays-menus/dropdown',
        description:
          'A menu component for presenting a list of actions or options.',
      },
      {
        name: 'Menu Button',
        path: '/overlays-menus/menu-button',
        description:
          'A button that opens a menu of actions with keyboard navigation and focus management.',
      },
      {
        name: 'Modal Dialog',
        path: '/overlays-menus/modal',
        description:
          'A dialog that temporarily interrupts the page to present information or request user interaction.',
      },
      {
        name: 'Popover',
        path: '/overlays-menus/popover',
        description:
          'A non-modal overlay for displaying contextual information, actions, and interactive content without trapping focus.',
      },
      {
        name: 'Tooltip',
        path: '/overlays-menus/tooltip',
        description:
          'A component for providing additional contextual information about an interface element.',
      },
    ],
  },
];

const categories = componentGroups.map((group) => group.category);

export function ComponentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<
    ComponentCategory[]
  >([]);
  const [showRightFade, setShowRightFade] = useState(false);
  const filterListRef = useRef<HTMLDivElement>(null);

  const filteredGroups = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return componentGroups
      .filter(
        (group) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(group.category),
      )
      .map((group) => ({
        ...group,
        components: group.components.filter((component) => {
          const searchableText =
            `${component.name} ${component.description}`.toLowerCase();

          return searchableText.includes(normalizedQuery);
        }),
      }))
      .filter((group) => group.components.length > 0);
  }, [searchQuery, selectedCategories]);

  const resultCount = filteredGroups.reduce(
    (total, group) => total + group.components.length,
    0,
  );

  useEffect(() => {
    const filterList = filterListRef.current;

    if (!filterList) {
      return;
    }

    function updateRightIndicator() {
      const hasOverflow = filterList!.scrollWidth > filterList!.clientWidth + 1;

      const hasMoreContent =
        filterList!.scrollLeft + filterList!.clientWidth <
        filterList!.scrollWidth - 1;

      setShowRightFade(hasOverflow && hasMoreContent);
    }

    filterList.addEventListener('scroll', updateRightIndicator, {
      passive: true,
    });

    window.addEventListener('resize', updateRightIndicator);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateRightIndicator)
        : null;

    resizeObserver?.observe(filterList);

    Array.from(filterList.children).forEach((child) => {
      resizeObserver?.observe(child);
    });

    updateRightIndicator();

    return () => {
      filterList.removeEventListener('scroll', updateRightIndicator);
      window.removeEventListener('resize', updateRightIndicator);
      resizeObserver?.disconnect();
    };
  }, []);

  function toggleCategory(category: ComponentCategory) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function clearFilters() {
    setSearchQuery('');
    setSelectedCategories([]);
  }

  return (
    <PageLayout title="Components" showCurrentBreadcrumb={false}>
      <main className="stack">
        <p className={styles.intro}>
          Explore the accessible UI components available in the Accessible
          Templates project.
        </p>

        <section aria-label="Search and filter components" className="stack">
          <SearchBox
            label="Search components"
            placeholder="Search by component name or description"
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <div className="stack">
            <h2 id="category-filter-heading">Filter by category</h2>

            <div
              className={`${styles.filterListContainer} ${
                showRightFade ? styles.showRightFade : ''
              }`}
            >
              <div
                className={styles.filters}
                ref={filterListRef}
                role="group"
                aria-labelledby="category-filter-heading"
              >
                <button
                  type="button"
                  aria-pressed={selectedCategories.length === 0}
                  onClick={() => setSelectedCategories([])}
                >
                  All
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selectedCategories.includes(category)}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.filterSummary}>
            <p aria-live="polite" aria-atomic="true">
              {resultCount === 1
                ? 'Showing 1 component'
                : `Showing ${resultCount} components`}
            </p>

            {(searchQuery || selectedCategories.length > 0) && (
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        </section>

        {filteredGroups.length > 0 ? (
          <div className={styles.grid}>
            {filteredGroups.map((group) => (
              <section
                key={group.category}
                className={styles.card}
                aria-labelledby={`${group.category
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')}-heading`}
              >
                <h3
                  id={`${group.category
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')}-heading`}
                >
                  {group.category}
                </h3>

                <p>{group.description}</p>

                <ul className={styles.componentList}>
                  {group.components.map((component) => (
                    <li key={component.path}>
                      <Link to={component.path}>{component.name}</Link>
                      <span>{component.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p role="status">
            No components found. Try a different search term or category.
          </p>
        )}
      </main>
    </PageLayout>
  );
}
