import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PasswordInputExamples } from '../../components/FormControls/PasswordInput/Examples/PasswordInputExamples';

export function PasswordInputPage() {
  return (
    <PageLayout
      title="Password Input"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Password Input</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible password input that allows users to enter and edit
          passwords, with the option to show or hide the entered value. The
          Password Input uses the native HTML <code>&lt;input&gt;</code> element
          and supports controlled and uncontrolled values, descriptions, error
          messages, validation constraints, and common form states.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Password Input uses a native <code>&lt;input&gt;</code> element
          and a native <code>&lt;button&gt;</code> element to provide
          appropriate semantics and accessibility information to assistive
          technologies.
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

        <p>
          The Show/Hide button provides an accessible name that changes
          depending on the password visibility state. Its{' '}
          <code>aria-pressed</code> attribute communicates whether the password
          is currently visible.
        </p>

        <h3>Password Visibility</h3>

        <p>
          The Password Input allows users to toggle between a masked password
          and visible text using the Show/Hide button. Changing visibility
          preserves the entered password value.
        </p>

        <h3>States</h3>

        <p>
          The Password Input supports required, disabled, and read-only states.
          It also supports controlled and uncontrolled values.
        </p>

        <h3>Validation</h3>

        <p>
          The Password Input supports native <code>minLength</code> and{' '}
          <code>maxLength</code> constraints and can display an accessible error
          message when validation fails.
        </p>

        <h3>Autocomplete</h3>

        <p>
          The Password Input supports the <code>current-password</code> and{' '}
          <code>new-password</code> autocomplete values to help browsers and
          password managers identify the purpose of the field.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Users can move focus to and from the input and Show/Hide button using{' '}
          <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd>. The visibility button
          supports native keyboard activation using <kbd>Enter</kbd> and{' '}
          <kbd>Space</kbd>.
        </p>

        <h3>Examples</h3>

        <PasswordInputExamples />
      </main>
    </PageLayout>
  );
}
