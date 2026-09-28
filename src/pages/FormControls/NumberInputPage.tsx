import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { NumberInputExamples } from '../../examples';

export function NumberInputPage() {
  return (
    <PageLayout
      title="Number Input"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Number Input</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible number input component that allows users to enter and
          edit numeric values using the keyboard or the browser's built-in
          number controls.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Number Input uses a native{' '}
          <code>&lt;input type="number"&gt;</code> element, providing built-in
          support for numeric input, validation, and browser accessibility
          features.
        </p>

        <p>
          The input is associated with its visible label using a{' '}
          <code>&lt;label&gt;</code> element. An optional description and error
          message are associated with the input using{' '}
          <code>aria-describedby</code>.
        </p>

        <p>
          When an error is provided, the input uses{' '}
          <code>aria-invalid="true"</code> to communicate its invalid state to
          assistive technologies. The error message also uses{' '}
          <code>role="alert"</code> so dynamically displayed errors can be
          announced by screen readers.
        </p>

        <h3>Validation</h3>

        <p>
          The Number Input supports the native <code>min</code>,{' '}
          <code>max</code>, and <code>step</code> attributes to define valid
          numeric values and increments.
        </p>

        <p>
          These attributes are handled by the browser's native form validation.
          Users can enter values outside the configured range, but the browser
          prevents form submission when the value does not satisfy the
          applicable constraints.
        </p>

        <p>
          Custom error messages can be provided through the <code>error</code>{' '}
          prop. The consuming application determines when the error is displayed
          and what message is communicated to the user.
        </p>

        <h3>States</h3>

        <p>
          The Number Input supports default and controlled values, required
          fields, descriptions, custom error messages, disabled inputs,
          read-only inputs, minimum and maximum constraints, and custom step
          increments.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Users can enter a number using the keyboard. When supported by the
          browser, <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> can be used to
          increase or decrease the value according to the configured{' '}
          <code>step</code>.
        </p>

        <p>
          <kbd>Tab</kbd> moves focus to and from the input. The native number
          input behavior is preserved so users can interact with the control
          using their preferred input method.
        </p>

        <h3>Examples</h3>

        <NumberInputExamples />
      </main>
    </PageLayout>
  );
}
