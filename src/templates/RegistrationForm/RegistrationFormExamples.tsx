import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

import styles from './RegistrationFormExamples.module.css';
import { Alert } from '../../components/ContentFeedback/Alert';
import { Button } from '../../components/ButtonsActions/Button';
import { Checkbox } from '../../components/FormControls/Checkbox';
import { PasswordInput } from '../../components/FormControls/PasswordInput';
import { Select } from '../../components/FormControls/Select';
import { TextInput } from '../../components/FormControls/TextInput';
import { Textarea } from '../../components/FormControls/Textarea';

import {
  passwordRequirements,
  validateRegistrationForm,
  type RegistrationField,
  type RegistrationFormConfig,
  type RegistrationFormErrors,
  type RegistrationFormValues,
} from './registrationFormValidation';

import { basicRegistrationConfig } from '../../data/registrationFormConfigs';

type RegistrationFormExampleProps = {
  config?: RegistrationFormConfig;
};

function createInitialFormValues(
  fields: RegistrationField[],
): RegistrationFormValues {
  return Object.fromEntries(
    fields.map((field) => [field.name, field.type === 'checkbox' ? false : '']),
  );
}

type FieldRendererProps = {
  field: RegistrationField;
  idPrefix: string;
  value: string | boolean | undefined;
  error: string | undefined;
  onChange: (name: string, value: string | boolean) => void;
};

function FieldRenderer({
  field,
  idPrefix,
  value,
  error,
  onChange,
}: FieldRendererProps) {
  const id = `${idPrefix}-${field.id}`;

  switch (field.type) {
    case 'select':
      return (
        <Select
          id={id}
          name={field.name}
          label={field.label}
          options={field.options ?? []}
          value={typeof value === 'string' ? value : ''}
          onChange={(newValue) => onChange(field.name, newValue)}
          placeholder={
            field.placeholder ?? `Select ${field.label.toLowerCase()}`
          }
          required={field.required}
          error={error}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          id={id}
          name={field.name}
          label={field.label}
          checked={value === true}
          onChange={(event) => onChange(field.name, event.target.checked)}
          required={field.required}
          error={error}
        />
      );

    case 'password':
      return (
        <PasswordInput
          id={id}
          name={field.name}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          onChange={(newValue) => onChange(field.name, newValue)}
          autoComplete={field.autoComplete}
          required={field.required}
          error={error}
          requirements={field.passwordRequirements ?? passwordRequirements}
          showStrength
        />
      );

    case 'textarea':
      return (
        <Textarea
          id={id}
          name={field.name}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          onChange={(newValue) => onChange(field.name, newValue)}
          placeholder={field.placeholder}
          rows={field.rows}
          maxLength={field.maxLength}
          required={field.required}
          error={error}
        />
      );

    default:
      return (
        <TextInput
          id={id}
          name={field.name}
          label={field.label}
          type={field.type}
          value={typeof value === 'string' ? value : ''}
          onChange={(newValue) => onChange(field.name, newValue)}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          required={field.required}
          error={error}
        />
      );
  }
}

type RegistrationFieldGroup = {
  group?: string;
  fields: RegistrationField[];
};

function groupRegistrationFields(
  fields: RegistrationField[],
): RegistrationFieldGroup[] {
  const groups: RegistrationFieldGroup[] = [];

  fields.forEach((field) => {
    const existingGroup = groups.find((group) => group.group === field.group);

    if (existingGroup) {
      existingGroup.fields.push(field);
    } else {
      groups.push({
        group: field.group,
        fields: [field],
      });
    }
  });

  return groups;
}

export function RegistrationFormExample({
  config = basicRegistrationConfig,
}: RegistrationFormExampleProps) {
  const idPrefix = useId().replace(/:/g, '');

  const [submitted, setSubmitted] = useState(false);

  const [formValues, setFormValues] = useState<RegistrationFormValues>(() =>
    createInitialFormValues(config.fields),
  );

  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const shouldFocusErrorSummaryRef = useRef(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldFocusErrorSummaryRef.current && Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus({ preventScroll: true });

      errorSummaryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      shouldFocusErrorSummaryRef.current = false;
    }
  }, [errors]);

  const updateField = (name: string, value: string | boolean) => {
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => {
      const fieldsToClear = config.fields
        .filter((field) => field.name === name || field.matches === name)
        .map((field) => field.name);

      if (!fieldsToClear.some((fieldName) => previous[fieldName])) {
        return previous;
      }

      const updatedErrors = { ...previous };

      fieldsToClear.forEach((fieldName) => {
        delete updatedErrors[fieldName];
      });

      return updatedErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = validateRegistrationForm(formValues, config);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      shouldFocusErrorSummaryRef.current = true;
      return;
    }

    setErrors({});
    shouldFocusErrorSummaryRef.current = false;

    // Clear the form fields.
    setFormValues(createInitialFormValues(config.fields));

    // Display the success message and hide the form.
    setSubmitted(true);
  };

  return (
    <section className={styles.container}>
      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted && (
          <Alert variant="success" title="Registration successful">
            Your registration form has been submitted successfully.
          </Alert>
        )}
      </div>

      {!submitted && (
        <>
          {Object.keys(errors).length > 0 && (
            <div
              id={`${idPrefix}-error-summary`}
              ref={errorSummaryRef}
              className={styles.errorSummary}
              role="alert"
              tabIndex={-1}
              aria-labelledby={`${idPrefix}-error-summary-title`}
            >
              <h3 id={`${idPrefix}-error-summary-title`}>
                There is a problem submitting the form
              </h3>

              <p>Please correct the following errors:</p>

              <ul>
                {Object.entries(errors).map(([fieldName, message]) => {
                  const fieldConfig = config.fields.find(
                    (field) => field.name === fieldName,
                  );

                  const fieldId = fieldConfig?.id ?? fieldName;

                  return (
                    <li key={fieldName}>
                      <a href={`#${idPrefix}-${fieldId}`}>{message}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <form
            className={styles.form}
            aria-labelledby={`${idPrefix}-registration-form-title`}
            noValidate
            onSubmit={handleSubmit}
          >
            <header className={styles.header}>
              <h2 id={`${idPrefix}-registration-form-title`}>
                Create an account
              </h2>
              <p>Complete the form below to register.</p>
            </header>

            {groupRegistrationFields(config.fields).map((group, index) => {
              const renderedFields = group.fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  idPrefix={idPrefix}
                  value={formValues[field.name]}
                  error={errors[field.name]}
                  onChange={updateField}
                />
              ));

              if (!group.group) {
                return <div key={`ungrouped-${index}`}>{renderedFields}</div>;
              }

              return (
                <fieldset key={group.group}>
                  <legend>{group.group}</legend>
                  {renderedFields}
                </fieldset>
              );
            })}
            <Button type="submit">Create account</Button>
          </form>
        </>
      )}
    </section>
  );
}

export default RegistrationFormExample;
