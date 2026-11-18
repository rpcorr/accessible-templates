import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import {
  getPasswordStrength,
  type PasswordStrengthScore,
} from './passwordStrength';
import styles from './PasswordInput.module.css';

export type PasswordRequirement = {
  id: string;
  label: string;
  validate: (password: string) => boolean;
};

type PasswordInputProps = {
  label: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  requirements?: PasswordRequirement[];
  showStrength?: boolean;
};

const strengthLabels = [
  'Very weak',
  'Weak',
  'Fair',
  'Strong',
  'Very strong',
] as const;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      id,
      name,
      value,
      defaultValue,
      onChange,
      placeholder,
      description,
      error,
      required = false,
      disabled = false,
      readOnly = false,
      maxLength,
      minLength,
      autoComplete = 'current-password',
      requirements,
      showStrength = false,
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const [isVisible, setIsVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const currentValue = value !== undefined ? value : internalValue;

    const [strengthScore, setStrengthScore] =
      useState<PasswordStrengthScore | null>(null);

    function getRequirementsDescription(password: string) {
      if (!requirements || requirements.length === 0) {
        return '';
      }

      const updates = requirements.map((requirement) => {
        const status = requirement.validate(password) ? 'Met' : 'Not met';

        return `${requirement.label}: ${status}.`;
      });

      return `There are ${requirements.length} password requirements. ${updates.join(' ')}`;
    }

    const [requirementsDescription, setRequirementsDescription] = useState(() =>
      getRequirementsDescription(currentValue),
    );

    const [requirementsAnnouncement, setRequirementsAnnouncement] =
      useState('');

    const lastAnnouncedRequirements = useRef<Map<string, boolean> | null>(null);

    const announcementTimer = useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

    const [strengthAnnouncement, setStrengthAnnouncement] = useState('');

    const lastAnnouncedStrength = useRef<PasswordStrengthScore | null>(null);

    const strengthAnnouncementTimer = useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

    const descriptionId = description ? `${inputId}-description` : undefined;

    const errorId = error ? `${inputId}-error` : undefined;

    const requirementsId =
      requirements && requirements.length > 0
        ? `${inputId}-requirements`
        : undefined;

    const requirementsInstructionId = requirementsId
      ? `${inputId}-requirements-instructions`
      : undefined;

    const describedBy =
      [descriptionId, requirementsInstructionId, errorId]
        .filter(Boolean)
        .join(' ') || undefined;

    useEffect(() => {
      if (!requirements || requirements.length === 0) {
        return;
      }

      const currentStatuses = new Map(
        requirements.map((requirement) => [
          requirement.id,
          requirement.validate(currentValue),
        ]),
      );

      // Establish the initial state without announcing anything.
      if (lastAnnouncedRequirements.current === null) {
        lastAnnouncedRequirements.current = currentStatuses;
        return;
      }

      // Find requirements whose status has changed.
      const changedRequirements = requirements.filter(
        (requirement) =>
          lastAnnouncedRequirements.current?.get(requirement.id) !==
          currentStatuses.get(requirement.id),
      );

      if (changedRequirements.length === 0) {
        return;
      }

      // Reset the previous announcement.
      setRequirementsAnnouncement('');

      // Wait until the user stops typing.
      announcementTimer.current = setTimeout(() => {
        const metCount = Array.from(currentStatuses.values()).filter(
          Boolean,
        ).length;

        const totalCount = requirements.length;

        const progressAnnouncement =
          metCount === totalCount
            ? `All ${totalCount} password requirements met.`
            : `${metCount} of ${totalCount} password requirements met.`;

        const updates = changedRequirements.map((requirement) => {
          const status = currentStatuses.get(requirement.id)
            ? 'met'
            : 'not met';

          return `${requirement.label}: ${status}`;
        });

        setRequirementsAnnouncement(
          `${progressAnnouncement} ${updates.join('. ')}.`,
        );

        lastAnnouncedRequirements.current = currentStatuses;
        announcementTimer.current = null;
      }, 800);

      return () => {
        if (announcementTimer.current !== null) {
          clearTimeout(announcementTimer.current);
          announcementTimer.current = null;
        }
      };
    }, [currentValue, requirements]);

    // Clean up the timer when the component unmounts.
    useEffect(() => {
      return () => {
        if (announcementTimer.current !== null) {
          clearTimeout(announcementTimer.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!showStrength) {
        setStrengthScore(null);
        return;
      }

      if (!currentValue) {
        setStrengthScore(null);
        return;
      }

      let isCurrent = true;

      getPasswordStrength(currentValue)
        .then((score) => {
          if (isCurrent) {
            setStrengthScore(score);
          }
        })
        .catch(() => {
          if (isCurrent) {
            setStrengthScore(null);
          }
        });

      return () => {
        isCurrent = false;
      };
    }, [currentValue, showStrength]);

    useEffect(() => {
      if (!showStrength || strengthScore === null) {
        lastAnnouncedStrength.current = null;
        setStrengthAnnouncement('');
        return;
      }

      if (lastAnnouncedStrength.current === null) {
        lastAnnouncedStrength.current = strengthScore;
        return;
      }

      if (lastAnnouncedStrength.current === strengthScore) {
        return;
      }

      if (strengthAnnouncementTimer.current !== null) {
        clearTimeout(strengthAnnouncementTimer.current);
      }

      setStrengthAnnouncement('');

      strengthAnnouncementTimer.current = setTimeout(() => {
        setStrengthAnnouncement(
          `Password strength: ${strengthLabels[strengthScore]}.`,
        );

        lastAnnouncedStrength.current = strengthScore;
        strengthAnnouncementTimer.current = null;
      }, 800);

      return () => {
        if (strengthAnnouncementTimer.current !== null) {
          clearTimeout(strengthAnnouncementTimer.current);
          strengthAnnouncementTimer.current = null;
        }
      };
    }, [strengthScore, showStrength]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value;

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    }

    function handleToggleMouseDown(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
    }

    const strengthLabel =
      strengthScore !== null ? strengthLabels[strengthScore] : '';

    return (
      <div className={styles.container}>
        <label
          htmlFor={inputId}
          className={error ? styles.labelError : undefined}
        >
          {label}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={isVisible ? 'text' : 'password'}
            className={styles.input}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            onChange={handleChange}
            onBlur={() => {
              setRequirementsDescription(
                getRequirementsDescription(currentValue),
              );
            }}
          />

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setIsVisible((previous) => !previous)}
            onMouseDown={handleToggleMouseDown}
            disabled={disabled}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        {requirements && requirements.length > 0 && (
          <div className={styles.requirements}>
            {/* Screen-reader description of all requirements and their statuses */}
            <p
              id={requirementsInstructionId}
              className={styles.requirementsDescription}
            >
              {requirementsDescription}
            </p>

            {/* Visible checklist */}
            <p id={requirementsId} className={styles.requirementsHeading}>
              Password requirements ({requirements.length} total):
            </p>

            <ul aria-labelledby={requirementsId}>
              {requirements.map((requirement) => {
                const isMet = requirement.validate(currentValue);

                return (
                  <li
                    key={requirement.id}
                    className={
                      isMet ? styles.requirementMet : styles.requirement
                    }
                  >
                    <span aria-hidden="true">{isMet ? '✓' : '○'}</span>

                    <span>{requirement.label}</span>

                    <span className={styles.requirementStatus}>
                      {isMet ? 'Met' : 'Not met'}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p
              className={styles.requirementsAnnouncement}
              aria-live="polite"
              aria-atomic="true"
            >
              {requirementsAnnouncement}
            </p>
          </div>
        )}

        {showStrength && currentValue && strengthScore !== null && (
          <div className={styles.strength}>
            <p className={styles.strengthLabel}>
              Password strength: <strong>{strengthLabel}</strong>
            </p>

            <div
              className={styles.strengthMeter}
              role="meter"
              aria-label="Password strength"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={strengthScore}
              aria-valuetext={strengthLabel}
            >
              <span
                className={styles.strengthMeterFill}
                data-strength={strengthScore}
              />
            </div>
          </div>
        )}

        {showStrength && (
          <p className={styles.strengthAnnouncement} role="status">
            {strengthAnnouncement}
          </p>
        )}

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
