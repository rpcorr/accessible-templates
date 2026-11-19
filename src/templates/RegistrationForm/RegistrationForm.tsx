import { PageLayout } from '../../components/PageLayout/PageLayout';
import { RegistrationFormExample } from './RegistrationFormExamples';

export function RegistrationFormPage() {
  return (
    <PageLayout title="Registration Form">
      <p>
        An example registration form that combines accessible form controls to
        collect personal information, validate user input, and provide clear
        feedback. The form includes configurable fields, password requirements,
        account preferences, and accessible validation.
      </p>

      <p>
        <strong>Accessibility target:</strong> Designed and tested with WCAG 2.2
        Level AA accessibility requirements in mind.
      </p>

      <div className="stack">
        <h3>Components</h3>

        <p>
          Text Input, Password Input, Select, Checkbox, Radio Group, Alert and
          Button.
        </p>

        <h3>Data sources</h3>

        <p>
          Country and account type options are provided through a separate data
          file and imported into the registration form.
        </p>

        <h3>Demonstrates</h3>

        <ul>
          <li>
            Collecting personal information using different form controls.
          </li>
          <li>
            Configuring field visibility and required settings independently.
          </li>
          <li>Validating form input when the user submits the form.</li>
          <li>
            Creating a password with configurable requirements and a strength
            indicator.
          </li>
          <li>
            Confirming a password by comparing the password and confirmation
            fields.
          </li>
          <li>
            Providing an accessible error summary with links to invalid fields
            and moving focus to the summary after unsuccessful submission.
          </li>
          <li>Clearing field errors when users correct their input.</li>
          <li>Grouping related form fields using fieldsets and legends.</li>
          <li>
            Resetting the form after successful submission and announcing
            confirmation feedback to screen reader users.
          </li>
        </ul>
      </div>

      <h3>Example</h3>

      <RegistrationFormExample />
    </PageLayout>
  );
}
