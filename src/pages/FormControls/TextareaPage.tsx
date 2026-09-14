import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { TextareaExamples } from '../../examples';

export function TextareaPage() {
  return (
    <PageLayout
      title="Textarea"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Textarea</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible multi-line text input that allows users to enter and
          edit longer amounts of text. The Textarea uses the native HTML
          <code> &lt;textarea&gt;</code> element and supports descriptions,
          error messages, validation constraints, and common form states.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Textarea uses a native <code>&lt;textarea&gt;</code> element,
          which provides appropriate semantics and accessibility information to
          assistive technologies.
        </p>

        <p>
          The textarea is associated with its visible label using a native{' '}
          <code>&lt;label&gt;</code> element. An optional description and error
          message are associated with the textarea using{' '}
          <code>aria-describedby</code>.
        </p>

        <p>
          When an error is provided, the textarea uses <code>aria-invalid</code>{' '}
          to communicate its invalid state to assistive technologies.
        </p>

        <h3>States</h3>

        <p>
          The Textarea supports required, disabled, and read-only states. It
          also supports controlled and uncontrolled values.
        </p>

        <h3>Validation</h3>

        <p>
          The Textarea supports native <code>minLength</code> and{' '}
          <code>maxLength</code> constraints and can display an accessible error
          message when validation fails.
        </p>

        <h3>Rows</h3>

        <p>
          The Textarea supports a configurable number of visible rows and allows
          users to resize the textarea vertically.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The Textarea uses the native HTML textarea element for keyboard
          interaction. Users can move focus to and from the textarea using{' '}
          <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd>.
        </p>

        <h3>Examples</h3>

        <TextareaExamples />
      </main>
    </PageLayout>
  );
}
