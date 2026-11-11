import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { CountdownTimer } from './CountdownTimer';

describe('CountdownTimer', () => {
  const now = new Date('2026-11-10T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('renders days, hours, minutes, and seconds', () => {
    render(<CountdownTimer targetDate="2026-11-11T14:30:45Z" />);

    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('displays the supplied label', () => {
    render(
      <CountdownTimer
        targetDate="2026-11-10T12:01:00Z"
        label="Event starts in"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Event starts in' }),
    ).toBeInTheDocument();
  });

  it('updates the countdown every second', () => {
    render(<CountdownTimer targetDate="2026-11-10T12:00:05Z" />);

    expect(screen.getByText('05')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('displays the completion message when the countdown ends', () => {
    render(
      <CountdownTimer
        targetDate="2026-11-10T12:00:02Z"
        completionMessage="The event has started!"
      />,
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(
      screen.getByText('The event has started!', { selector: 'p' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('status')).toHaveTextContent(
      'The event has started!',
    );
  });

  it('displays the default completion message when the countdown ends', () => {
    render(<CountdownTimer targetDate="2026-11-10T12:00:01Z" />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(
      screen.getByText('The countdown has ended.', { selector: 'p' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('status')).toHaveTextContent(
      'The countdown has ended.',
    );
  });

  it('stops the interval after the countdown completes', () => {
    render(<CountdownTimer targetDate="2026-11-10T12:00:02Z" />);

    expect(vi.getTimerCount()).toBe(2);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(vi.getTimerCount()).toBe(0);
  });

  it('cleans up the interval when unmounted', () => {
    const { unmount } = render(
      <CountdownTimer targetDate="2026-11-11T12:00:00Z" />,
    );

    expect(vi.getTimerCount()).toBe(2);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  it('displays the completion message immediately for a past target date', () => {
    render(<CountdownTimer targetDate="2026-11-10T11:59:00Z" />);

    expect(
      screen.getByText('The countdown has ended.', { selector: 'p' }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole('status')).toHaveTextContent(
      'The countdown has ended.',
    );

    expect(vi.getTimerCount()).toBe(0);
  });

  it('renders nothing for an invalid target date', () => {
    const { container } = render(<CountdownTimer targetDate="invalid-date" />);

    expect(container.firstChild).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('updates when the target date changes', () => {
    const { rerender } = render(
      <CountdownTimer targetDate="2026-11-10T12:00:05Z" />,
    );

    expect(screen.getByText('05')).toBeInTheDocument();

    rerender(<CountdownTimer targetDate="2026-11-10T12:00:02Z" />);

    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders a named section for the countdown', () => {
    render(<CountdownTimer targetDate="2026-11-11T12:00:00Z" />);

    expect(
      screen.getByRole('region', { name: 'Time remaining' }),
    ).toBeInTheDocument();
  });

  it('announces the initial time but does not announce every countdown update', () => {
    render(<CountdownTimer targetDate="2026-11-11T12:00:05Z" />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const status = screen.getByRole('status');
    const initialAnnouncement = status.textContent;

    expect(initialAnnouncement).toContain('Countdown timer started.');
    expect(initialAnnouncement).toContain('1 day');
    expect(initialAnnouncement).toContain('5 seconds');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(status).toHaveTextContent(initialAnnouncement ?? '');
  });
});
