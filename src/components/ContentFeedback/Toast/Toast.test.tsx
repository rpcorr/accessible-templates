import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Toast } from './Toast';
import type { ToastItem } from './ToastContext';

const createToast = (overrides: Partial<ToastItem> = {}): ToastItem => ({
  id: 'toast-1',
  type: 'info',
  title: 'Test notification',
  duration: 0,
  ...overrides,
});

describe('Toast', () => {
  it('renders the toast title', () => {
    const toast = createToast();

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('renders the toast message when provided', () => {
    const toast = createToast({
      message: 'Your changes have been saved.',
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(
      screen.getByText('Your changes have been saved.'),
    ).toBeInTheDocument();
  });

  it('does not render a message when one is not provided', () => {
    const toast = createToast();

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(
      screen.queryByText('Your changes have been saved.'),
    ).not.toBeInTheDocument();
  });

  it('uses status role for informational notifications', () => {
    const toast = createToast({
      type: 'info',
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses status role for success notifications', () => {
    const toast = createToast({
      type: 'success',
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses status role for warning notifications', () => {
    const toast = createToast({
      type: 'warning',
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses alert role for error notifications', () => {
    const toast = createToast({
      type: 'error',
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders a dismiss button with an accessible name', () => {
    const toast = createToast();

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: 'Dismiss notification',
      }),
    ).toBeInTheDocument();
  });

  it('calls onDismiss when the dismiss button is activated', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const toast = createToast();

    render(<Toast toast={toast} onDismiss={onDismiss} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Dismiss notification',
      }),
    );

    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('can dismiss the toast using the keyboard', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const toast = createToast();

    render(<Toast toast={toast} onDismiss={onDismiss} />);

    const dismissButton = screen.getByRole('button', {
      name: 'Dismiss notification',
    });

    await user.tab();

    expect(dismissButton).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('renders an action button when an action is provided', () => {
    const toast = createToast({
      action: {
        label: 'Undo',
        onClick: vi.fn(),
      },
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: 'Undo',
      }),
    ).toBeInTheDocument();
  });

  it('calls the action callback when the action is activated', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    const toast = createToast({
      action: {
        label: 'Undo',
        onClick: onAction,
      },
    });

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    await user.click(
      screen.getByRole('button', {
        name: 'Undo',
      }),
    );

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render an action button when no action is provided', () => {
    const toast = createToast();

    render(<Toast toast={toast} onDismiss={vi.fn()} />);

    expect(
      screen.queryByRole('button', {
        name: 'Undo',
      }),
    ).not.toBeInTheDocument();
  });
});

describe('Toast auto-dismiss', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('automatically dismisses after the configured duration', () => {
    const onDismiss = vi.fn();

    const toast = createToast({
      duration: 5000,
    });

    render(<Toast toast={toast} onDismiss={onDismiss} />);

    expect(onDismiss).not.toHaveBeenCalled();

    vi.advanceTimersByTime(4999);

    expect(onDismiss).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('does not automatically dismiss when duration is 0', () => {
    const onDismiss = vi.fn();

    const toast = createToast({
      duration: 0,
    });

    render(<Toast toast={toast} onDismiss={onDismiss} />);

    vi.advanceTimersByTime(10000);

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('does not automatically dismiss when duration is negative', () => {
    const onDismiss = vi.fn();

    const toast = createToast({
      duration: -1,
    });

    render(<Toast toast={toast} onDismiss={onDismiss} />);

    vi.advanceTimersByTime(10000);

    expect(onDismiss).not.toHaveBeenCalled();
  });
});
