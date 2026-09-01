import { useState } from 'react';
import { Alert } from '../../components/Alert';

export const AlertExamples = () => {
  const [showDismissibleAlert, setShowDismissibleAlert] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCustomDismissAlert, setShowCustomDismissAlert] = useState(true);

  return (
    <section>
      <h4>Variants</h4>

      <Alert variant="info">This is an informational alert.</Alert>

      <Alert variant="success">
        Your changes have been saved successfully.
      </Alert>

      <Alert variant="warning">Your session will expire soon.</Alert>

      <Alert variant="error">
        There was a problem processing your request.
      </Alert>

      <h4>With Titles</h4>

      <Alert variant="info" title="Information">
        Your profile has been updated.
      </Alert>

      <Alert variant="success" title="Success">
        Your account has been created successfully.
      </Alert>

      <Alert variant="warning" title="Warning">
        You have unsaved changes.
      </Alert>

      <Alert variant="error" title="Error">
        We were unable to save your changes.
      </Alert>

      <h4>Dismissible</h4>

      {showDismissibleAlert ? (
        <Alert
          variant="info"
          title="Dismissible alert"
          dismissible
          onDismiss={() => setShowDismissibleAlert(false)}
        >
          This alert can be dismissed by the user.
        </Alert>
      ) : (
        <button type="button" onClick={() => setShowDismissibleAlert(true)}>
          Show alert again
        </button>
      )}

      <h4>Custom Dismiss Label</h4>

      {showCustomDismissAlert ? (
        <Alert
          variant="warning"
          title="Custom dismiss label"
          dismissible
          dismissLabel="Close notification"
          onDismiss={() => setShowCustomDismissAlert(false)}
        >
          This alert uses a custom accessible label for the dismiss button.
        </Alert>
      ) : (
        <button type="button" onClick={() => setShowCustomDismissAlert(true)}>
          Show alert again
        </button>
      )}

      <h4>Custom Heading Levels</h4>

      <Alert variant="info" title="Heading level 2" headingLevel="h2">
        This alert uses an h2 heading.
      </Alert>

      <Alert variant="success" title="Heading level 3" headingLevel="h3">
        This alert uses an h3 heading.
      </Alert>

      <Alert variant="warning" title="Heading level 4" headingLevel="h4">
        This alert uses an h4 heading.
      </Alert>

      <h4>Live Regions</h4>

      <div className="stack">
        <button
          type="button"
          onClick={() =>
            setSuccessMessage('Your changes have been saved successfully.')
          }
        >
          Save changes
        </button>

        <div role="status" aria-live="polite" aria-atomic="true">
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </div>

        {successMessage && (
          <button type="button" onClick={() => setSuccessMessage('')}>
            Reset success message
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            setErrorMessage('There was a problem saving your changes.')
          }
        >
          Trigger error
        </button>

        <div role="alert" aria-atomic="true">
          {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
        </div>

        {errorMessage && (
          <button type="button" onClick={() => setErrorMessage('')}>
            Reset error message
          </button>
        )}
      </div>
    </section>
  );
};

export default AlertExamples;
