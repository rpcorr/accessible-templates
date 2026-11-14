import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useState } from 'react';
import { MultiStepForm } from './MultiStepForm';
import type { MultiStepFormStep, MultiStepFormErrors } from './MultiStepForm';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

interface TestValues {
  name: string;
}

const createSteps = (): MultiStepFormStep<TestValues>[] => [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Enter your name.',

    content: ({ errors }) => (
      <div>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" />
        {errors.name && <p>{errors.name}</p>}
      </div>
    ),

    validate: (values): MultiStepFormErrors => {
      const errors: MultiStepFormErrors = {};

      if (!values.name.trim()) {
        errors.name = 'Enter your full name.';
      }

      return errors;
    },
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Review your preferences.',

    content: () => <p>Preferences content</p>,
  },
  {
    id: 'review',
    title: 'Review and Submit',

    content: () => <p>Review your information.</p>,
  },
];

const validValues: TestValues = {
  name: 'Ronan Corr',
};

const renderForm = (
  overrides: Partial<{
    values: TestValues;
    onSubmit: (values: TestValues) => void | Promise<void>;
    onStepChange: (stepIndex: number) => void;
    completionMessage: string;
  }> = {},
) => {
  const props = {
    steps: createSteps(),
    values: validValues,
    onSubmit: vi.fn(),
    ...overrides,
  };

  return {
    ...render(<MultiStepForm {...props} />),
    props,
  };
};

