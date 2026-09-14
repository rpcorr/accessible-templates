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
          An accessible number input component that allows users to enter
          numeric values using the keyboard or the browser's built-in number
          controls.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Number Input uses a native{' '}
          <code>&lt;input type="number"&gt;</code>
          element, providing built-in support for numeric input and browser
          accessibility features.
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
          assistive technologies.
        </p>

        <h3>Validation</h3>

        <p>
          The Number Input supports the native <code>min</code>,{' '}
          <code>max</code>, and <code>step</code> attributes to define valid
          numeric values and increments.
        </p>

        <h3>States</h3>

        <p>
          The Number Input supports default values and controlled values,
          required fields, descriptions, error messages, disabled inputs, and
          read-only inputs.
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
