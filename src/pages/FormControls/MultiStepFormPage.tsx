import { PageLayout } from '../../components/PageLayout/PageLayout';
import { MultiStepFormExamples } from '../../components/FormControls/MultiStepForm/Examples/MultiStepFormExamples';

export function MultiStepFormPage() {
  return (
    <PageLayout title="Multi-Step Form">
      <p>
        An accessible multi-step form component that guides users through a
        sequence of related steps, with validation, progress indication, and
        navigation controls. Users can review their information before
        submitting the form.
      </p>

      <p>
        <strong>Accessibility target:</strong> Designed and tested with WCAG 2.2
        Level AA accessibility requirements in mind.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The MultiStepForm component uses a native <code>&lt;form&gt;</code>{' '}
          element and semantic headings to organize each step. The current step
          is identified in the progress indicator using{' '}
          <code>aria-current="step"</code>.
        </p>

        <p>
          Screen readers are informed of the current step and total number of
          steps through a polite live announcement. Each step heading receives
          keyboard focus when users navigate between steps.
        </p>

        <p>
          Form values are managed by the parent component, allowing information
          entered in earlier steps to be retained when users navigate between
          steps.
        </p>

        <h3>Validation</h3>

        <p>
          Each step can provide its own validation function. When validation
          fails, an error summary is displayed with links to the corresponding
          form fields. Focus moves to the error summary so users can identify
          and review the problems before proceeding.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Users can navigate between steps using the Back, Next, and Submit
          buttons. These controls support standard keyboard interaction,
          including <kbd>Tab</kbd>, <kbd>Enter</kbd>, and <kbd>Space</kbd>.
          Pressing <kbd>Enter</kbd> in an input field advances to the next step
          when applicable. Pressing <kbd>Enter</kbd> in a text area inserts a
          new line.
        </p>

        <h3>Focus Management</h3>

        <p>
          When users move between steps, keyboard focus moves to the new step
          heading. If validation fails, focus moves to the error summary.
          Following successful submission, focus moves to the completion
          message, which is announced by screen readers.
        </p>

        <h3>Submission</h3>

        <p>
          The component supports asynchronous form submission, a submitting
          state, error feedback when submission fails, and a customizable
          completion message when submission succeeds. The review step allows
          users to check their information before submitting the form.
        </p>
      </div>

      <MultiStepFormExamples />
    </PageLayout>
  );
}
