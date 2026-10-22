import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import TableExamples from './Table/examples/TableExamples';

export function TablePage() {
  return (
    <PageLayout
      title="Table"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Table</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible, semantic data table for displaying structured
        information. Supports sortable columns, basic and striped visual
        variants, custom cell rendering, alignment, horizontal scrolling, frozen
        columns, and empty states. It can also be combined with search and
        pagination to create more advanced data tables.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>Uses semantic HTML table structure with column headers.</li>
          <li>
            Supports an optional caption that can be displayed above the
            horizontally scrollable table or visually hidden while remaining
            available to assistive technology.
          </li>
          <li>Allows individual columns to be sortable.</li>
          <li>Provides basic and striped visual variants.</li>
          <li>Supports custom cell rendering and text alignment.</li>
          <li>Displays a configurable message when there are no records.</li>
          <li>
            Supports horizontal scrolling for wider tables, with keyboard access
            to the scrollable region when horizontal overflow exists.
          </li>
          <li>
            Supports frozen columns using <code>freezeColumns</code>. For
            example, <code>freezeColumns={1}</code> freezes the first column,
            while <code>freezeColumns={2}</code> freezes the first two columns.
            The optional <code>freezeColumnsSmallScreen</code> prop allows the
            number of frozen columns to be reduced on screens 375 pixels wide or
            narrower.
          </li>
          <li>
            Displays a subtle vertical separator beside the frozen columns when
            horizontal overflow exists and the table has been scrolled.
          </li>
          <li>
            Displays <code>null</code> and <code>undefined</code> as an em dash
            (—) with default cell rendering. Custom render functions should
            handle missing values when formatting them.
          </li>
          <li>
            Can be combined with search and the Pagination component to filter
            and navigate larger datasets.
          </li>
        </ul>

        <h3>Accessibility</h3>

        <ul>
          <li>Uses native HTML table elements.</li>
          <li>
            Uses <code>scope="col"</code> to associate column headers with their
            cells.
          </li>
          <li>
            Supports an optional semantic table caption, including a visually
            hidden caption for assistive technology.
          </li>
          <li>Uses native buttons for sortable column headings.</li>
          <li>
            Communicates the active sorting direction using{' '}
            <code>aria-sort</code>.
          </li>
          <li>
            Provides visible focus indicators for sorting controls and the
            scrollable table container when it is keyboard-focusable.
          </li>
          <li>
            Exposes the horizontally scrollable container as a named region when
            horizontal overflow exists.
          </li>
          <li>
            Frozen cells use opaque backgrounds so scrolling content does not
            show through them.
          </li>
          <li>
            Retains native table navigation rather than requiring custom
            spreadsheet-style keyboard interaction.
          </li>
          <li>
            Keeps missing values at the bottom when sorting in either direction.
          </li>
        </ul>

        <h3>Keyboard Support</h3>

        <ul>
          <li>
            Tab moves focus to sortable column headings and, when horizontal
            overflow exists, the scrollable table container.
          </li>
          <li>Shift + Tab moves focus to the previous focusable element.</li>
          <li>Enter or Space activates a sortable column heading.</li>
          <li>
            Activating the same sortable heading toggles between ascending and
            descending order.
          </li>
          <li>
            When a table overflows horizontally, keyboard users can focus its
            scrollable container and use the browser and operating system's
            supported scrolling controls.
          </li>
          <li>
            The examples use tabs to organize related demonstrations. The tab
            controls support keyboard navigation, including arrow keys, Home,
            and End.
          </li>
        </ul>

        <h3>Frozen Columns</h3>

        <p>
          Frozen columns keep important information visible while users scroll
          horizontally. Use <code>freezeColumns</code> to choose how many
          columns remain visible from the left. The default value is
          <code>0</code>, meaning no columns are frozen. On smaller screens, use
          <code>freezeColumnsSmallScreen</code> to reduce the number of frozen
          columns and preserve space for the remaining data. For example, a
          table can freeze two columns on larger screens and only the first
          column on screens 375 pixels wide or narrower. A subtle separator
          appears after horizontal scrolling begins, helping distinguish frozen
          columns from scrolling content.
        </p>

        <h3>Sorting Behaviour</h3>

        <p>
          By default, the Table sorts the data supplied to it. When used with
          pagination, sorting that data alone sorts only the supplied page of
          records. To sort an entire dataset before pagination, filter and sort
          the full dataset first, then select the records for the current page.
        </p>

        <p>
          The Advanced example demonstrates this combined approach by applying
          filtering and sorting before pagination. Missing values represented by{' '}
          <code>null</code> or <code>undefined</code> remain at the bottom in
          either sort direction.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the tabs below to see basic table styles, sorting, filtering,
          pagination, and advanced combinations of these features.
        </p>
      </div>

      <TableExamples />
    </PageLayout>
  );
}
