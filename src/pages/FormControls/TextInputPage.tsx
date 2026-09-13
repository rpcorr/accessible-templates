import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { TextInputExamples } from '../../examples';

export function TextInputPage() {
  return (
    <PageLayout
      title="Text Input"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/form-controls">Form Controls</BreadcrumbItem>
          <BreadcrumbItem current>Text Input</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible text input that allows users to enter and edit text. The
          Text Input uses the native HTML <code>&lt;input&gt;</code> element and
          supports multiple input types, controlled and uncontrolled values,
          descriptions, error messages, validation constraints, and common form
          states.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Text Input uses a native <code>&lt;input&gt;</code> element, which
          provides the appropriate semantics and accessibility information to
          assistive technologies.
        </p>

        <p>
          The input is associated with its visible label using a native{' '}
          <code>&lt;label&gt;</code> element. An optional description and error
          message are associated with the input using{' '}
          <code>aria-describedby</code>.
        </p>

        <p>
          When an error is provided, the input uses <code>aria-invalid</code> to
          communicate its invalid state to assistive technologies.
        </p>

        <h3>Input Types</h3>

        <p>
          The Text Input supports <code>text</code>, <code>email</code>,{' '}
          <code>password</code>, <code>tel</code>, and <code>url</code> input
          types.
        </p>

        <h3>States</h3>

        <p>
          The Text Input supports required, disabled, and read-only states. It
          also supports controlled and uncontrolled values.
        </p>

        <h3>Validation</h3>

        <p>
          The Text Input supports native <code>minLength</code> and{' '}
          <code>maxLength</code> constraints and can display an accessible error
          message when validation fails.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The Text Input uses the native HTML input element for keyboard
          interaction. Users can move focus to and from the input using{' '}
          <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd>.
        </p>

        <h3>Examples</h3>

        <TextInputExamples />
      </main>
    </PageLayout>
  );
}
