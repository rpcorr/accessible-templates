import { PageLayout } from '../../components/PageLayout/PageLayout';
import { PasswordInputExamples } from '../../components/FormControls/PasswordInput/Examples/PasswordInputExamples';

export function PasswordInputPage() {
  return (
    <PageLayout title="Password Input">
      <main className="stack">
        <p>
          An accessible password input that allows users to enter and edit
          passwords, with the option to show or hide the entered value. The
          Password Input uses the native HTML <code>&lt;input&gt;</code> element
          and supports controlled and uncontrolled values, descriptions, error
          messages, validation constraints, common form states, password
          requirements, and password strength estimation.
        </p>

        <p>
          <strong>Accessibility target:</strong> Designed and tested with WCAG
          2.2 Level AA accessibility requirements in mind.
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

        <h3>Password Requirements</h3>

        <p>
          An optional password requirements checklist allows developers to
          define custom password rules using validation functions. Each
          requirement displays whether it has been met.
        </p>

        <p>
          The checklist updates as the user enters a password. A screen-reader
          announcement communicates the overall progress and changes to
          individual requirements after the user pauses typing.
        </p>

        <h3>Password Strength</h3>

        <p>
          An optional password strength indicator estimates password strength
          using the zxcvbn password estimation library. It provides five
          strength levels: Very weak, Weak, Fair, Strong, and Very strong.
        </p>

        <p>
          The strength indicator includes a visual meter and a text label so
          that strength information is not communicated through colour alone. A
          screen-reader announcement communicates changes in the estimated
          strength after the user pauses typing.
        </p>

        <p>
          Password strength is an estimate rather than a guarantee of password
          security. Developers should choose appropriate password requirements
          for their application.
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