describe('MultiStepForm', () => {
  describe('Rendering', () => {
    it('renders the initial step', () => {
      renderForm();

      expect(
        screen.getByRole('heading', { name: 'Personal Information' }),
      ).toBeInTheDocument();

      expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    });

    it('displays the current step number and total steps', () => {
      renderForm();

      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });

    it('marks the current step in the progress indicator', () => {
      renderForm();

      const currentStep = screen.getByRole('listitem', {
        current: 'step',
      });

      expect(currentStep).toHaveTextContent('Personal Information');
    });

    it('renders the Next button on the first step', () => {
      renderForm();

      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();

      expect(
        screen.queryByRole('button', { name: 'Back' }),
      ).not.toBeInTheDocument();
    });

    it('renders nothing when no steps are provided', () => {
      const { container } = render(
        <MultiStepForm steps={[]} values={validValues} onSubmit={vi.fn()} />,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('moves to the next step when validation succeeds', () => {
      renderForm();

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(
        screen.getByRole('heading', { name: 'Preferences' }),
      ).toBeInTheDocument();

      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    });

    it('moves to the previous step when Back is clicked', () => {
      renderForm();

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));

      expect(
        screen.getByRole('heading', { name: 'Personal Information' }),
      ).toBeInTheDocument();

      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });

    it('calls onStepChange when navigating between steps', () => {
      const onStepChange = vi.fn();

      renderForm({ onStepChange });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(onStepChange).toHaveBeenCalledWith(1);

      fireEvent.click(screen.getByRole('button', { name: 'Back' }));

      expect(onStepChange).toHaveBeenCalledWith(0);
    });

    it('preserves parent-managed values when navigating backwards', () => {
      function TestHarness() {
        const [values, setValues] = useState<TestValues>({
          name: '',
        });

        const steps: MultiStepFormStep<TestValues>[] = [
          {
            id: 'personal',
            title: 'Personal Information',

            content: () => (
              <>
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  value={values.name}
                  onChange={(event) => setValues({ name: event.target.value })}
                />
              </>
            ),

            validate: (formValues): MultiStepFormErrors => {
              if (!formValues.name.trim()) {
                return { name: 'Enter your full name.' };
              }

              return {};
            },
          },
          {
            id: 'review',
            title: 'Review',

            content: () => <p>Saved name: {values.name}</p>,
          },
        ];

        return (
          <MultiStepForm steps={steps} values={values} onSubmit={vi.fn()} />
        );
      }

      render(<TestHarness />);

      fireEvent.change(screen.getByLabelText('Full name'), {
        target: { value: 'Ronan Corr' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(screen.getByText('Saved name: Ronan Corr')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Back' }));

      expect(screen.getByLabelText('Full name')).toHaveValue('Ronan Corr');
    });
  });

  describe('Validation', () => {
    it('prevents navigation when validation fails', () => {
      renderForm({
        values: { name: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(
        screen.getByRole('heading', { name: 'Personal Information' }),
      ).toBeInTheDocument();

      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });

    it('displays the validation error summary', () => {
      renderForm({
        values: { name: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(screen.getByRole('alert')).toBeInTheDocument();

      expect(screen.getByText('There is a problem')).toBeInTheDocument();

      expect(
        screen.getByRole('link', { name: 'Enter your full name.' }),
      ).toHaveAttribute('href', '#name');
    });

    it('moves focus to the error summary when validation fails', async () => {
      renderForm({
        values: { name: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      const errorSummary = screen.getByRole('alert');

      await waitFor(() => {
        expect(errorSummary).toHaveFocus();
      });
    });

    it('clears validation errors after correcting the value and navigating', () => {
      function TestHarness() {
        const [values, setValues] = useState<TestValues>({
          name: '',
        });

        const steps: MultiStepFormStep<TestValues>[] = [
          {
            id: 'personal',
            title: 'Personal Information',

            content: ({ errors }) => (
              <>
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  value={values.name}
                  onChange={(event) => setValues({ name: event.target.value })}
                />
                {errors.name && <p>{errors.name}</p>}
              </>
            ),

            validate: (formValues): MultiStepFormErrors => {
              if (!formValues.name.trim()) {
                return { name: 'Enter your full name.' };
              }

              return {};
            },
          },
          {
            id: 'preferences',
            title: 'Preferences',
            content: () => <p>Preferences content</p>,
          },
        ];

        return (
          <MultiStepForm steps={steps} values={values} onSubmit={vi.fn()} />
        );
      }

      render(<TestHarness />);

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(screen.getByRole('alert')).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Full name'), {
        target: { value: 'Ronan Corr' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(
        screen.getByRole('heading', { name: 'Preferences' }),
      ).toBeInTheDocument();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Focus management', () => {
    it('moves focus to the new step heading after navigation', async () => {
      renderForm();

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      const heading = screen.getByRole('heading', {
        name: 'Preferences',
      });

      await waitFor(() => {
        expect(heading).toHaveFocus();
      });
    });

    it('moves focus to the previous step heading when going back', async () => {
      renderForm();

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));

      const heading = screen.getByRole('heading', {
        name: 'Personal Information',
      });

      await waitFor(() => {
        expect(heading).toHaveFocus();
      });
    });
  });

  describe('Submission', () => {
    it('submits the form when the final step is reached', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined);

      renderForm({ onSubmit });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(
        screen.getByRole('heading', { name: 'Review and Submit' }),
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(validValues);
      });
    });

    it('displays the completion message after successful submission', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined);

      renderForm({ onSubmit });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByRole('status')).toHaveTextContent(
        'Your information has been submitted successfully.',
      );
    });

    it('displays a custom completion message', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined);

      renderForm({
        onSubmit,
        completionMessage: 'Registration complete!',
      });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByRole('status')).toHaveTextContent(
        'Registration complete!',
      );
    });

    it('displays an error when submission fails', async () => {
      const onSubmit = vi
        .fn()
        .mockRejectedValue(new Error('Submission failed'));

      renderForm({ onSubmit });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Something went wrong while submitting your information.',
      );
    });

    it('disables navigation while submitting', async () => {
      let resolveSubmission!: () => void;

      const onSubmit = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveSubmission = resolve;
          }),
      );

      renderForm({ onSubmit });

      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(
        screen.getByRole('button', { name: 'Submitting...' }),
      ).toBeDisabled();

      await act(async () => {
        resolveSubmission();
      });

      expect(await screen.findByRole('status')).toBeInTheDocument();
    });
  });

  describe('External submission state', () => {
    it('disables navigation when isSubmitting is true', () => {
      render(
        <MultiStepForm
          steps={createSteps()}
          values={validValues}
          onSubmit={vi.fn()}
          isSubmitting
        />,
      );

      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });
  });
});
