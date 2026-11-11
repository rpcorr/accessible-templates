import { describe, expect, it } from 'vitest';
import { getTimeRemaining } from './countdownUtils';

describe('getTimeRemaining', () => {
  const now = new Date('2026-11-10T12:00:00Z').getTime();

  it('calculates days, hours, minutes, and seconds', () => {
    const targetDate = new Date('2026-11-12T14:30:45Z');

    expect(getTimeRemaining(targetDate, now)).toEqual({
      days: 2,
      hours: 2,
      minutes: 30,
      seconds: 45,
      isComplete: false,
    });
  });

  it('calculates a countdown with exactly one day remaining', () => {
    const targetDate = new Date('2026-11-11T12:00:00Z');

    expect(getTimeRemaining(targetDate, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: false,
    });
  });

  it('calculates a countdown with hours only', () => {
    const targetDate = new Date('2026-11-10T15:00:00Z');

    expect(getTimeRemaining(targetDate, now)).toEqual({
      days: 0,
      hours: 3,
      minutes: 0,
      seconds: 0,
      isComplete: false,
    });
  });

  it('calculates a countdown with minutes and seconds', () => {
    const targetDate = new Date('2026-11-10T12:05:30Z');

    expect(getTimeRemaining(targetDate, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 30,
      isComplete: false,
    });
  });

  it('calculates a countdown with one second remaining', () => {
    const targetDate = new Date(now + 1000);

    expect(getTimeRemaining(targetDate, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      isComplete: false,
    });
  });

  it('accepts an ISO date string', () => {
    expect(getTimeRemaining('2026-11-10T12:01:00Z', now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0,
      isComplete: false,
    });
  });

  it('returns zero values when the countdown reaches its target', () => {
    expect(getTimeRemaining(new Date(now), now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    });
  });

  it('returns zero values for an expired countdown', () => {
    const expiredDate = new Date('2026-11-10T11:00:00Z');

    expect(getTimeRemaining(expiredDate, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    });
  });

  it('returns null for an invalid date string', () => {
    expect(getTimeRemaining('not-a-valid-date', now)).toBeNull();
  });

  it('returns null for an empty date string', () => {
    expect(getTimeRemaining('', now)).toBeNull();
  });

  it('returns null for an invalid Date object', () => {
    expect(getTimeRemaining(new Date(NaN), now)).toBeNull();
  });

  it('rounds down partial seconds', () => {
    const targetDate = new Date(now + 1999);

    expect(getTimeRemaining(targetDate, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      isComplete: false,
    });
  });
});
