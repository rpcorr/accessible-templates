import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { DatePickerExamples } from '../../examples';

export function DatePickerPage() {
  return (
    <PageLayout
      title="Date Picker"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Date Picker</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible date picker that allows users to enter a date directly
          or select a date from a calendar. It supports controlled and
          uncontrolled values, date constraints, and common form states.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Date Picker uses a visible <code>&lt;label&gt;</code> associated
          with the date input. The calendar button provides an accessible name
          and uses <code>aria-expanded</code> and <code>aria-controls</code> to
          identify the calendar.
        </p>

        <p>
          The calendar uses grid semantics to identify rows, weekday headers,
          and individual dates. Selected dates, today&apos;s date, and dates
          outside the allowed range are communicated through appropriate states
          and attributes.
        </p>

        <p>
          Optional descriptions and error messages are associated with the input
          using <code>aria-describedby</code>. Validation errors are announced
          using an assertive alert region.
        </p>

        <h3>Date Entry and Selection</h3>

        <p>
          Users can enter a date directly using the <code>YYYY-MM-DD</code>{' '}
          format or open the calendar to select a date. Selecting a date updates
          the input and closes the calendar.
        </p>

        <p>
          The calendar provides controls for moving between months. Dates
          outside the configured minimum and maximum range cannot be selected.
        </p>

        <h3>States and Constraints</h3>

        <p>
          The Date Picker supports default values, controlled values, minimum
          and maximum dates, required fields, disabled and read-only states,
          descriptions, and error messages.
        </p>

        <p>
          When a minimum or maximum date is provided, dates outside the allowed
          range are disabled in the calendar and cannot be selected.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The date input can be reached and operated using the keyboard. The
          calendar button can be used to open and close the calendar, and{' '}
          <kbd>Escape</kbd> closes the calendar and returns focus to the
          calendar button.
        </p>

        <p>
          Calendar date navigation supports moving between dates and weeks using
          the arrow keys. Additional keyboard commands provide navigation
          between weeks, months, and years, while <kbd>Enter</kbd> or{' '}
          <kbd>Space</kbd> selects the focused date.
        </p>

        <h3>Examples</h3>

        <DatePickerExamples />
      </main>
    </PageLayout>
  );
}
