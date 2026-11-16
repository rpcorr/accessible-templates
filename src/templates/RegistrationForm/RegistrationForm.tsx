import { PageLayout } from '../../components/PageLayout/PageLayout';
import RegistrationFormExample from './RegistrationFormExamples';

export function RegistrationFormPage() {
  return (
    <PageLayout title="Registration Form">
      <p>
        An example registration form that brings together accessible form
        controls to collect personal information, validate user input, and
        provide clear feedback.
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

        <h3>Demonstrates</h3>

        <ul>
          <li>
            Collecting personal information using different form controls.
          </li>
          <li>Identifying required fields and validating form input.</li>
          <li>
            Creating a password with configurable requirements and a strength
            indicator.
          </li>
          <li>
            Confirming a password by comparing the password and confirmation
            fields.
          </li>
          <li>
            Providing accessible error messages when passwords do not match and
            clear feedback when the form is submitted.
          </li>
          <li>Grouping related choices using radio buttons and checkboxes.</li>
          <li>Submitting a form and displaying confirmation feedback.</li>
        </ul>
      </div>

      <h3>Example</h3>

      <RegistrationFormExample />
    </PageLayout>
  );
}
