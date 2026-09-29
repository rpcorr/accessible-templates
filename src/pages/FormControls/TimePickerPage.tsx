import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { TimePickerExamples } from './examples/TimePickerExamples';

export function TimePickerPage() {
  return (
    <PageLayout
      title="Time Picker"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Time Picker</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible time picker that allows users to enter a time directly
          or select a time using the browser&apos;s built-in time controls. It
          supports controlled and uncontrolled values, time constraints, and
          common form states.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Time Picker uses a native <code>&lt;input type="time"&gt;</code>{' '}
          element with a visible <code>&lt;label&gt;</code> associated with the
          input. This provides built-in time input semantics and browser
          accessibility support.
        </p>

        <p>
          Optional descriptions and error messages are associated with the input
          using <code>aria-describedby</code>. When an error is provided, the
          input uses <code>aria-invalid="true"</code>, and the error message is
          announced using an alert region.
        </p>

        <h3>Time Entry and Selection</h3>

        <p>
          Users can enter a time directly using the native time input or use the
          browser&apos;s built-in time controls to select a time. The native
          control provides separate controls for the time segments, such as
          hours and minutes.
        </p>

        <p>
          The available time controls and their appearance can vary between
          browsers and operating systems. The Time Picker preserves the native
          browser behavior rather than replacing it with a custom time selection
          interface.
        </p>

        <h3>States and Constraints</h3>

        <p>
          The Time Picker supports default values, controlled values, minimum
          and maximum times, step increments, required fields, disabled and
          read-only states, descriptions, and error messages.
        </p>

        <p>
          The <code>min</code>, <code>max</code>, and <code>step</code>{' '}
          attributes use the browser&apos;s native validation. Values outside
          the configured range or step interval are considered invalid during
          form validation.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The time input can be reached and operated using the keyboard. The
          native browser time control provides keyboard interaction for
          navigating between time segments and changing their values.
        </p>

        <p>
          <kbd>Tab</kbd> moves focus to and from the Time Picker. The native
          time input behavior is preserved so users can interact with the
          control using their preferred input method.
        </p>

        <h3>Examples</h3>

        <TimePickerExamples />
      </main>
    </PageLayout>
  );
}
