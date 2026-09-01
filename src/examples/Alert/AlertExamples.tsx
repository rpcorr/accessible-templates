import { Alert } from '../../components/Alert';

export const AlertExamples = () => {
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

      <Alert
        variant="info"
        title="Dismissible alert"
        dismissible
        onDismiss={() => alert('Alert dismissed')}
      >
        This alert can be dismissed by the user.
      </Alert>
    </section>
  );
};

export default AlertExamples;
