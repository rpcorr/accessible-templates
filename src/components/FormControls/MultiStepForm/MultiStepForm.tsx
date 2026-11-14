import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Button } from '../../ButtonsActions/Button/Button';
import styles from './MultiStepForm.module.css';

export type MultiStepFormErrors = Record<string, string>;

export interface MultiStepFormStep<TValues> {
  id: string;
  title: string;
  description?: string;
  content: (context: { errors: MultiStepFormErrors }) => ReactNode;
  validate?: (values: TValues) => MultiStepFormErrors;
}

export interface MultiStepFormProps<TValues> {
  steps: MultiStepFormStep<TValues>[];
  values: TValues;
  onSubmit: (values: TValues) => void | Promise<void>;
  completionMessage?: string;
  isSubmitting?: boolean;
  onStepChange?: (stepIndex: number) => void;
}

export function MultiStepForm<TValues>({
  steps,
  values,
  onSubmit,
  completionMessage = 'Your information has been submitted successfully.',
  isSubmitting = false,
  onStepChange,
}: MultiStepFormProps<TValues>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepErrors, setStepErrors] = useState<MultiStepFormErrors>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmittingInternally, setIsSubmittingInternally] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [stepAnnouncement, setStepAnnouncement] = useState('');

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);

  const headingId = useId();
  const descriptionId = useId();
  const errorHeadingId = useId();

  const formTitleId = useId();
  const formDescriptionId = useId();

  const currentStep = steps[currentStepIndex];

  //   useEffect(() => {
  //     headingRef.current?.focus();
  //   }, [currentStep?.id]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      requestAnimationFrame(() => {
        headingRef.current?.focus();
      });

      return;
    }

    headingRef.current?.focus();
  }, [currentStep?.id]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setStepAnnouncement(`Step ${currentStepIndex + 1} of ${steps.length}`);
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [currentStepIndex, steps.length]);

  useEffect(() => {
    if (isComplete) {
      completionRef.current?.focus();
    }
  }, [isComplete]);

  if (steps.length === 0) {
    return null;
  }

  if (!currentStep) {
    return null;
  }

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const submitting = isSubmitting || isSubmittingInternally;

  const validateCurrentStep = () => {
    const errors = currentStep.validate?.(values) ?? {};

    setStepErrors(errors);

    if (Object.keys(errors).length > 0) {
      requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });

      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setStepErrors({});

    setCurrentStepIndex((previous) => {
      const next = previous + 1;
      onStepChange?.(next);
      return next;
    });
  };

  const handleBack = () => {
    setStepErrors({});
    setSubmissionError('');

    setCurrentStepIndex((previous) => {
      const next = previous - 1;
      onStepChange?.(next);
      return next;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== 'Enter' || event.defaultPrevented || isLastStep) {
      return;
    }

    const target = event.target;

    // Allow buttons to handle Enter normally.
    if (target instanceof HTMLButtonElement) {
      return;
    }

    // Allow Enter to insert a newline in textareas.
    if (target instanceof HTMLTextAreaElement) {
      return;
    }

    // Advance when Enter is pressed in an input.
    if (target instanceof HTMLInputElement) {
      event.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
    if (!isLastStep || submitting) {
      return;
    }

    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmittingInternally(true);
    setSubmissionError('');

    try {
      await onSubmit(values);
      setIsComplete(true);
    } catch {
      setSubmissionError(
        'Something went wrong while submitting your information. Please try again.',
      );
    } finally {
      setIsSubmittingInternally(false);
    }
  };

  if (isComplete) {
    return (
      <div
        ref={completionRef}
        className={styles.completion}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
      >
        {completionMessage}
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => event.preventDefault()}
      onKeyDown={handleKeyDown}
      noValidate
      aria-labelledby={formTitleId}
      aria-describedby={formDescriptionId}
    >
      <h2 id={formTitleId} className={styles.visuallyHidden}>
        Multi-step form
      </h2>

      <p id={formDescriptionId} className={styles.visuallyHidden}>
        This form contains {steps.length} steps.
      </p>

      <div className={styles.progress}>
        <p className={styles.progressText}>
          Step {currentStepIndex + 1} of {steps.length}
        </p>

        <ol className={styles.progressList}>
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={
                index === currentStepIndex
                  ? styles.currentStep
                  : index < currentStepIndex
                    ? styles.completedStep
                    : styles.upcomingStep
              }
              aria-current={index === currentStepIndex ? 'step' : undefined}
            >
              <span>{step.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className={styles.visuallyHidden}
        aria-live="polite"
        aria-atomic="true"
      >
        {stepAnnouncement}
      </div>

      <div className={styles.stepContent}>
        <h2
          key={currentStep.id}
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className={styles.stepHeading}
        >
          {currentStep.title}
        </h2>

        {currentStep.description && (
          <p id={descriptionId} className={styles.stepDescription}>
            {currentStep.description}
          </p>
        )}

        {Object.keys(stepErrors).length > 0 && (
          <div
            ref={errorSummaryRef}
            className={styles.errorSummary}
            role="alert"
            tabIndex={-1}
            aria-labelledby={errorHeadingId}
          >
            <h3 id={errorHeadingId}>There is a problem</h3>

            <ul>
              {Object.entries(stepErrors).map(([fieldId, message]) => (
                <li key={fieldId}>
                  <a href={`#${fieldId}`}>{message}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.stepFields}>
          {currentStep.content({ errors: stepErrors })}
        </div>
      </div>

      {submissionError && (
        <p className={styles.submissionError} role="alert">
          {submissionError}
        </p>
      )}

      <div className={styles.navigation}>
        {!isFirstStep && (
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={submitting}
          >
            Back
          </Button>
        )}

        {isLastStep ? (
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        ) : (
          <Button type="button" onClick={handleNext} disabled={submitting}>
            Next
          </Button>
        )}
      </div>
    </form>
  );
}
