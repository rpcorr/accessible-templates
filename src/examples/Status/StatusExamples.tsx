import { useRef, useState } from 'react';
import { Status } from '../../components/Status';

export const StatusExamples = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [deferredMessage, setDeferredMessage] = useState('');

  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const formButtonRef = useRef<HTMLButtonElement>(null);
  const loadingButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const updateButtonRef = useRef<HTMLButtonElement>(null);
  const deferredButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section>
      <h4>Basic</h4>

      <Status>Changes saved successfully.</Status>

      <h4>Dynamic Status</h4>

      <div className="stack">
        <button
          ref={statusButtonRef}
          type="button"
          onClick={() => setStatusMessage('Your changes have been saved.')}
        >
          Save changes
        </button>

        <Status>{statusMessage}</Status>

        {statusMessage && (
          <button
            type="button"
            onClick={() => {
              setStatusMessage('');
              statusButtonRef.current?.focus();
            }}
          >
            Reset status
          </button>
        )}
      </div>

      <h4>Form Submission</h4>

      <div className="stack">
        <button
          ref={formButtonRef}
          type="button"
          onClick={() =>
            setFormMessage('Your form has been submitted successfully.')
          }
        >
          Submit form
        </button>

        <Status>{formMessage}</Status>

        {formMessage && (
          <button
            type="button"
            onClick={() => {
              setFormMessage('');
              formButtonRef.current?.focus();
            }}
          >
            Reset status
          </button>
        )}
      </div>

      <h4>Loading and Processing</h4>

      <div className="stack">
        <button
          ref={loadingButtonRef}
          type="button"
          onClick={() => {
            setLoadingMessage('Loading results...');

            window.setTimeout(() => {
              setLoadingMessage('12 results loaded.');
            }, 2000);
          }}
        >
          Load results
        </button>

        <Status>{loadingMessage}</Status>

        {loadingMessage && (
          <button
            type="button"
            onClick={() => {
              setLoadingMessage('');
              loadingButtonRef.current?.focus();
            }}
          >
            Reset status
          </button>
        )}
      </div>

      <h4>Copy to Clipboard</h4>

      <div className="stack">
        <button
          ref={copyButtonRef}
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                'https://example.com/accessibility',
              );
              setCopyMessage('Link copied to clipboard.');
            } catch {
              setCopyMessage('Unable to copy the link.');
            }
          }}
        >
          Copy link
        </button>

        <Status>{copyMessage}</Status>

        {copyMessage && (
          <button
            type="button"
            onClick={() => {
              setCopyMessage('');
              copyButtonRef.current?.focus();
            }}
          >
            Reset status
          </button>
        )}
      </div>

      <h4>Multiple Updates</h4>

      <div className="stack">
        <button
          ref={updateButtonRef}
          type="button"
          onClick={() => {
            setUpdateMessage('Saving changes...');

            window.setTimeout(() => {
              setUpdateMessage('Changes saved successfully.');
            }, 2000);

            window.setTimeout(() => {
              setUpdateMessage('All changes are up to date.');
            }, 4000);
          }}
        >
          Save and update status
        </button>

        <Status>{updateMessage}</Status>

        {updateMessage && (
          <button
            type="button"
            onClick={() => {
              setUpdateMessage('');
              updateButtonRef.current?.focus();
            }}
          >
            Reset status
          </button>
        )}
      </div>

      <h4>Polite Updates May Be Deferred</h4>

      <div className="stack">
        <p>
          Polite status messages are announced without interrupting the user's
          current task. Depending on the screen reader's current activity, an
          update may be delayed or may not be announced.
        </p>

        <button
          ref={deferredButtonRef}
          type="button"
          onClick={() =>
            setDeferredMessage('Your preferences have been updated.')
          }
        >
          Update preferences
        </button>

        <Status>{deferredMessage}</Status>

        {deferredMessage && (
          <button
            type="button"
            onClick={() => {
              setDeferredMessage('');
              deferredButtonRef.current?.focus();
            }}
          >
            Reset status
          </button>
        )}
      </div>
    </section>
  );
};

export default StatusExamples;
