import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { DateRangePickerExamples } from './examples/DateRangePickerExamples';

export function DateRangePickerPage() {
  return (
    <PageLayout
      title="Date Range Picker"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Date Range Picker</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible date range picker that allows users to enter or select a
          start date and an end date. It supports controlled and uncontrolled
          values, date constraints, range highlighting, and common form states.
          Keyboard navigation, screen-reader support, and validation feedback
          help users enter and correct dates.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Date Range Picker provides separately labelled start and end date
          inputs within a labelled group. Descriptions and validation messages
          can be associated with the relevant fields to help users understand
          the expected input and correct errors.
        </p>

        <p>
          The calendar uses grid semantics to identify weekday headers, rows,
          and individual dates. Accessible date labels communicate when a date
          is the start of a range, the end of a range, or falls within the
          selected range.
        </p>

        <p>
          Keyboard focus is managed when users open and close the calendar and
          navigate between months. When form validation fails, focus can move to
          the appropriate date input so users can address the problem directly.
        </p>

        <p>
          Selected dates, dates within the range, and the current date are
          visually distinguished. Visible focus indicators help keyboard users
          identify their current position within the control.
        </p>

        <h3>Date Entry and Selection</h3>

        <p>
          Users can enter dates directly using the <code>YYYY-MM-DD</code>{' '}
          format or open the calendar to select dates. The start and end dates
          work together to define the selected range.
        </p>

        <p>
          When dates are selected, the calendar highlights the range between
          them. Users can adjust either date to change the range. Selecting a
          new start date allows users to establish a new range.
        </p>

        <h3>States and Constraints</h3>

        <p>
          The Date Range Picker supports controlled and uncontrolled values,
          minimum and maximum dates, required fields, disabled and read-only
          states, descriptions, and validation error messages.
        </p>

        <p>
          Date constraints restrict calendar selection to the permitted range.
          Validation identifies invalid date entries and ensures that the end
          date does not precede the start date. Field-level errors are
          associated with their inputs, and validation feedback can be announced
          to screen-reader users.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Both date inputs can be reached and operated using the keyboard. The
          calendar toggle opens and closes the calendar. Pressing{' '}
          <kbd>Escape</kbd> closes the calendar and returns focus to the toggle.
        </p>

        <p>
          Within the calendar, arrow keys move between dates. Keyboard commands
          support navigation between months and years, and <kbd>Enter</kbd> or{' '}
          <kbd>Space</kbd> selects the focused date.
        </p>

        <p>
          When validation fails, focus can move to the first input that needs
          attention. This helps keyboard and screen-reader users locate and
          correct missing or invalid dates without having to navigate back
          through the form.
        </p>

        <h3>Examples</h3>

        <DateRangePickerExamples />
      </main>
    </PageLayout>
  );
}
