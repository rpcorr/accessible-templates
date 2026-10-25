import { useState } from 'react';
import styles from './SignatureExamples.module.css';
import {
  SignatureField,
  type SignatureValue,
} from '../../../components/FormControls/SignatureField';

export function SignatureExamples() {
  const [signature, setSignature] = useState<SignatureValue>(null);
  const [disabledSignature, setDisabledSignature] =
    useState<SignatureValue>(null);
  const [errorSignature, setErrorSignature] = useState<SignatureValue>(null);
  const [showError, setShowError] = useState(false);
  const [savedSignature, setSavedSignature] = useState<SignatureValue>(null);
  const [restoredSignature, setRestoredSignature] =
    useState<SignatureValue>(null);
  const [restoreStatus, setRestoreStatus] = useState('');

  const handleValidate = () => {
    setShowError(!errorSignature);
  };

  const handleSaveSignature = () => {
    if (signature?.type === 'drawn') {
      setSavedSignature(signature);
      setRestoredSignature(null);
    }

    setRestoreStatus('');
  };

  const handleRestoreSignature = () => {
    if (savedSignature) {
      setRestoredSignature({ ...savedSignature });
      setRestoreStatus('Saved signature restored.');
    }
  };

  const handleClearSavedSignature = () => {
    setSavedSignature(null);
    setRestoredSignature(null);

    setRestoreStatus('');
  };

  return (
    <div className={styles.examples}>
      <section className={styles.example} aria-labelledby="signature-basic">
        <h4 id="signature-basic">Basic Signature</h4>
        <p>This example demonstrates drawing and typing a signature.</p>

        <SignatureField
          label="Your signature"
          instructions="Draw your signature in the area provided, or choose Type signature below."
          value={signature}
          onChange={setSignature}
          required
        />

        <div className={styles.output} aria-live="polite">
          <strong>Current value:</strong>
          <p>Type: {signature?.type ?? 'None'}</p>
          <p>Status: {signature ? 'Signature provided' : 'Empty'}</p>
        </div>
      </section>

      <section className={styles.example} aria-labelledby="signature-restore">
        <h4 id="signature-restore">Restore Saved Signature</h4>

        <p>
          Draw a signature in the basic example above and select Save current
          signature. Then select Restore saved signature to load it into the
          field below.
        </p>

        <SignatureField
          label="Saved signature"
          instructions="The saved signature should appear here when restored."
          value={restoredSignature}
          onChange={setRestoredSignature}
        />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.button}
            onClick={handleSaveSignature}
            disabled={signature?.type !== 'drawn'}
          >
            Save current signature
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={handleRestoreSignature}
            disabled={!savedSignature}
          >
            Restore saved signature
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={handleClearSavedSignature}
            disabled={!savedSignature}
          >
            Clear saved signature
          </button>
        </div>

        <div className={styles.output} aria-live="polite">
          <strong>Saved signature status:</strong>
          <p>
            {restoreStatus ||
              (savedSignature
                ? 'A signature is saved.'
                : 'No signature saved.')}
          </p>
        </div>
      </section>

      <section className={styles.example} aria-labelledby="signature-error">
        <h4 id="signature-error">Validation Example</h4>
        <p>Try validating the field without providing a signature.</p>

        <SignatureField
          label="Required signature"
          instructions="A signature is required for this example."
          value={errorSignature}
          onChange={(nextValue) => {
            setErrorSignature(nextValue);
            if (nextValue) setShowError(false);
          }}
          required
          error={showError ? 'Please provide a signature.' : undefined}
        />

        <button
          type="button"
          className={styles.button}
          onClick={handleValidate}
        >
          Validate signature
        </button>
      </section>

      <section className={styles.example} aria-labelledby="signature-disabled">
        <h4 id="signature-disabled">Disabled Signature</h4>

        <SignatureField
          label="Disabled signature"
          value={disabledSignature}
          onChange={setDisabledSignature}
          disabled
        />
      </section>
    </div>
  );
}
