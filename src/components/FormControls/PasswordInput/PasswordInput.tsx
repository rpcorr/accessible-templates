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

export type RequirementDisplay = 'list' | 'message';

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
  requirementDisplay?: RequirementDisplay;
};

const strengthLabels = [
  'Very weak',
  'Weak',
  'Fair',
  'Strong',
  'Very strong',
] as const;

function getRequirementMessage(
  password: string,
  requirements?: PasswordRequirement[],
) {
  if (!requirements || requirements.length === 0) {
    return '';
  }

  if (!password) {
    const labels = requirements.map((requirement) =>
      requirement.label.toLowerCase(),
    );

    return `Password must meet all of the following requirements: ${labels.join(', ')}.`;
  }

  const unmetRequirement = requirements.find(
    (requirement) => !requirement.validate(password),
  );

  if (unmetRequirement) {
    return `Enter ${unmetRequirement.label.toLowerCase()}.`;
  }

  return 'Your password meets all requirements.';
}

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
      requirementDisplay = 'list',
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

    const lastAnnouncedRequirementMessage = useRef<string | null>(null);

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
      if (!requirements || requirements.length === 0) return;

      // Message mode tracks changes to the displayed instruction.
      if (requirementDisplay === 'message') {
        const currentMessage = getRequirementMessage(
          currentValue,
          requirements,
        );

        // Establish the initial message without announcing it.
        if (lastAnnouncedRequirementMessage.current === null) {
          lastAnnouncedRequirementMessage.current = currentMessage;
          return;
        }

        // Avoid repeating the same instruction.
        if (lastAnnouncedRequirementMessage.current === currentMessage) {
          return;
        }

        setRequirementsAnnouncement('');

        announcementTimer.current = setTimeout(() => {
          setRequirementsAnnouncement(currentMessage);
          lastAnnouncedRequirementMessage.current = currentMessage;
          announcementTimer.current = null;
        }, 800);

        return () => {
          if (announcementTimer.current !== null) {
            clearTimeout(announcementTimer.current);
            announcementTimer.current = null;
          }
        };
      }

      // List mode retains the existing progress announcements.
      const currentStatuses = new Map(
        requirements.map((requirement) => [
          requirement.id,
          requirement.validate(currentValue),
        ]),
      );

      if (lastAnnouncedRequirements.current === null) {
        lastAnnouncedRequirements.current = currentStatuses;
        return;
      }

      const changedRequirements = requirements.filter(
        (requirement) =>
          lastAnnouncedRequirements.current?.get(requirement.id) !==
          currentStatuses.get(requirement.id),
      );

      if (changedRequirements.length === 0) return;

      setRequirementsAnnouncement('');

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
    }, [currentValue, requirements, requirementDisplay]);

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
          {required && (
            <span aria-hidden="true" className={styles.required}>
              *
            </span>
          )}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <div
          className={styles.inputWrapper}
          onMouseLeave={(event: MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
              setIsVisible(false);
            }
          }}
        >
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
            {isVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9 7-.2 1.1-1 2.4-2.1 3.5" />
                <path d="M6.6 6.6C4.5 7.8 3.3 9.7 3 12c.5 2.5 4 7 9 7 1 0 2-.2 2.9-.6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
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

            {requirementDisplay === 'list' ? (
              <>
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
              </>
            ) : (
              <p className={styles.requirementsHeading}>
                {getRequirementMessage(currentValue, requirements)}
              </p>
            )}

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
